import { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Food } from "@/schemas/food";

import Loading from "@/components/Loading";

import styles from "./index.module.scss";
import tagsArray from "@/const/tags";
import { Order } from "@/schemas/order";
import getFoodStatus from "@/api/food/getFoodStatus";
import cancelOrder from "@/api/order/cancelOrder";
import userDataContext from "@/context/userData";
import orderFood from "@/api/food/orderFood";
import finishOrder from "@/api/order/finishOrder";

type propsType = Readonly<{
    foodList?: Array<Food>,
    reloadOrderList: () => Promise<void>
}>;

export default function Detail(props: propsType): ReactNode {
    const {
        foodList,
        reloadOrderList
    } = props;

    const { id } = useParams();

    const [status, setStatus] = useState<Array<Order>>();
    const [loading, setLoading] = useState<boolean>(false);
    const [showReceiveBox, setShowReceiveBox] = useState<boolean>(false);

    const router = useNavigate();

    const userData = useContext(userDataContext);

    const food = useMemo(() => {
        if (!foodList) return;

        const result = foodList.find(food => food.uid === id);
        if (!result) {
            router(-1);
            return;
        }
        return result;
    }, [foodList]);

    const releaseTimeString = useMemo(() => {
        if (!food) return "";
        const date = new Date(food.createdAt);
        return date.toLocaleString();
    }, [food]);

    const validityTimeString = useMemo(() => {
        if (!food) return "";
        const date = new Date(food.createdAt);
        date.setHours(date.getHours() + food.validityPeriod);

        return date.toLocaleString();
    }, [food]);

    const receiveCount = useMemo(() => {
        if (!status) return 0;
        return status.filter(order => order.received).length;
    }, [status]);

    const completeCount = useMemo(() => {
        if (!status) return 0;
        return status.filter(order => order.complete).length;
    }, [status]);

    const userOrderData = useMemo(() => {
        if (!status || !userData) return;

        return status.find(order => order.userId === userData.uid) ?? null;
    }, [userData, status]);

    const reloadStatus = useCallback(() => {
        if (!id) return;
        getFoodStatus(id).then(setStatus);
    }, [id]);

    const order = useCallback(() => {
        if (!id) return;

        setLoading(true);
        orderFood(id).then(reloadStatus).then(reloadOrderList).finally(() => {
            setLoading(false);
        });
    }, [id, reloadOrderList]);

    const receive = useCallback((complete: boolean) => {
        if (!id) return;

        setLoading(true);
        finishOrder(id, { complete: complete, received: true }).then(
            reloadStatus
        ).then(reloadOrderList).finally(() => {
            setLoading(false);
            setShowReceiveBox(false);
        });
    }, [id, reloadOrderList]);

    const cancel = useCallback(() => {
        if (!id) return;

        setLoading(true);
        cancelOrder(id).then(reloadStatus).then(reloadOrderList).finally(() => setLoading(false));
    }, [id, reloadOrderList]);

    useEffect(() => {
        reloadStatus();
    }, [reloadStatus]);

    return <div className={styles.foodDetail}>
        <Loading show={!food || loading} />
        <div
            className={styles.receiveBox}
            data-show={showReceiveBox}
            onClick={e => {
                const target = e.target as HTMLElement;
                if (target.classList.contains(styles.receiveBox)) {
                    setShowReceiveBox(false);
                }
            }}
        >
            <div className={styles.box}>
                <h3>現場是否還有剩餘？</h3>
                <div className={styles.options}>
                    <button className={styles.no} onClick={() => receive(true)}>否</button>
                    <button className={styles.yes} onClick={() => receive(false)}>是</button>
                </div>
            </div>
        </div>
        {food && <>
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
                <div className={styles.key}>發布時間</div>
                <div className={styles.value}>{releaseTimeString}</div>
            </div>
            <div className={styles.field}>
                <div className={styles.key}>有效期限</div>
                <div className={styles.value}>{`${food.validityPeriod} 小時 (${validityTimeString})`}</div>
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
            <div className={styles.field}>
                <div className={styles.key}>狀態</div>
                <div className={`${styles.value} ${styles.status}`}>
                    <div>{`共 ${status?.length ?? 0} 人預約、其中 ${receiveCount} 人已領取`}</div>
                    <div>{`有 ${completeCount} 人回報已分完`}</div>
                </div>
            </div>
            <div className={styles.mapBox}>
                <iframe
                    className={styles.map}
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&q=${food.latitude},${food.longitude}`}
                    referrerPolicy="no-referrer-when-downgrade"
                    loading="lazy"
                />
            </div>
            {userData && userOrderData !== undefined && <div className={styles.buttonBox}>
                {
                    userOrderData && !userOrderData.received && <button
                        className={styles.cancel}
                        onClick={cancel}
                    >取消預約</button>
                }
                {
                    userOrderData && <button
                        className={styles.receive}
                        disabled={userOrderData.received}
                        onClick={() => setShowReceiveBox(true)}
                    >{userOrderData.received ? "已領取" : "我已抵達"}</button>
                }
                {
                    !userOrderData && <button
                        className={styles.order}
                        onClick={order}
                    >預約</button>
                }
            </div>}
        </>}
    </div>
}