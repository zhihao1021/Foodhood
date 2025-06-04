import { ReactNode, useMemo } from "react";

import styles from "./index.module.scss";
import { Food } from "@/schemas/food";
import getDistance from "@/utils/getDistance";
import { Link } from "react-router-dom";

type propsType = Readonly<{
    data: Food,
    lat?: number,
    lng?: number,
}>

export default function FoodCard(props: propsType): ReactNode {
    const { data, lat, lng } = props;

    const distance: string | null = useMemo(() => {
        if (lat === undefined || lng === undefined) return null;

        const meters = getDistance({
            lat: data.latitude,
            lng: data.longitude,
        }, { lat: lat, lng: lng });

        if (isNaN(meters)) return null

        if (meters < 1000) {
            return `${meters.toFixed()}m`;
        }

        return `${(meters / 1000).toFixed(1)}km`;
    }, [data, lat, lng]);

    const imageUrl = useMemo(() => {
        return `${import.meta.env.VITE_API_END_POINT}/food/${data}/0`;
    }, [data]);

    return <Link to={`/detail/${data.uid}`} className={styles.foodCard}>
        <div className={styles.imageBox}>
            {data.imageCount > 0 && <image href={imageUrl} />}
        </div>
        <div className={styles.infoBox}>
            <div className={styles.title}>
                <h5>{data.title}</h5>
                <div className={styles.description}>{data.description}</div>
                <div className={styles.location}>
                    <div className="ms">pin_drop</div>
                    <div className={styles.locationDescription}>{data.locationDescription}</div>
                </div>
            </div>
            <div className={styles.otherInfo}>
                <div className={styles.properties}>
                    {data.includesVegetarian && <span className={`ms ${styles.eco}`}>eco</span>}
                    {!data.needTableware && <span className={`ms ${styles.tableware}`}>restaurant</span>}
                </div>
                <div className={styles.time}>
                    <div className="ms">schedule</div>
                    <div className={styles.validityPeriod}>
                        {`${data.validityPeriod}h`}
                    </div>
                </div>
                <div className={styles.distance}>{
                    distance && <>
                        <div className="ms">straighten</div>
                        <div>{distance}</div>
                    </>
                }</div>
            </div>
        </div>
    </Link>
}