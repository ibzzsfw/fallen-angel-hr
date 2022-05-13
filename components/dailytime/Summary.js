import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Tile,
    FlexGrid,
    Row,
    Column,
    Tag,
    Accordion,
    AccordionItem,
} from '@carbon/react';
import styles from '../../scss/dailytime/summary.module.scss';
import { Time, WarningOther } from '@carbon/icons-react';
import { timeFormat, monthNames, dayNames } from '../../utils/utils';

const Summary = ({ clock }) => {

    const element = <>
        <div className={styles.dec}>
            <div className={styles.date}>25/05</div>
            <div className={styles.clock}>-</div>
            <Tag
                className={styles["tag"]}
                size="sm"
                type="purple"
            >
                Absent
            </Tag>
        </div>
        <div className={styles.dec}>
            <div className={styles.date}>25/05</div>
            <div className={styles.clock}>-</div>
            <Tag
                className={styles["tag"]}
                size="sm"
                type="blue"
            >
                Over leave
            </Tag>
        </div>
        <div className={styles.dec}>
            <div className={styles.date}>23/05</div>
            <div className={styles.clock}>08.39</div>
            <Tag
                className={styles["tag"]}
                size="sm"
                type="red"
            >
                Late
            </Tag>
        </div>
        <div className={styles.dec}>
            <div className={styles.date}>24/05</div>
            <div className={styles.clock}>10.00</div>
            <Tag
                className={styles["tag"]}
                size="sm"
                type="magenta"
            >
                Early
            </Tag>
        </div>
        <div className={styles.dec}>
            <div className={styles.date}>25/05</div>
            <div className={styles.clock}>-</div>
            <Tag
                className={styles["tag"]}
                size="sm"
                type="purple"
            >
                Absent
            </Tag>
        </div>
        <div className={styles.dec}>
            <div className={styles.date}>25/05</div>
            <div className={styles.clock}>-</div>
            <Tag
                className={styles["tag"]}
                size="sm"
                type="blue"
            >
                Over leave
            </Tag>
        </div>
    </>

    const router = useRouter();
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
                    {clock[0] && clockElement('Clock-in', timeFormat(clock[0].clockIn))}
                    {clock[0] && clockElement('Clock-out', timeFormat(clock[0].clockOut))}
                </Column>
                <Column max={5} md={4} sm={4}>
                    <Tile className={styles.right}>
                        <div className={styles.top}>
                            <div className={styles.wrap}>
                                <WarningOther size={32} />
                                <div className={styles.title}>Late/Early/Absent</div>
                            </div>
                            <div onClick={() => router.push('/payment')} className={styles.link}>View payment</div>
                        </div>
                        <Tabs aria-label='summary tab' className={styles.tabs}>
                            <TabList className={styles.tablist}>
                                <Tab className={styles.tab}>{TabLabel('Month', 0)}</Tab>
                                <Tab className={styles.tab}>{TabLabel('Year', 16)}</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel className={styles['tab-panel']}>
                                    {/* <div className={styles.no_data}>No records</div> */}
                                    {element}
                                </TabPanel>
                                <TabPanel className={styles['tab-panel']}>
                                    <div className={styles.dec + ' ' + styles.four}>
                                        <div className={styles.colName}>Month</div>
                                        <Tag
                                            className={styles["tag"]}
                                            size="sm"
                                            type="purple"
                                        >
                                            Absent
                                        </Tag>
                                        <Tag
                                            className={styles["tag"]}
                                            size="sm"
                                            type="magenta"
                                        >
                                            Early
                                        </Tag>
                                        <Tag
                                            className={styles["tag"]}
                                            size="sm"
                                            type="purple"
                                        >
                                            Absent
                                        </Tag>
                                    </div>
                                    {
                                        monthNames.map(month => {

                                            return (
                                                <div className={styles.dec + ' ' + styles.four} key={month}>
                                                    <div className={styles.date}>{month}</div>
                                                    <div className={styles.clock}>5</div>
                                                    <div className={styles.clock}>5</div>
                                                    <div className={styles.clock}>5</div>
                                                </div>
                                            )
                                        })
                                    }
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