import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from '../../scss/notification-panel.module.scss';
import {
    FlexGrid,
    Row,
    Column,
    Stack,
    Button
} from '@carbon/react';
import NotificationItem from './NotificationItem';
import BookNotification from './BookNotification';
import { Add } from '@carbon/icons-react';
import Offcanvas from "../Offcanvas";


const notificationPanel = () => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <FlexGrid fullwidth condensed className={styles.notificationPanel}>
            <Row condensed className={styles.header}>
                <div className={styles.recent}>Recent notifications</div>
                <div className={styles.bookNoti}>
                    <Button
                        size='md'
                        renderIcon={!isOpen ? Add : null}
                        onClick={() => setIsOpen(true)}
                    >
                    {!isOpen ? 'Book now' : 'Booking...'}    
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

export default notificationPanel;