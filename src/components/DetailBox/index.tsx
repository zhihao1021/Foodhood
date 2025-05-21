import { ReactNode } from "react";

import Food from "@/schemas/food";

import styles from "./index.module.scss";

type propsType = Readonly<{
    show: boolean,
    data?: Food,
    close: () => void
}>;

export default function DetailBox(props: propsType): ReactNode {
    const { show, data, close } = props;

    return <div
        className={styles.detailBox}
        data-show={show}
        onClick={event => {
            const element = event.target as HTMLElement;
            if (element.classList.contains(styles.detailBox)) close();
        }}
    >
        <div className={styles.box}>
            <h2>{data?.title}</h2>
            <div>{data?.description}</div>
        </div>
    </div>
}