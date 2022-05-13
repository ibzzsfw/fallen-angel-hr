import React, { useState } from 'react';
import styles from '../../scss/leave/status-booking.module.scss';
import {
    Button,
    Stack
} from '@carbon/react';
import { Table, Grid } from '@carbon/icons-react';
import CardStatus from './CardStatus';
import TableStatus from './TableStatus';

const StatusBooking = () => {

    const [selectedContent, setSelectedContent] = useState('card');

    return (
        <Stack className={styles['status-booking']}>
            <div className={styles.swticher}>
                <div className={styles['swticher-description']}>
                    <div>All your booking active status</div>
                    <p>Expire from this page after end of leave or booking denied</p>
                </div>
                <div className={styles.group}>
                    <Button
                    renderIcon={Table}
                    className={styles.button + (selectedContent === 'table' ? ' ' + styles.active : '')}
                    kind="ghost"
                    onClick={() => setSelectedContent('table')}
                >
                    Table
                </Button>
                <div className={styles.vertivalBar} />
                <Button
                    renderIcon={Grid}
                    className={styles.button + (selectedContent === 'card' ? ' ' + styles.active : '')}
                    kind="ghost"
                    onClick={() => setSelectedContent('card')}
                >
                    Card
                </Button>
                </div>
            </div>
            <div className={styles.content}>
                {
                    selectedContent==='table'
                    ? <TableStatus />
                    : <CardStatus />
                }
            </div>
        </Stack>
    )
}

export default StatusBooking;