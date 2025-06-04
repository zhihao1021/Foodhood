import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import styles from "./index.module.scss";
import FoodCard from "@/components/FoodCard";
import { Food } from "@/schemas/food";
import tagsArray from "@/const/tags";
import getDistance from "@/utils/getDistance";

type propsType = Readonly<{
    data: Array<Food>
}>;

export default function Home(props: propsType): ReactNode {
    const { data } = props;

    const ref = useRef<HTMLDivElement>(null);
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    const [search, setSearch] = useState<string>("");
    const [showToolBox, setShowToolBox] = useState<boolean>(false);
    const [distance, setDistance] = useState<number>(0);
    const [distanceMode, setDistanceMode] = useState<"km" | "m">("km");
    const [vegetarian, setVegetarian] = useState<boolean>(false);
    const [tableware, setTableware] = useState<boolean>(false);
    const [tags, setTags] = useState<Array<number>>([]);

    const displayData = useMemo(() => {
        const searchLower = search.trim().toLowerCase();

        let result = !searchLower ? data : data.filter(food => {
            const title = food.title.toLowerCase();
            const description = food.description.toLowerCase();
            const locationDescription = food.locationDescription.toLowerCase();

            return title.includes(searchLower) ||
                description.includes(searchLower) ||
                locationDescription.includes(searchLower);
        });

        if (distance > 0) {
            result = result.filter(food => getDistance(
                { lat: food.latitude, lng: food.longitude },
                { lat: latitude, lng: longitude }
            ) <= distance * (distanceMode === "km" ? 1000 : 1));
        }

        if (vegetarian) {
            result = result.filter(d => d.includesVegetarian);
        }

        if (tableware) {
            result = result.filter(d => !d.needTableware);
        }

        if (tags.length > 0) {
            result = result.filter(d => d.tags.some(v => tags.includes(v)));
        }

        return result;
    }, [data, search, distance, distanceMode, vegetarian, tableware, tags, latitude, longitude]);

    const advance = useMemo(() => {
        return distance > 0 || vegetarian || tableware || tags.length > 0;
    }, [distance, vegetarian, tableware, tags]);

    const clear = useCallback(() => {
        setShowToolBox(false);
        setDistance(0);
        setDistanceMode("km");
        setVegetarian(false);
        setTableware(false);
        setTags([]);
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }, () => { }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 30000
        });
    }, []);

    return <div ref={ref} className={styles.home}>
        <div className={styles.searchBox}>
            <span className="ms">search</span>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    placeholder="搜尋食物"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
            </div>
            <button
                className={styles.toolBoxButton}
                onClick={() => setShowToolBox(true)}
                data-enable={advance}
            >進階</button>
        </div>
        <div className={styles.toolBox} data-show={showToolBox} onClick={event => {
            const element = event.target as HTMLDivElement;
            if (element.classList.contains(styles.toolBox)) setShowToolBox(false);
        }}>
            <div className={styles.box}>
                <button className={`ms ${styles.close}`} onClick={() => setShowToolBox(false)}>close</button>
                <div className={styles.title}>進階搜尋</div>
                <div className={styles.option}>
                    <div className={styles.key}>距離</div>
                    <div className={`${styles.value} ${styles.distance}`}>
                        <input
                            type="number"
                            value={distance}
                            onChange={e => setDistance(parseFloat(e.target.value))}
                        />
                        <span
                            className={styles.unit}
                            data-selected={distanceMode === "km"}
                            onClick={() => setDistanceMode(v => {
                                if (v === "km") {
                                    setDistance(v => v * 1000);
                                    return "m";
                                }
                                setDistance(v => v / 1000);
                                return "km";
                            })}
                        >
                            <span className={styles.km}>km</span>
                            <span>/</span>
                            <span className={styles.m}>m</span>
                        </span>
                        <span>以內</span>
                    </div>
                </div>
                <div className={styles.option}>
                    <div className={styles.key}>需要素食</div>
                    <label className={`ms-p ${styles.checkbox}`}>
                        <input
                            type="checkbox"
                            checked={vegetarian}
                            onChange={e => setVegetarian(e.target.checked)}
                        />
                    </label>
                </div>
                <div className={styles.option}>
                    <div className={styles.key}>需要餐具</div>
                    <label className={`ms-p ${styles.checkbox}`}>
                        <input
                            type="checkbox"
                            checked={tableware}
                            onChange={e => setTableware(e.target.checked)}
                        />
                    </label>
                </div>
                <div className={styles.option}>
                    <div className={styles.key}>標籤</div>
                    <div className={`${styles.value} ${styles.tags}`}>
                        {
                            tagsArray.map((data, index) => <label className="ms-p">
                                <input
                                    type="checkbox"
                                    checked={tags.includes(index)}
                                    onChange={e => setTags(v => e.target.checked ? [...v, index] : v.filter(tag => tag !== index))}
                                />
                                <span>{data.name}</span>
                            </label>)
                        }
                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <button className={styles.clear} onClick={clear}>清除</button>
                    <button onClick={() => setShowToolBox(false)}>關閉</button>
                </div>
            </div>
        </div>
        {
            displayData.map(food => <FoodCard
                key={food.uid}
                data={food}
                lat={latitude}
                lng={longitude}
            />)
        }
    </div>
}