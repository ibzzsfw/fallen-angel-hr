import React from "react";
import Link from "next/link";
import styles from "../../scss/notificationItem.module.scss";

export default function NotificationItem({ item }) {

    const type = item.type;
    const title = item.title;
    const content = item.content;
    const date =  Math.floor((new Date().getTime() - item.date) / (1000 * 3600 * 24));
    const link = item.link;

    return (
        <div className={styles.notificationItem}>
            <div className={styles['dot-container']}>
                <div className={styles[`t${type}`]} />
            </div>
            <div className={styles.content}>
                <div className={styles.type}>{'Type number ' + type}</div>
                <div className={styles.title}>{title}</div>
                <div className={styles.bottom}>
                    <div className={styles.date}>{`${date} days ago`}<span>|</span></div>
                    <Link
                        href={`/notification/${link}`}
                        className={styles.more}
                    ><a>More details</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}