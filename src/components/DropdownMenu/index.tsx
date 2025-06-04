import { CSSProperties, ReactNode, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import styles from "./index.module.scss";

type propsType = Readonly<{
    title: string,
    options: Array<{
        name: string,
        path: string
    }>,
    className?: string
}>

export default function DropdownMenu(props: propsType): ReactNode {
    const {
        title,
        options,
        className
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    const maxWidth = useMemo(() => {
        return Math.max(...options.map(option => {
            const quactor = (option.name.match(/[fijln1(): ]/g) || []).length;
            const half = (option.name.match(/[a-zA-Z0-9(): ]/g) || []).length;
            return option.name.length - 0.25 * quactor - 0.5 * half;
        }));
    }, [options]);

    return <div
        className={`${styles.dropdownMenu} ${className}`}
        style={{
            "--maxWidth": maxWidth,
            "--count": options.length,
        } as CSSProperties}
    >
        <label className={styles.title}>
            <input type="checkbox" onChange={e => setOpen(e.target.checked)} checked={open} />
            <div>{title}</div>
            <div className={`ms ${styles.icon}`}>arrow_drop_down</div>
        </label>
        <div className={styles.mask}>
            <div className={styles.container}>
                {
                    options.map(option => {
                        return <div
                            key={option.path}
                            className={styles.option}
                            onClick={() => setOpen(false)}
                        >
                            <Link to={option.path} >{option.name}</Link>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}