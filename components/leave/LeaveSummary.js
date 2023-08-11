/* eslint-disable react/jsx-key */
import {
    Button,
    ExpandableTile,
    Stack,
    TileAboveTheFoldContent,
    TileBelowTheFoldContent
} from '@carbon/react';
import { CheckmarkFilled, CloseFilled, InProgress } from '@carbon/react/icons';
import styles from '../../scss/leave/leave-summary.module.scss';

const LeaveSummary = (props) => {

    const render = (status) => {

        let jsx = <></>

        switch (status.status) {
            case 'approved':
                jsx = <CheckmarkFilled size={16} className={styles.checkmark} />
                break
            case 'rejected':
                jsx = <CloseFilled size={16} className={styles.close} />
                break
            case 'waiting':
                jsx = <InProgress size={16} className={styles.inprogress} />
                break
            default:
                jsx = <div>UNDEFINED</div>
        }

        return (
            <>
                {jsx}
                <div className={styles.amount}>{status.amount}</div>
            </>
        )
    }

    return (
        <ExpandableTile className={styles['leave-summary']}>
            <TileAboveTheFoldContent>
                <Stack gap='1rem' className={styles.stackVertical}>
                    <div className={styles.header}>
                        <div className={styles.title}>Leave summary</div>
                    </div>
                    <div className={styles.current}>
                        <div className={styles.amount}>1</div>
                        <div className={styles.description}>Pending booking now</div>
                    </div>
                    {
                        props.summaryMonth.map(type => {
                            return (
                                <div className={styles.detail}>
                                    <div className={styles.name}>{type.leaveName}</div>
                                    <div className={styles.amountType}>
                                        {
                                            type.status.map(s => render(s))
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </Stack>
            </TileAboveTheFoldContent>
            <TileBelowTheFoldContent>
                <Stack gap='1rem' className={styles.stackVertical}>
                    <div className={styles.header}>
                        <div className={styles.title}>Leave booking summary for the last 365 days</div>
                    </div>
                    {
                        props.summaryYear.map(type => {
                            return (
                                <div className={styles.detail}>
                                    <div className={styles.name}>{type.leaveName}</div>
                                    <div className={styles.amountType}>
                                        {
                                            type.status.map(s => render(s))
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Button kind="ghost">Request for all bookings</Button>
                </Stack>
            </TileBelowTheFoldContent>
        </ExpandableTile>
    )
}

export default LeaveSummary;