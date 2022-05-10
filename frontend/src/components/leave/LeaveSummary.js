import React from "react";
import styles from '../../scss/leave-summary.module.scss';
import {
    ExpandableTile,
    TileAboveTheFoldContent,
    TileBelowTheFoldContent,
    Stack,
    Link,
    Button
} from '@carbon/react';

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
                                    <div className={styles.amountType}>{Math.floor(Math.random() * 100) % 20}</div>
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
                                    <div className={styles.amountType}>{Math.floor(Math.random() * 100) % 50}</div>
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