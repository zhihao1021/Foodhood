import { ReactNode, useEffect, useState } from "react";

import styles from "./index.module.scss";
import { Link, useLocation } from "react-router-dom";

const navigate = [
    {
        path: "/home",
        icon: "home",
        title: "首頁"
    },
    {
        path: "/search",
        icon: "search",
        title: "搜尋"
    },
    {
        path: "/add",
        icon: "library_add",
        title: "新增"
    },
    {
        path: "/order",
        icon: "shopping_cart",
        title: "訂單"
    },
    {
        path: "/favorite",
        icon: "favorite",
        title: "收藏"
    }
]

let lastScrollTop = 0;

export default function FunctionBar(): ReactNode {
    const [show, setShow] = useState(true);
    const [eventHandler, setEventHandler] = useState<() => void>();

    const location = useLocation();

    useEffect(() => {
        const func = () => {
            setShow(window.scrollY <= lastScrollTop);
            lastScrollTop = window.scrollY;
        }
        setEventHandler(func);

        window.addEventListener("scroll", func)
    }, []);

    useEffect(() => () => {
        if (eventHandler) {
            window.removeEventListener("scroll", eventHandler);
        }
    }, [eventHandler]);

    return <div className={styles.bottomBar} data-show={show}>
        {
            navigate.map(data => <Link
                key={data.path}
                className="ms"
                to={data.path}
                data-selected={location.pathname.startsWith(data.path)}
            >{data.icon}</Link>)
        }
    </div>
}