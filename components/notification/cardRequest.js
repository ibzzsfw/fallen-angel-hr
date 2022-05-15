import React, { useState } from 'react';
import styles from '../../scss/notification/card-request.module.scss';
import {
    FlexGrid,
    Column,
    Row,
    ClickableTile,
    Tag,
} from '@carbon/react';
import Offcanvas from "../Offcanvas";
import RequestDetails from './RequestDetails';

const cardRequest = ({ getNotificationRequest }) => {

    console.log(getNotificationRequest)

    const [isOpen, setIsOpen] = useState(false);
    const [rowID, setRowID] = useState('');

    const card = (row) => {
        return (
            <Column max={4} key={row.id}>
                <ClickableTile
                    className={styles.tile}
                    onClick={() => {
                        setIsOpen(true);
                        setRowID(row.id);
                    }}
                >
                    <div className={styles.header}>
                        <div className={styles.head}>{row.head}</div>
                        <Tag type='purple'>{row.status}</Tag>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Request date</div>
                        <div className={styles.content}>{row.date}</div>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Content</div>
                        <div className={styles.content}>{row.content}</div>
                    </div>
                </ClickableTile>
            </Column>
        )
    }

    return (
        <FlexGrid fullWidth className={styles['card']}>
            <Row>
                {
                    getNotificationRequest && 
                    getNotificationRequest.map(row => {
                        console.log(row)
                        return card(row)
                    })
                }
            </Row>
            {
                isOpen &&
                <Offcanvas isOpen={q => setIsOpen(q)}>
                    <RequestDetails />
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default cardRequest;