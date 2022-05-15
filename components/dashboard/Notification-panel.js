import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import styles from '../../scss/dashboard/notification-panel.module.scss';
import {
    FlexGrid,
    Row,
    Column,
    Stack,
    Button
} from '@carbon/react';
import NotificationItem from './NotificationItem';
import BookNotification from './BookNotification';
import { Add } from '@carbon/react/icons';
import Offcanvas from "../Offcanvas";
import NotificationDetail from "./NotificationDetail";


const notificationPanel = ({ getNotification }) => {

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
        console.log(arr);
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