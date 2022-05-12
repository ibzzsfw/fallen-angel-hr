import React, { useState } from "react";
import styles from '../../scss/leave/add-booking.module.scss';
import { Button } from '@carbon/react';
import { CalendarEvent } from '@carbon/pictograms-react';
import Booking from "./Booking";
import Offcanvas from "../Offcanvas";
import { Add } from '@carbon/icons-react';

const AddBooking = () => {

    const [isOpen, setIsOpen] = useState(false);     

    return (
        <div className={styles['add-booking']}>
            <CalendarEvent className={styles.calendarEvent}/>
            <div className={styles.middle}>
                <div className={styles.intro}>Ask for time off work</div>
                <div className={styles.title}>Booking new leave request</div>
            </div>
            <Button        
                renderIcon={!isOpen ? Add : null}
                onClick={() => setIsOpen(true)}
            >
                {!isOpen ? 'Book now' : 'Booking...'}    
            </Button>
            {
                isOpen &&
                <Offcanvas isOpen={q => setIsOpen(q)}>
                    <Booking />
                </Offcanvas>
            }
        </div>
    )
}

export default AddBooking;