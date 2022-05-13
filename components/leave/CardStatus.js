import React, { useState } from 'react';
import styles from '../../scss/leave/card-status.module.scss';
import {
    FlexGrid,
    Column,
    Row,
    ClickableTile,
    Tag,
} from '@carbon/react';
import { rows } from './LeaveData';
import Offcanvas from "../Offcanvas";
import LeaveDetails from './LeaveDetails';

const CardStatus = () => {

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
                        <div className={styles.type}>{row.type}</div>
                        <Tag type='purple'>{row.status}</Tag>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Booking date</div>
                        <div className={styles.content}>{row.date}</div>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Reason</div>
                        <div className={styles.content}>{row.reason}</div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.left}>
                            <div className={styles.wraper}>
                                <div className={styles.title}>Start date</div>
                                <div className={styles.content}>{row.start}</div>
                            </div>
                            <div className={styles.wraper}>
                                <div className={styles.title}>End date</div>
                                <div className={styles.content}>{row.end}</div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.amount}>{2}</div>
                            <div className={styles.day}>days</div>
                        </div>
                    </div>
                </ClickableTile>
            </Column>
        )
    }

    return (
        <FlexGrid fullWidth className={styles['card']}>
            <Row>
                {rows.map(row => card(row))}
            </Row>
            {
                isOpen &&
                <Offcanvas isOpen={q => setIsOpen(q)}>
                    <LeaveDetails/>
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default CardStatus;