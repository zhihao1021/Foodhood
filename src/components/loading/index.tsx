import { CSSProperties, ReactNode } from "react";

import styles from "./index.module.scss";

export default function Loading({ show }: { show?: boolean }): ReactNode {
    return <div className={styles.loading} data-show={show === true}>
        <div className={styles.box}>
            {
                Array.from({ length: 12 }).map((_, index) => <div
                    key={index}
                    className={styles.dot}
                    style={{ "--index": index } as CSSProperties}
                />)
            }
        </div>
    </div>
}