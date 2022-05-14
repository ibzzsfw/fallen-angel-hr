import React, { useState } from "react";
import {
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    FlexGrid,
    Row,
    Column,
    Tile,
    Stack,
} from '@carbon/react';
import styles from '../scss/leave/leave.module.scss';
import Banner from '../components/Banner';
import LeaveSummary from "../components/leave/LeaveSummary";
import AddBooking from "../components/leave/AddBooking";
import Remain from "../components/leave/Remain";
import StatusBooking from "../components/leave/StatusBooking";

const Leave = () => {

    return (
        <FlexGrid fullWidth className={styles.leave}>
            < Banner heading="Leave" p="Self-Scheduling Leave application" tabs={true} />
            <Row>
                <Column >
                    <Tabs aria-label="Tab navigation">
                        <TabList scrollIntoView style={{ justifyContent: 'flex-end' }}>
                            <Tab >Summary</Tab>
                            <Tab >Booking status</Tab>
                        </TabList>
                        <TabPanels className={styles['tab-content']}>
                            <TabPanel>
                                <Row className={styles.mainRow}>
                                    <Column max={5} className={styles.left}>
                                        <Stack gap='32px' className={styles.stack}>
                                            <AddBooking />
                                            <Remain />
                                        </Stack>
                                    </Column>
                                    <Column max={6} className={styles.right}>
                                        <LeaveSummary />
                                    </Column>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <StatusBooking />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Column>
            </Row>
        </FlexGrid>
    );
}

export default Leave;