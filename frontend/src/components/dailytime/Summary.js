import React, { useState, useEffect } from 'react';
import {
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Tile,
    Link,
    FlexGrid,
    Row,
    Column
} from '@carbon/react';
import styles from '../../scss/dailytime/summary.module.scss';
import { Time, WarningOther } from '@carbon/icons-react';
import { timeFormat, monthNames, dayNames } from '../../../utils/utils';

const Summary = ({ clock }) => {

    const [realTimeClock, setRealTimeClock] = useState(new Date())

    useEffect(() => {
        const timerID = setInterval(() => setRealTimeClock(new Date()), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const clockElement = (title, time) => {

        return (
            <Tile className={styles.clock}>
                <div className={styles.clock__title}>{title}</div>
                <div className={styles.bottom}>
                    <div className={styles.time}>{time}</div>
                    <Time size={32} className={styles.logo} />
                </div>
            </Tile>
        );
    }

    const TabLabel = (title, amount) => {

        return (
            <div className={styles.label}>
                <div className={styles.amount}>{amount}</div>
                <div className={styles.title}>{title}</div>
            </div>
        );
    }

    return (
        <FlexGrid className={styles.summary}>
            <Row>
                <Column max={4} md={4} sm={4} className={styles.left}>
                    <div className={styles.datetime}>
                        <div className={styles.date}>{
                            `${dayNames[realTimeClock.getDay()]}, ${monthNames[realTimeClock.getMonth()]} ${realTimeClock.getDate()}, ${realTimeClock.getFullYear()}`
                        }</div>
                        <div className={styles.time}>{timeFormat(realTimeClock).replaceAll(':', ' : ')}</div>
                    </div>
                    {clockElement('Clock-in', timeFormat(clock[0].clockIn))}
                    {clockElement('Clock-out', timeFormat(clock[0].clockOut))}
                </Column>
                <Column max={5} md={4} sm={4}>
                    <Tile className={styles.right}>
                        <div className={styles.top}>
                            <div className={styles.wrap}>
                                <WarningOther size={32} />
                                <div className={styles.title}>Late/Early/Absent</div>
                            </div>
                            <Link to='/deduction' className={styles.link}>View deduction</Link>
                        </div>
                        <Tabs aria-label='summary tab' className={styles.tabs}>
                            <TabList className={styles.tablist}>
                                <Tab className={styles.tab}>{TabLabel('Month', 0)}</Tab>
                                <Tab className={styles.tab}>{TabLabel('Year', 16)}</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className={styles.no_data}>No records</div>
                                </TabPanel>
                                <TabPanel>
                                    working on this...
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Tile>
                </Column>
                <Column max={7} className={styles.space}>
                    <img src='tab-illo.png' alt='tab-illo' />
                </Column>
            </Row>
        </FlexGrid>
    );
}

export default Summary;