import React from 'react';
import styles from "../../scss/dashboard/notificationItem.module.scss";
export default function NotificationItem({ item, isOpenDetail, selectedNotification }) {

    const manager = [
        { id: '0e38af30-7a6a-4201-9584-42264f2684fc', department: 'Human resources' },
        { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', department: 'Human resources' },
        { id: '1b08fc14-d18c-4738-ba76-287285ab79d2', department: 'Marketing' },
        { id: '92edfed8-162e-410c-b8e3-3d6e84906c36', department: 'Marketing' },
        { id: '823bc31f-1cd3-4259-b5d0-05c3b8faaf34', department: 'Sales management' },
        { id: '9244b6b0-c51a-4fc2-a363-1c7d9b2fa5dc', department: 'Information technology' },
        { id: 'ef49e1cb-b3e9-4115-92bc-68f71ca4836c', department: 'Information technology' },
    ]

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