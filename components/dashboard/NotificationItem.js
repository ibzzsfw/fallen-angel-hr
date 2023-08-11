import React from 'react';
import styles from "../../scss/dashboard/notificationItem.module.scss";
import manager from './common/manager';

export default function NotificationItem({ item, isOpenDetail, selectedNotification }) {
    const getDepartment = id => manager.filter(item => item.id === id)[0].department;

    const id = item.notificationID;
    const title = item.title;
    const content = item.content;
    const dur = Math.floor((new Date().getTime() - new Date(item.date).getTime()) / (1000 * 3600 * 24));

    return (
        <div className={styles.notificationItem}>
            <div className={styles['dot-container']}>
                <div className={styles[`t${getDepartment(item.senderID).charAt(0)}`]} />
            </div>
            <div className={styles.content}>
                <div className={styles.type}>{getDepartment(item.senderID)}</div>
                <div className={styles.title}>{title}</div>
                <div className={styles.bottom}>
                    <div className={styles.date}>{`${dur} days ago`}<span>|</span></div>
                    <div
                        className={styles.more}
                        onClick={() => {
                            selectedNotification(item.index)
                            isOpenDetail(true)
                        }}>More details</div>
                </div>
            </div>
        </div>
    );
}