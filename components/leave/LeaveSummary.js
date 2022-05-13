import React from "react";
import styles from '../../scss/leave/leave-summary.module.scss';
import {
    ExpandableTile,
    TileAboveTheFoldContent,
    TileBelowTheFoldContent,
    Stack,
    Button
} from '@carbon/react';
import { CheckmarkFilled, InProgress, CloseFilled, HelpFilled } from '@carbon/icons-react';

const LeaveSummary = () => {

    return (
        <ExpandableTile className={styles['leave-summary']}>
            <TileAboveTheFoldContent>
                <Stack gap='1rem' className={styles.stackVertical}>
                    <div className={styles.header}>
                        <div className={styles.title}>Leave summary</div>
                    </div>
                    <div className={styles.current}>
                        <div className={styles.amount}>2</div>
                        <div className={styles.description}>Pending booking now</div>
                    </div>
                    {
                        [1, 2, 3, 4].map(i => {
                            return (
                                <div className={styles.detail}>
                                    <div className={styles.name}>Type {i}</div>
                                    <div className={styles.amountType}>
                                        <InProgress size={16} className={styles.inprogress} />
                                        <div className={styles.amount}>4</div>
                                        <CheckmarkFilled size={16} className={styles.checkmark} />
                                        <div className={styles.amount}>2</div>
                                        <CloseFilled size={16} className={styles.close} />
                                        <div className={styles.amount}>6</div>
                                        <HelpFilled size={16} className={styles.help} />
                                        <div className={styles.amount}>10</div>
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
                        [1, 2, 3, 4].map(i => {
                            return (
                                <div className={styles.detail}>
                                    <div className={styles.name}>Type {i}</div>
                                    <div className={styles.amountType}>
                                        <InProgress size={16} className={styles.inprogress} />
                                        <div className={styles.amount}>4</div>
                                        <CheckmarkFilled size={16} className={styles.checkmark} />
                                        <div className={styles.amount}>2</div>
                                        <CloseFilled size={16} className={styles.close} />
                                        <div className={styles.amount}>6</div>
                                        <HelpFilled size={16} className={styles.help} />
                                        <div className={styles.amount}>10</div>
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