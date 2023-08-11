import {
    Column,
    FlexGrid,
    Row,
    Stack
} from "@carbon/react";
import axios from 'axios';
import CardRequest from '../components/notification/CardRequest';
import stylesBanner from '../scss/banner.module.scss';
import styles from '../scss/dashboard/notification.module.scss';

const Notification = ({ getNotificationRequest }) => {

    return (
        <FlexGrid fullWidth className={styles.notification}>
            <Row className={stylesBanner.banner}>
                <Column lg={16}>
                    <h1 className={stylesBanner.heading}>{'Notification request'}</h1>
                    <p className={stylesBanner.p}>{''}</p>
                </Column>
            </Row>
            <Row>
                <Stack className={styles['status-notification']}>
                    <div className={styles.swticher}>
                        <div className={styles['swticher-description']}>
                            <div>All your request</div>
                            <p>Expires from this page after 14 days of announcement or request is denied</p>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <CardRequest getNotificationRequest={getNotificationRequest} />
                    </div>
                </Stack>
            </Row>
        </FlexGrid>
    );
}

export default Notification;

export const getStaticProps = async () => {

    const res = await axios.get('http://localhost:3000/api/notification/getNotification', {
        headers: {
            status: 'waiting'
        }
    })

    const getNotificationRequest = res.data;

    return {
        props: {
            getNotificationRequest
        }
    }
}