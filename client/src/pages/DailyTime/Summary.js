import React, { useState, useEffect } from 'react';
import {
    Tabs,
    Tab,
    Tile,
} from 'carbon-components-react';
import { Time32, WarningOther32 } from '@carbon/icons-react';
import { Link } from 'react-router-dom';

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
            <Tile className='clock'>
                <div className='clock__title'>{title}</div>
                <div className='bottom'>
                    <div className='time'>{time}</div>
                    <Time32 className='logo' />
                </div>
            </Tile>
        );
    }

    const TabLabel = (title, amount) => {

        return (
            <div className='tab-label'>
                <div className='amount'>{amount}</div>
                <div className='title'>{title}</div>
            </div>
        );
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
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
                    <Tabs aria-label='summary tab' contained className='tabs'>
                        <Tab label={TabLabel('Month', 0)}>
                            <div className='no-data'>No records</div>
                        </Tab>
                        <Tab label={TabLabel('Year', 16)}>working on this...</Tab>
                    </Tabs>
                </Tile>
                <div className="cds--col-max-7 space">
                        <img src='https://react-step-6--carbon-tutorial.netlify.app/tab-illo.png' alt='tab-illo' />
                    </div>
            </div>
        </div>
    );
}

export default Summary;