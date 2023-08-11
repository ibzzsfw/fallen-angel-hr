import { Stack } from "@carbon/react";
import styles from '../../scss/documentRequest/doc-status.module.scss';
import CardDocument from './CardDocument';

const DocStatus = ({ getDocBookingStatus }) => {

    return (
        <Stack className={styles['status-bookingdoc']}>
            <div className={styles.swticher}>
                <div className={styles['swticher-description']}>
                    <div>All your booking active status</div>
                    <p>Expire from this page after end of leave or booking denied</p>
                </div>
            </div>
            <div className={styles.content}>
                <CardDocument getDocBookingStatus={getDocBookingStatus} />
            </div>
        </Stack>
    )
}

export default DocStatus;