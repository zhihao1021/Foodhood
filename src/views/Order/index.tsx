import { ReactNode } from "react";

import { Food } from "@/schemas/food";
import { Order } from "@/schemas/order";

import FoodCard from "@/components/FoodCard";
import Loading from "@/components/Loading";

import styles from "./index.module.scss";

type propsType = Readonly<{
    foodList?: Array<Food>
    orderList?: Array<Order>,
    latitude: number,
    longitude: number,
}>;

export default function OrderPage(props: propsType): ReactNode {
    const {
        foodList,
        orderList,
        latitude,
        longitude,
    } = props;

    return <div className={styles.orderPage}>
        <h1>我的預定</h1>
        <Loading show={foodList === undefined || orderList === undefined} />
        {
            foodList && orderList && <>
                {
                    orderList.filter(order => !order.received).map(order => {
                        const food = foodList.find(food => food.uid === order.foodId);
                        if (!food) return undefined;

                        return <FoodCard
                            key={order.uid}
                            data={food}
                            lat={latitude}
                            lng={longitude}
                        />
                    })
                }
            </>
        }
        <h1>歷史紀錄</h1>
        {
            foodList && orderList && <>
                {
                    orderList.filter(order => order.received).map(order => {
                        const food = foodList.find(food => food.uid === order.foodId);
                        if (!food) return undefined;

                        return <FoodCard
                            key={order.uid}
                            data={food}
                            lat={latitude}
                            lng={longitude}
                        />
                    })
                }
            </>
        }
    </div >
}