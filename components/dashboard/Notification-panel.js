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


const notificationPanel = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState('');

    const getNotification = [...Array(15).keys()].map(i => {

        return {
            id: i,
            type: ((i + 1) % 3).toString(),
            title: `The IBM Quantum Spring Challenge is coming!${i}`,
            content: `Quantum News${i}`,
            date: new Date(`2022/04/${i + 1}`),
        }
    })

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
                        <Offcanvas isOpen={q => setIsOpen(q)}>
                            <BookNotification />
                        </Offcanvas>
                    }
                </div>
            </Row>
            <Row condensed className={styles['stack-container']}>
                <Stack gap='2rem'>
                    {
                        getNotification.map((item, index) => {
                            return (
                                <NotificationItem
                                    key={index}
                                    item={item}
                                    isOpenDetail={e => setIsOpenDetail(e)}
                                    selectedNotification={id => setSelectedNotification(id)}
                                />
                            )
                        })
                    }
                </Stack>
            </Row>
            {
                isOpenDetail &&
                <Offcanvas setIsOpenDetail={q => setIsOpenDetail(q)} width={'md'}>
                    <NotificationDetail
                        notification={getNotification[selectedNotification]}
                        isOpenDetail={q => setIsOpenDetail(q)}
                        selectedNotification={e => setSelectedNotification(e)}
                    />
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default notificationPanel;