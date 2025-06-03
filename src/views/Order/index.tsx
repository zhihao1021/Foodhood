import { ReactNode, useEffect, useState } from "react";
import Food from "@/schemas/food";
import styles from "./index.module.scss";

export default function Order(): ReactNode {
  const [orders, setOrders] = useState<Food[]>([]);

  useEffect(() => {
    const mock: Food[] = [
      {
        id: "1",
        title: "雞排便當",
        description: "免費",
        includesVegetarian: false,
        needTableware: true,
        tags: [1],
        latitude: 22.999,
        longitude: 120.221,
        locationDescription: "資訊系館 3 樓",
        validityPeriod: 2,
        imageCount: 0,
      },
    ];
    setOrders(mock);
  }, []);

  return (
    <div className={styles.container}>
      <h2>我的訂單</h2>
      {orders.length === 0 ? (
        <div className={styles.emptyBox}>尚未預訂任何便當</div>
      ) : (
        orders.map((item) => (
          <div key={item.id} className={styles.orderCard}>
            <div className={styles.infoBox}>
              <h5>{item.title}</h5>
              <div className={styles.note}>{item.description}</div>
              <div className={styles.location}>
                <span className="ms">pin_drop</span>
                {item.locationDescription}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
