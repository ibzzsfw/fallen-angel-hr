import React, { useState, useEffect } from 'react';
import {
    Tabs,
    Tab,
    Tile
} from 'carbon-components-react';
import { Time32, WarningOther32 } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
// import tab_illo from 'client/src/assets/images/tab-illo.png';

const DailyTime = () => {

    const [clock, setClock] = useState(new Date())

    useEffect(() => {
        const timerID = setInterval(() => setClock(new Date()), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

    const clockElement = (title, time) => {

        return (
            <Tile className='clock'>
                <div className='clock__title'>{title}</div>
                <div className='bottom'>
                    <div className='time'>{time}</div>
                    <Time32 className='logo' />
                </div>
            </Tile>
        );
    }

    return (
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
                            <div className="cds--grid cds--grid--full-width summary">
                                <div className='cds--row'>
                                    <div className='cds--col cds--col-max-4 cds--col-md-8 cds--col-sm-4 left'>
                                        <div className="datetime">
                                            <div className='date'>{`${dayNames[clock.getDay()]}, ${monthNames[clock.getMonth()]} ${clock.getDate()}, ${clock.getFullYear()}`}</div>
                                            <div className='time'>{
                                                clock.getHours().toString().padStart(2, '0')
                                                + ' : ' +
                                                clock.getMinutes().toString().padStart(2, '0')
                                                + ' : ' +
                                                clock.getSeconds().toString().padStart(2, '0')
                                            }</div>
                                        </div>
                                        {clockElement('Clock-in', '08:34:30')}
                                        {clockElement('Clock-out', '16:12:51')}
                                    </div>
                                    <Tile className='cds--col cds--col-max-5 cds--col-md-8 cds--col-sm-4 right'>
                                        <div className='top'>
                                            <div className='wrap'>
                                                <WarningOther32 />
                                                <div className='title'>Late/Early/Absent</div>
                                            </div>
                                            <Link to='/deduction' className='link'>View deduction</Link>
                                        </div>
                                        <Tabs aria-label='summary tab'>
                                            <Tab label='month'>1</Tab>
                                            <Tab label='year'>2</Tab>
                                        </Tabs>
                                    </Tile>
                                </div>
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