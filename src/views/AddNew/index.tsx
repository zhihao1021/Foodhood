import { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react";

import styles from "./index.module.scss";

const tagsArray = [
    { name: "飯食" },
    { name: "麵食" },
    { name: "湯品" },
    { name: "點心" },
    { name: "飲品" },
    { name: "便當" },
    { name: "餐盒" },
    { name: "其他" }
]

function locationToStr(loc: number, fixed?: boolean): string {
    const hours = parseInt(loc.toString());
    const rawMinutes = (loc - hours) * 60;
    const minutes = parseInt(rawMinutes.toString());
    const seconds = (rawMinutes - minutes) * 60;

    return `${hours}°${minutes}'${fixed || fixed === undefined ? seconds.toFixed() : seconds}"`;
}

export default function AddNew(): ReactNode {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [includesVegetarian, setIncludesVegetarian] = useState<boolean>(false);
    const [needTableware, setNeedTableware] = useState<boolean>(false);
    const [tags, setTags] = useState<Array<number>>([]);
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [locationDescription, setLocationDescription] = useState<string>();
    const [validityPeriod, setValidityPeriod] = useState<number>(1);

    const [locationError, setLocationError] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);

    const getLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }, error => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setLocationError("請允許我們使用您的位置");
                    break;
                case error.POSITION_UNAVAILABLE:
                    setLocationError("無法取得位置");
                    break;
                case error.TIMEOUT:
                    setLocationError("請求逾時");
                    break;
                default:
                    setLocationError("發生未知錯誤");
                    break;
            }
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 30000
        });
    }, []);

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    return <div className={styles.addNew}>
        <h1>新增食物</h1>
        <div className={styles.field}>
            <div className={styles.key}>標題</div>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="請輸入標題"
                />
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>描述</div>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="請輸入食物描述"
                />
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>包含素食</div>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={includesVegetarian}
                    onChange={e => setIncludesVegetarian(e.target.checked)}
                />
                <div className={styles.dot} />
            </label>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>自備餐具</div>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={needTableware}
                    onChange={e => setNeedTableware(e.target.checked)}
                />
                <div className={styles.dot} />
            </label>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>標籤</div>
            <div className={styles.tagBox}>
                {
                    tagsArray.map((data, index) => <label key={index} className={`${styles.tag} ms-p`}>
                        <input
                            type="checkbox"
                            checked={tags.includes(index)}
                            onChange={
                                e => setTags(v => e.target.checked ? [...v, index] : v.filter(i => i !== index)
                                )}
                        />
                        <div>{data.name}</div>
                    </label>)
                }
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>地點</div>
            <div className={styles.location}>
                {
                    locationError ? <div
                        className={styles.error}
                        style={{ "--text-count": locationError.length } as CSSProperties}
                    >{locationError}</div> : <>
                        <div className={styles.loc}>
                            {locationToStr(latitude)}
                        </div>
                        <div className={styles.loc}>
                            {locationToStr(longitude)}
                        </div>
                    </>
                }
                <button className={styles.reload} onClick={getLocation}>
                    <span className="ms">refresh</span>
                    <span>重新整理</span>
                </button>
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>地點描述</div>
            <div className={styles.inputBox}>
                <input
                    type="text"
                    value={locationDescription}
                    onChange={e => setLocationDescription(e.target.value)}
                    placeholder="社區門口 . . ."
                />
            </div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>有效期限</div>
            <div className={styles.numberBox}>
                <button
                    className="ms"
                    onClick={() => setValidityPeriod(v => Math.max(0, v - 1))}
                >chevron_left</button>
                <div className={styles.inputBox}>
                    <input type="number" value={validityPeriod} onChange={event => {
                        try {
                            const value = parseInt(event.target.value);
                            setValidityPeriod(Math.max(value, 0));
                        }
                        catch { }
                    }} />
                </div>
                <button
                    className="ms"
                    onClick={() => setValidityPeriod(v => v + 1)}
                >chevron_right</button>
            </div>
            <div>小時</div>
        </div>
        <div className={styles.field}>
            <div className={styles.key}>照片</div>
            <div className={styles.imageList}>
                {
                    images.map((data, index) => <div className={styles.imageBox} key={index}>
                        <img src={URL.createObjectURL(data)} />
                        <button
                            className="ms"
                            onClick={() => setImages(v => v.filter((_, i) => i !== index))}
                        >close</button>
                    </div>)
                }
                <label >
                    <input type="file" accept="image/*" onChange={event => {
                        setImages(v => [...v, ...Array.from(event.target.files || [])]);
                    }} />
                    <span className="ms">add</span>
                </label>
            </div>
        </div>
        <div className={styles.buttonBar}>
            <button>
                <span className="ms">add</span>
                <span>創建</span>
            </button>
        </div>
    </div>
}