import React, { useState } from "react";
import styles from '../../scss/documentRequest/doc-status.module.scss';
import CardDocument from './CardDocument';
import TableDocument from './TableDocument';
import { Table, Grid } from '@carbon/react/icons';
import { 
    Stack,
    Button 
} from "@carbon/react";

const DocStatus = ({getDocBookingStatus}) => {

    const [selectedContent, setSelectedContent] = useState('card');
    return (
        <Stack className={styles['status-bookingdoc']}>
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
                     <CardDocument getDocBookingStatus={getDocBookingStatus}/>
            </div>
        </Stack>
    )
}

export default DocStatus;