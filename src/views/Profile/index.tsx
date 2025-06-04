import { ChangeEvent, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";
import userDataContext from "@/context/userData";
import { Navigate } from "react-router-dom";
import updateUserData from "@/api/user/updateUserData";
import reloadUserDataContext from "@/context/reloadUserData";
import updateAvatar from "@/api/avatar/updateAvatar";

export default function Profile(): ReactNode {
    const fileRef = useRef<HTMLInputElement>(null);

    const [avatarSrc, setAvatarSrc] = useState<string>("");

    const [displayName, setDisplayName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [newPassowrd, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [message, setMessage] = useState<string>("");
    const [passwordMessage, setPasswordMessage] = useState<string>("");

    const userData = useContext(userDataContext);
    const reloadUserData = useContext(reloadUserDataContext);

    const save = useCallback(() => {
        updateUserData({
            username: displayName,
            email: email,
            phone: phone,
        }).then(
            () => reloadUserData()
        ).then(
            () => setMessage("保存成功")
        ).catch(() => setMessage("保存失敗，請稍後再試"));
    }, [displayName, email, phone, updateUserData]);

    const updatePassword = useCallback(() => {
        if (newPassowrd !== confirmPassword) {
            setPasswordMessage("新密碼與確認密碼不一致");
            return;
        }

        updateUserData({
            originalPassword: password,
            password: newPassowrd,
        }).then(
            () => setPasswordMessage("密碼更新成功")
        ).catch(() => setPasswordMessage("密碼更新失敗，請稍後再試")).finally(() => {
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
        });
    }, [password, newPassowrd, confirmPassword, updateUserData]);

    const onFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        updateAvatar(file).then(() => setAvatarSrc(
            `${import.meta.env.VITE_API_END_POINT}/avatar/${userData?.uid}?t=${Date.now()}`
        )).finally(() => {
            if (fileRef.current) fileRef.current.value = "";
        });
    }, []);

    useEffect(() => {
        if (userData === null) return;

        setAvatarSrc(`${import.meta.env.VITE_API_END_POINT}/avatar/${userData.uid}`)

        setDisplayName(userData.username);
        setEmail(userData.email);
        setPhone(userData.phone);
    }, [userData]);

    if (userData === null) return <Navigate to="/login" />

    return <div className={styles.profile} >
        <label className={styles.avatarBox}>
            {avatarSrc && <img src={avatarSrc} />}
            <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={onFileChange}
            />
        </label>
        <h2>個人資料</h2>
        <div className={styles.field}>
            <div className={styles.key}>顯示名稱</div>
            <div className={styles.inputBox}>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)} />
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>Email</div>
            <div className={styles.inputBox}>
                <input value={email} onChange={e => setEmail(e.target.value)} />
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>電話</div>
            <div className={styles.inputBox}>
                <input value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
        </div>
        <div className={styles.buttonBox}>
            <div className={styles.message}>{message}</div>
            <button onClick={save}>保存</button>
        </div>
        <h2>變更密碼</h2>
        <div className={styles.field}>
            <div className={styles.key}>原始密碼</div>
            <div className={styles.inputBox}>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>新密碼</div>
            <div className={styles.inputBox}>
                <input
                    type="password"
                    value={newPassowrd}
                    onChange={e => setNewPassword(e.target.value)}
                />
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>確認密碼</div>
            <div className={styles.inputBox}>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>
        </div>
        <div className={styles.buttonBox}>
            <div className={styles.message}>{passwordMessage}</div>
            <button onClick={updatePassword}>更新密碼</button>
        </div>
    </div>
}