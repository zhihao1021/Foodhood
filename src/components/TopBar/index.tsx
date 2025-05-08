import { ReactNode } from "react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";

import User from "@/schemas/user";

import DropdownMenu from "../DropdownMenu";

import styles from "./index.module.scss";

type propsType = Readonly<{
    userData?: User
}>;

export default function TopBar(props: propsType): ReactNode {
    const {
        userData
    } = props;

    return <div className={styles.topBar}>
        <Link to="/">
            <img src={logo} />
        </Link>
        <div className={styles.menu}>
            {
                userData ? <div className={styles.user}>
                    {/* <img src={} alt="avatar" /> */}
                    {/* <span>{userData.name}</span> */}
                </div> : <Link className={styles.login} to="/login">登入/註冊</Link>
            }
        </div>
    </div>
}