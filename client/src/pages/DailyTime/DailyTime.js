import React, { useState } from 'react';
import {
    Button,
    Tabs,
    Tab,
    Tile
} from 'carbon-components-react';
import { Time32, WarningOther32 } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
// import tab_illo from 'client/src/assets/images/tab-illo.png';

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
        <div className="cds--grid cds--grid--full-width dailytime">
            <div className="cds--row dailytime__banner">
                <div className="cds--col-lg-16">
                    <h1 className="dailytime__heading">Daily time</h1>
                </div>
                <p className='dailytime__p'>Monitoring and organizing time information</p>
            </div>
            <div className="cds--row dailytime__r2">
                <div className="cds--col cds--no-gutter">
                    <Tabs {...props.tabs} aria-label="Tab navigation">
                        <Tab {...props.tab} label="Summary">
                            <div className="summary">
                                <div className="datetime">
                                    <div className='date'>Monday, April 25, 2022</div>
                                    <div className='time'>{'15 : 03 : 45'}</div>
                                </div>
                                <Tile className='clock in'>
                                    <div className='clock__title'>Clock-in</div>
                                    <div className='bottom'>
                                        <div className='time'>08:34:30</div>
                                        <Time32 className='logo' />
                                    </div>
                                </Tile>
                                <Tile className='clock out'>
                                    <div className='clock__title'>Clock-out</div>
                                    <div className='bottom'>
                                        <div className='time'>16:12:51</div>
                                        <Time32 className='logo' />
                                    </div>
                                </Tile>
                                <Tile className='right'>
                                    <div className='top'>
                                        <div className='wrap'>
                                            <WarningOther32 />
                                            <div className='title'>Late/Early/Absent</div>
                                        </div>
                                        <Link to='/deduction' className='link'>View deduction</Link>
                                    </div>
                                    <Tabs defaultSelectedIndex={0} selectedIndex={0} aria-label='summary tab'>
                                        <Tab label='month'>1</Tab>
                                        <Tab label='year'>2</Tab>
                                    </Tabs>

                                </Tile>
                            </div>
                        </Tab>
                        <Tab {...props.tab} label="Log">
                            <div className="cds--grid cds--grid--no-gutter cds--grid--full-width">

                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div >
    );
}

export default DailyTime;