import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from '../../scss/notification.module.scss';
import {
    FlexGrid,
    Row,
    Column,
    Stack
} from '@carbon/react';
import NotificationItem from './NotificationItem';

const Notification = () => {

    const router = useRouter();

    return (
        <FlexGrid fullwidth condensed className={styles.notificationPanel}>
            <Row condensed className={styles.header}>
                <div className={styles.recent}>Recent notifications</div>
                <div href='/notification' className={styles.viewAll}>
                    <a>View all</a>
                </div>
            </Row>
            <Row condensed className={styles['stack-container']}>
                <Stack gap='2rem'>
                    {
                        [...Array(15).keys()].map(i => {

                            let item = {
                                type: ((i + 1) % 3).toString(),
                                title: `The IBM Quantum Spring Challenge is coming!${i}`,
                                content: `Quantum News${i}`,
                                date: new Date(`2022/04/${i}`),
                                link: `link${i}`,
                            }
                            console.log(item)
                            return <NotificationItem key={i} item={item} />
                        })
                    }
                </Stack>
            </Row>
        </FlexGrid>
    )
}

export default Notification;