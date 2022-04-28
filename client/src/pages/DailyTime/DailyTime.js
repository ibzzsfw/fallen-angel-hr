import React from 'react';
import {
    Tabs,
    Tab,
} from 'carbon-components-react';
import Summary from './Summary';
import Log from './Log';

const DailyTime = () => {

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
            <div className='bg' />
            <div className="cds--grid cds--grid--full-width dailytime">
                <div className="cds--row dailytime__banner">
                    <div className="cds--col-lg-16">
                        <h1 className="dailytime__heading">Daily time</h1>
                        <p className='dailytime__p'>Monitoring and organizing time information</p>
                    </div>
                </div>
                <div className="cds--row dailytime__r2">
                    <div className="cds--col cds--no-gutter">
                        <Tabs {...props.tabs} aria-label="Tab navigation">
                            <Tab {...props.tab} label="Summary">
                                <Summary />
                            </Tab>
                            <Tab {...props.tab} label="Log">
                                <Log />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div >
        </>
    );
}

export default DailyTime;