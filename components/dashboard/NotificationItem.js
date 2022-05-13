import styles from "../../scss/dashboard/notificationItem.module.scss";

export default function NotificationItem({ item, isOpenDetail, selectedNotification }) {

    const id = item.id;
    const type = item.type;
    const title = item.title;
    const date = Math.floor((new Date().getTime() - item.date) / (1000 * 3600 * 24));

    return (
        <div className={styles.notificationItem}>
            <div className={styles['dot-container']}>
                <div className={styles[`t${type}`]} />
            </div>
            <div className={styles.content}>
                <div className={styles.type}>{'Department ' + type}</div>
                <div className={styles.title}>{title}</div>
                <div className={styles.bottom}>
                    <div className={styles.date}>{`${date} days ago`}<span>|</span></div>
                    <div
                        className={styles.more}
                        onClick={() => {
                            selectedNotification(id)
                            isOpenDetail(true)
                        }}>More details</div>
                </div>
            </div>
        </div>
    );
}