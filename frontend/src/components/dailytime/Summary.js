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

const Summary = () => {

    const [clock, setClock] = useState(new Date())

    useEffect(() => {
        const timerID = setInterval(() => setClock(new Date()), 1000);

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

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <FlexGrid className={styles.summary}>
            <Row>
                <Column max={4} md={4} sm={4} className={styles.left}>
                    <div className={styles.datetime}>
                        <div className={styles.date}>{
                            `${dayNames[clock.getDay()]}, ${monthNames[clock.getMonth()]} ${clock.getDate()}, ${clock.getFullYear()}`
                        }</div>
                        <div className={styles.time}>{
                            clock.getHours().toString().padStart(2, '0')
                            + ' : ' +
                            clock.getMinutes().toString().padStart(2, '0')
                            + ' : ' +
                            clock.getSeconds().toString().padStart(2, '0')
                        }</div>
                    </div>
                    {clockElement('Clock-in', '08:34:30')}
                    {clockElement('Clock-out', '16:12:51')}
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