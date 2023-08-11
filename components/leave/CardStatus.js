import {
    ClickableTile,
    Column,
    FlexGrid,
    Row,
    Tag,
} from '@carbon/react';
import { useState } from 'react';
import styles from '../../scss/leave/card-status.module.scss';
import { dateFormat } from '../../utils/utils';
import Offcanvas from "../Offcanvas";
import LeaveDetails from './LeaveDetails';

const CardStatus = ({ getLeaveBookingStatus }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(-1);

    const tag = (status) => {
        switch (status) {
            case 'waiting':
                return <Tag type='blue'>Waiting</Tag>;
            case 'approved':
                return <Tag type='green'>Approved</Tag>;
            case 'rejected':
                return <Tag type='red'>Rejected</Tag>;
            default:
                <></>

        }
    }

    const card = (row, index) => {
        return (
            <Column max={4} key={row.bookingID}>
                <ClickableTile
                    className={styles.tile}
                    onClick={() => {
                        setIsOpen(true);
                        setIndex(index);
                    }}
                >
                    <div className={styles.header}>
                        <div className={styles.type}>{row.leaveName}</div>
                        {tag(row.status)}
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Booking date</div>
                        <div className={styles.content}>{dateFormat(row.bookingDate)}</div>
                    </div>
                    <div className={styles.wraper}>
                        <div className={styles.title}>Reason</div>
                        <div className={styles.content}>{row.reason}</div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.left}>
                            <div className={styles.wraper}>
                                <div className={styles.title}>Start date</div>
                                <div className={styles.content}>{dateFormat(row.startDate)}</div>
                            </div>
                            <div className={styles.wraper}>
                                <div className={styles.title}>End date</div>
                                <div className={styles.content}>{dateFormat(row.endDate)}</div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.amount}>{new Date(row.endDate).getDate() - new Date(row.startDate).getDate() + 1}</div>
                            <div className={styles.day}>days</div>
                        </div>
                    </div>
                </ClickableTile>
            </Column>
        )
    }

    return (
        <FlexGrid fullWidth className={styles['card']}>
            <Row>{getLeaveBookingStatus.map((row, index) => card(row, index))}</Row>
            {
                isOpen &&
                <Offcanvas isOpen={q => setIsOpen(q)} width='l'>
                    <LeaveDetails detail={getLeaveBookingStatus[index]} isOpen={q => setIsOpen(q)} selected={e => {
                        if (index + e === getLeaveBookingStatus.length) {
                            setIndex(0)
                        } else if (index + e < 0) {
                            setIndex(getLeaveBookingStatus.length - 1)
                        } else {
                            setIndex(index + e)
                        }
                    }} />
                </Offcanvas>
            }
        </FlexGrid>
    )
}

export default CardStatus;