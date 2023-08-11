/* eslint-disable react-hooks/rules-of-hooks */
import {
    Button,
    FlexGrid,
    Row,
    Stack
} from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { useEffect, useState } from 'react';
import styles from '../../scss/dashboard/notification-panel.module.scss';
import Offcanvas from "../Offcanvas";
import BookNotification from './BookNotification';
import NotificationDetail from "./NotificationDetail";
import NotificationItem from './NotificationItem';
import manager from './common/manager';

const notificationPanel = ({ getNotification }) => {
    const getDepartment = id => manager.filter(item => item.id === id)[0].department;
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(0);

    useEffect(() => {
        let arr = []
        if (getNotification) {
            getNotification.map((item, index) => {
                arr.push({
                    index: index,
                    department: getDepartment(item.senderID),
                    ...item
                })
            })
        }
        setNotifications(arr)
    }, [getNotification])

    return (
        <FlexGrid fullWidth condensed className={styles.notificationPanel}>
            <Row condensed className={styles.header}>
                <div className={styles.recent}>Recent notifications</div>
                <div className={styles.bookNoti}>
                    <Button
                        kind="tertiary"
                        hasIconOnly
                        tooltipPosition="bottom"
                        tooltipAlignment="end"
                        iconDescription='Add notification'
                        size='md'
                        renderIcon={!isOpen ? Add : null}
                        onClick={() => setIsOpen(true)}
                    >
                        {!isOpen ? 'Request now' : 'Requesting...'}
                    </Button>
                    {
                        isOpen &&
                        <Offcanvas isOpen={q => setIsOpen(q)} width={'md'}>
                            <BookNotification />
                        </Offcanvas>
                    }
                </div>
            </Row>
            <Row condensed className={styles['stack-container']}>
                <Stack gap='2rem'>
                    {
                        notifications.map(item => {
                            return (
                                <NotificationItem
                                    key={item.notificationID}
                                    item={item}
                                    isOpenDetail={e => setIsOpenDetail(e)}
                                    selectedNotification={index => setSelectedNotification(index)}
                                />
                            )
                        })
                    }
                </Stack>
            </Row>
            {
                isOpenDetail &&
                <Offcanvas isOpen={q => setIsOpenDetail(q)} width={'md'}>
                    <NotificationDetail
                        notification={notifications[selectedNotification]}
                        isOpenDetail={q => setIsOpenDetail(q)}
                        selectedNotification={e => {
                            if (selectedNotification + e === notifications.length) {
                                setSelectedNotification(0)
                            }
                            else if (selectedNotification + e < 0) {
                                setSelectedNotification(notifications.length - 1)
                            }
                            else {
                                setSelectedNotification(selectedNotification + e)
                            }
                        }}
                    />
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default notificationPanel;