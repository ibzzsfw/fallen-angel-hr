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
import { dateFormat } from '../../utils/utils';

const CardDocument = ({ getDocBookingStatus }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(-1);

    // const tag = (status) => {
    //     switch (status) {
    //         case 'waiting':
    //             return <Tag type='blue'>Waiting</Tag>;
    //         case 'approved':
    //             return <Tag type='green'>Approved</Tag>;
    //         case 'rejected':
    //             return <Tag type='red'>Rejected</Tag>;
    //         default:
    //             <></>
    //     }
    // }
    const card = (row, index) => {
        return (
            <Column max={4} key={row.re}>
                <ClickableTile
                    className={styles.tile}
                    onClick={() => {
                        setIsOpen(true);
                        setIndex(index);
                    }}
                >
                    <div className={styles.header}>
                        <div className={styles.type}>{row.DocumentType}</div>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Booking date</div>
                        <div className={styles.content}>{dateFormat(row.requestDate)}</div>
                    </div>
                    <div className={styles.wraper}>

                        <div className={styles.title}>purpose</div>
                        <div className={styles.content}>{row.purpose}</div>
                    </div>
                </ClickableTile>
            </Column>
        )
    }

    return (
        <FlexGrid fullWidth className={styles['card']}>
            <Row>{getDocBookingStatus && getDocBookingStatus.map((row, index) => card(row, index))}</Row>
            {
                isOpen &&
                <Offcanvas isOpen={q => setIsOpen(q)}>
                    <DocDetails detail={getDocBookingStatus[index]} isOpen={q => setIsOpen(q)} selected={e => {
                        if (index + e === getDocBookingStatus.length) {
                            setIndex(0)
                        } else if (index + e < 0) {
                            setIndex(getDocBookingStatus.length - 1)
                        } else {
                            setIndex(index + e)
                        }
                    }} />
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default CardDocument;