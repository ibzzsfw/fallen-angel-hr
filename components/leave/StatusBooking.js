import {
    Stack
} from '@carbon/react';
import React from 'react';
import styles from '../../scss/leave/status-booking.module.scss';
import CardStatus from './CardStatus';

const StatusBooking = ({ getLeaveBookingStatus }) => {
    return (
        <Stack className={styles['status-booking']}>
            <div className={styles.swticher}>
                <div className={styles['swticher-description']}>
                    <div>All your booking active status</div>
                    <p>Expire from this page after end of leave or booking denied</p>
                </div>
            </div>
            <div className={styles.content}>
                <CardStatus getLeaveBookingStatus={getLeaveBookingStatus} />
            </div>
        </Stack>
    )
}

export default StatusBooking;