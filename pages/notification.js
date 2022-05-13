import React, { useState } from 'react';
import styles from '../scss/dashboard/notification.module.scss';
import Banner from '../components/Banner';
import CardRequest from '../components/notification/CardRequest';
import TableRequest from '../components/notification/TableRequest';
import { 
    FlexGrid,
    Stack,
    Button
} from "@carbon/react";
import { Table, Grid } from '@carbon/icons-react';

const Notification = () => {

    const [selectedContent, setSelectedContent] = useState('card');
    
    return (
        <FlexGrid fullWidth className={styles.notification}>
            <Banner heading="Notification request" p="" tabs={false} />
            <Stack className={styles['status-notification']}>
                <div className={styles.swticher}>
                    <div className={styles['swticher-description']}>
                        <div>All your request</div>
                        <p>Expires from this page after 14 days of announcement or request is denied.</p>
                    </div>
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
                    <div className={styles.vertivalBar}/>
                    <Button
                        renderIcon={Grid}
                        className={styles.button + (selectedContent === 'card' ? ' ' + styles.active : '')}
                        kind="ghost"
                        onClick={() => setSelectedContent('card')}
                    >
                        Card
                    </Button>
                </div>
                <div className={styles.content}>
                    {
                        selectedContent==='table'
                        ? <TableRequest />
                        : <CardRequest />
                    }
                </div>
            </Stack>
        </FlexGrid>
    );
}

export default Notification;