import React from 'react';
import axios from 'axios';
import {
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    FlexGrid,
    Row,
    Column,
} from '@carbon/react';
import styles from '../scss/dailytime/dailytime.module.scss';
import Summary from '../components/dailytime/Summary';
import Banner from '../components/Banner';
import Log from '../components/dailytime/Log';

const DailyTime = (props) => {

    return (
        <>
            {/* <div className='bg-override' /> */}
            <FlexGrid fullWidth className={styles.dailytime}>
                < Banner heading="Daily time" p="Monitoring and organizing time information" tabs={true} />
                <Row className={styles['tab-area']}>
                    <Column >
                        <Tabs aria-label="Tab navigation">
                            <TabList scrollIntoView style={{ justifyContent: 'flex-end' }}>
                                <Tab >Summary</Tab>
                                <Tab >Log</Tab>
                            </TabList>
                            <TabPanels className={styles['tab-content']}>
                                <TabPanel>
                                    <Summary clock={props.clock}/>
                                </TabPanel>
                                <TabPanel>
                                    <Log />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Column>
                </Row>
            </FlexGrid >
        </>
    );
}

export default DailyTime;

export const getStaticProps = async () => {

    const res = await axios.get('http://localhost:3000/api/dailytime/getDailyClock')
    const clock = await res.data;

    return {
        props: {
            clock: clock
        }
    }
}