import { CalendarEvent } from '@carbon/pictograms-react';
import { Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { useState } from "react";
import styles from '../../scss/leave/add-booking.module.scss';
import Offcanvas from "../Offcanvas";
import Booking from "./Booking";

const AddBooking = ({ leaveType }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles['add-booking']}>
            <CalendarEvent className={styles.calendarEvent} />
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
                <Offcanvas isOpen={q => setIsOpen(q)} width='md'>
                    <Booking leaveType={leaveType} />
                </Offcanvas>
            }
        </div>
    )
}

export default AddBooking;