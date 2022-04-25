import React, { useState } from 'react';
import {
    Button,
    Tabs,
    Tab,
    Tile
} from 'carbon-components-react';
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
                    <h1 className="dailytime__heading">Description about this page</h1>
                </div>
            </div>
            <div className="cds--row dailytime__r2">
                <div className="cds--col cds--no-gutter">
                    <Tabs {...props.tabs} aria-label="Tab navigation">
                        <Tab {...props.tab} label="Summary">
                            <div className="summary">
                                <div className='date'>Monday, April 25, 2022</div>
                                <div className='time'>
                                    {'15 : 03 : 45'}
                                </div>
                                <Tile className='clock in'>
                                    <div className='clock__title'>Clock-in</div>
                                    <div className='clock__time'>08:34:30</div>
                                </Tile>
                                <Tile className='clock out'>
                                    <div className='clock__title'>Clock-out</div>
                                    <div className='clock__time'>16:12:51</div>
                                </Tile>
                                <Tile className='abnormal'>
                                    <div className='top'>
                                        <div className='title'>Late/Early/Absent</div>
                                        <Link to='/' className='link'>View all</Link>
                                    </div>
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
        </div>
    );
}

export default DailyTime;