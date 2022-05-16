import React, { useState } from 'react';
import styles from '../../scss/leave/status-booking.module.scss';
import {
    Stack
} from '@carbon/react';
import CardStatus from './CardStatus';

const StatusBooking = ({ getLeaveBookingStatus }) => {

    console.log(getLeaveBookingStatus);

    return (
        <Stack className={styles['status-booking']}>
            <div className={styles.swticher}>
                <div className={styles['swticher-description']}>
                    <div>All your booking active status</div>
                    <p>Expire from this page after end of leave or booking denied</p>
                </div>
            </div>
            <div className={styles.content}>
                <CardStatus getLeaveBookingStatus={getLeaveBookingStatus}/>
            </div>
        </Stack>
    )
}

export default StatusBooking;