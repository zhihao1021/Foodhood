import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Food } from "@/schemas/food";

import getFoodDetail from "@/api/food/getFoodDetail";

import Loading from "@/components/Loading";

import styles from "./index.module.scss";
import tagsArray from "@/const/tags";

export default function Detail(): ReactNode {
    const { id } = useParams();

    const [food, setFood] = useState<Food>();

    const router = useNavigate();

    useEffect(() => {
        if (!id) return;

        getFoodDetail(id).then(setFood).catch(() => router(-1));
    }, [id]);

    return food ? <div className={styles.foodDetail}>
        <h2>{food.title}</h2>
        <div className={styles.field}>
            <div className={styles.key}>描述</div>
            <div className={styles.value}>{food.description}</div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>位置</div>
            <div className={styles.value}>{food.locationDescription}</div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>包含素食</div>
            <div className={styles.value}>{
                food.includesVegetarian ? "是" : "否"
            }</div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>提供餐具</div>
            <div className={styles.value}>{
                food.needTableware ? "否" : "是"
            }</div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>標籤</div>
            <div className={styles.tags}>{
                food.tags.map(tag => <div
                    key={tag}
                    className={styles.tag}
                >{tagsArray[tag].name}</div>)
            }</div>
        </div>
        <div className={styles.mapBox}>
            <iframe
                className={styles.map}
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&q=${food.latitude},${food.longitude}`}
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
            />
        </div>
    </div> : <Loading show />

    // return food ? <div>

    // </div> : <Loading />
}