import { ReactNode, useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";
import FoodCard from "@/components/FoodCard";
import Food from "@/schemas/food";

type propsType = Readonly<{
    data: Array<Food>,
    loadNext: () => void
}>;

let lock = false;

export default function Home(props: propsType): ReactNode {
    const { data, loadNext } = props;

    const ref = useRef<HTMLDivElement>(null);
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    const [scrollHandler, setScrollHandler] = useState<() => void>();

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

    useEffect(() => {
        const handler = () => {
            if (!ref.current) return;

            const bottomPos = window.scrollY + window.innerHeight;
            if (bottomPos >= ref.current.clientHeight) {
                if (lock) return;
                lock = true;
                loadNext();
            }
        };

        setScrollHandler(handler);
        window.addEventListener("scroll", handler);
    }, []);

    useEffect(() => () => {
        if (scrollHandler) {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, [scrollHandler]);

    useEffect(() => {
        lock = false;
    }, [data]);

    return <div ref={ref} className={styles.home}>
        {
            data.map(food => <FoodCard
                key={food.id}
                data={food}
                lat={latitude}
                lng={longitude}
            />)
        }
    </div>
}