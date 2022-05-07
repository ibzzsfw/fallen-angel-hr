import React from 'react';
import {
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    FlexGrid,
    Row,
    Column,
    Toggle
} from '@carbon/react';
import styles from '../scss/dailytime.module.scss';
import Summary from '../components/dailytime/Summary';
import Log from '../components/dailytime/Log';
import { useThemePreference } from '../components/ThemePreference'

const DailyTime = () => {

    const { theme, setTheme } = useThemePreference();

    const props = {
        tabs: {
            selected: 0,
            role: 'navigation',
        },
        tab: {
            role: 'presentation',
            tabIndex: 0,
        },
    };

    return (
        <>
            {/* <div className='bg-override' /> */}
            <FlexGrid fullWidth className={styles.dailytime}>
                <Row className={styles.dailytime__banner}>
                    <Column lg={16}>
                        <h1 className={styles.dailytime__heading}>Daily time</h1>
                        <p className={styles.dailytime__p}>
                            Monitoring and organizing time information
                            <span>
                                <Toggle
                                    onToggle={() => {
                                        if (theme === 'white') {
                                            setTheme('g100');
                                        }
                                        if (theme === 'g100') {
                                            setTheme('white');
                                        }
                                    }}
                                    labelA="Light"
                                    labelB="Dark"
                                    id="toggle-1"
                                />
                            </span>
                        </p>
                    </Column>
                </Row>
                <Row className={styles.dailytime__r2}>
                    <Column >
                        <Tabs {...props.tabs} aria-label="Tab navigation">
                            <TabList style={{ justifyContent: 'flex-end' }}>
                                <Tab >Summary</Tab>
                                <Tab >Log</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel><Summary /></TabPanel>
                                <TabPanel><Log /></TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Column>
                </Row>
            </FlexGrid >
        </>
    );
}

export default DailyTime;