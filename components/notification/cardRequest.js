import {
    ClickableTile,
    Column,
    FlexGrid,
    Row,
    Tag,
} from '@carbon/react';
import React, { useState } from 'react';
import styles from '../../scss/notification/card-request.module.scss';
import { dateFormat } from '../../utils/utils';
import Offcanvas from "../Offcanvas";
import RequestDetails from './RequestDetails';

const cardRequest = ({ getNotificationRequest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(-1);

    const tag = (status) => {
        switch (status) {
            case 'waiting':
                return <Tag type='blue'>Waiting</Tag>;
            case 'approved':
                return <Tag type='green'>Approved</Tag>;
            case 'rejected':
                return <Tag type='red'>Rejected</Tag>;
            default:
                <></>
        }
    }

    const card = (row, index) => {
        return (
            <Column max={4} key={row.notificationID}>
                <ClickableTile
                    className={styles.tile}
                    onClick={() => {
                        setIsOpen(true);
                        setIndex(index);
                    }}
                >
                    <div className={styles.header}>
                        <div className={styles.type}>{row.title}</div>
                        {tag(row.status)}
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Request date</div>
                        <div className={styles.content}>{dateFormat(row.date)}</div>
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
            <Row>{getNotificationRequest.map((row, index) => card(row, index))}</Row>
            {
                isOpen &&
                <Offcanvas isOpen={q => setIsOpen(q)} width='l'>
                    <RequestDetails detail={getNotificationRequest[index]} isOpen={q => setIsOpen(q)} selected={e => {
                        if (index + e === getNotificationRequest.length) {
                            setIndex(0)
                        } else if (index + e < 0) {
                            setIndex(getNotificationRequest.length - 1)
                        } else {
                            setIndex(index + e)
                        }
                    }} />
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default cardRequest;