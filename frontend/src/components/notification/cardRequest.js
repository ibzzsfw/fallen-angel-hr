import React, { useState } from 'react';
import styles from '../../scss/notification/card-request.module.scss';
import {
    FlexGrid,
    Column,
    Row,
    ClickableTile,
    Tag,
} from '@carbon/react';
import { rows } from './RequestData';
import Offcanvas from "../Offcanvas";
import RequestDetails from './RequestDetails';

const cardRequest = () => {

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
                        <div className={styles.title}>Request date</div>
                        <div className={styles.content}>{row.date}</div>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Content</div>
                        <div className={styles.content}>{row.content}</div>
                    </div>
                    <div className={styles.footer}>
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
                    <RequestDetails/>
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default cardRequest;