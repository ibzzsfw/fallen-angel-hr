import {
    Stack,
    FlexGrid,
    Row,
    Tile,
} from '@carbon/react';
import styles from '../../scss/dashboard/notification-detail.module.scss';
import { CaretLeft, CaretRight, Close } from '@carbon/icons-react'

const NotificationDetail = ({ notification, isOpenDetail, selectedNotification }) => {

    const id = notification.id;
    const type = notification.type;
    const title = notification.title;
    const content = notification.content;
    const date = notification.date.toLocaleDateString('en-GB');

    return (
        <FlexGrid className={styles['notification-detail']}>
            <Row className={styles.header}>
                <div className={styles.title}>Notification Details</div>
                <div className={styles.menu}>
                    <div
                        className={styles.item}
                        // onClick={() => selectedNotification(id-1)}
                    >
                        <div className={styles.vertical} />
                        <CaretLeft size='32' />
                    </div>
                    <div
                        className={styles.item}
                        // onClick={() => selectedNotification()}
                    >
                        <div className={styles.vertical} />
                        <CaretRight size='32' />
                    </div>
                    <div
                        className={styles.item}
                        onClick={() => isOpenDetail(false)}
                    >
                        <div className={styles.vertical} />
                        <Close size='32' />
                    </div>
                </div>
            </Row>
            <Row className={styles.middle}>
                <Stack gap='1rem' className={styles.resetStack}>
                    <div className={styles['section-name']}>Details</div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>From department</div>
                        <div className={styles.content}>{'Marketing' + type}</div>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Topic</div>
                        <div className={styles.content}>{title}</div>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Date</div>
                        <div className={styles.content}>{date}</div>
                    </div>
                </Stack>
            </Row >
            <Row>
                <Stack gap='1rem' className={styles.resetStack}>
                    <div className={styles['section-name']}>Content</div>
                    <Tile className={styles['notification-content']}>
                        <div className={styles.help}>Accept HTML content</div>
                        <div>
                            <h1>hello</h1>
                            <p>{content}</p>
                        </div>
                    </Tile>
                </Stack>
            </Row >
        </FlexGrid >
    )
}

export default NotificationDetail;