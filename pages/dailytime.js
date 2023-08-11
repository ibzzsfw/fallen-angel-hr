import {
    Column,
    FlexGrid,
    Row,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@carbon/react';
import axios from 'axios';
import Log from '../components/dailytime/Log';
import Summary from '../components/dailytime/Summary';
import stylesBanner from '../scss/banner.module.scss';
import styles from '../scss/dailytime/dailytime.module.scss';

const DailyTime = (props) => {

    return (
        <>
            {/* <div className='bg-override' /> */}
            <FlexGrid fullWidth className={styles.dailytime}>
                <Row className={stylesBanner.banner + ' ' + stylesBanner.tabs}>
                    <Column lg={16}>
                        <h1 className={stylesBanner.heading}>{'Daily time'}</h1>
                        <p className={stylesBanner.p}>{'Monitoring and organizing time information'}</p>
                    </Column>
                </Row>
                <Row className={styles['tab-area']}>
                    <Column >
                        <Tabs aria-label="Tab navigation">
                            <TabList aria-label='navigate' scrollIntoView style={{ justifyContent: 'flex-end' }}>
                                <Tab >Summary</Tab>
                                <Tab >Log</Tab>
                            </TabList>
                            <TabPanels className={styles['tab-content']}>
                                <TabPanel>
                                    <Summary clock={props.clock} log={props.log}/>
                                </TabPanel>
                                <TabPanel>
                                    <Log raw={props.log} getInformationByPosition={props.getInformationByPosition} />
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

    const res1 = await axios.get('http://localhost:3000/api/dailytime/getDailyClock')
    const clock = await res1.data;

    const res2 = await axios.get('http://localhost:3000/api/dailytime/log', {
        headers: {
            employeeid: '1ac39e28-8e18-4a54-b56a-14a53fac104c',
            type: 'absent' // not included type
        }
    })
    const log = await res2.data;

    const res3 = await axios.get('http://localhost:3000/api/profile/getInformationByPosition', {
        headers: {
            employeeid: '1ac39e28-8e18-4a54-b56a-14a53fac104c',
        }
    })
    const getInformationByPosition = await res3.data;

    return {
        props: {
            clock: clock,
            log: log,
            getInformationByPosition: getInformationByPosition
        }
    }
}