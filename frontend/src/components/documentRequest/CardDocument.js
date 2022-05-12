import React, { useState } from "react";
import styles from '../../scss/documentRequest/card-document.module.scss';
import {
    FlexGrid,
    Row,
    Column,
    ClickableTile,
    Tag
} from '@carbon/react';
import DocDetails from './DocDetails'
import { rows } from "../documentRequest/DocData";
import Offcanvas from "../Offcanvas";

const CardDocument = () => {

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
                        <div className={styles.title}>Requesting date</div>
                        <div className={styles.content}>{row.date}</div>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Purpose</div>
                        <div className={styles.content}>{row.purpose}</div>
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
                    <DocDetails />
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default CardDocument;