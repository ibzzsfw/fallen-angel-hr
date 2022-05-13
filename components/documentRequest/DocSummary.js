import React from "react";
import styles from '../../scss/documentRequest/doc-summary.module.scss';
import {
    ExpandableTile,
    TileAboveTheFoldContent,
    TileBelowTheFoldContent,
    Stack,
    Button
} from '@carbon/react'

const DocSummary = () => {

    return (
        <ExpandableTile className={styles['doc-summary']}>
            <TileAboveTheFoldContent>
                <Stack gap='1rem' className={styles.stackVertical}>
                    <div className={styles.header}>
                        <div className={styles.title}>Document request summary</div>
                    </div>
                    <div className={styles.current}>
                        <div className={styles.amount}>2</div>
                        <div className={styles.description}>Pending requesting now</div>
                    </div>
                    {
                        [1, 2, 3].map(i => {
                            return (
                                <div className={styles.detail}>
                                    <div className={styles.name}>Type {i}</div>
                                    <div className={styles.amountType}>4</div>
                                    {/* <div className={styles.amountType}>{Math.floor(Math.random() * 100) % 20}</div> */}
                                </div>
                            )
                        })
                    }
                </Stack>
            </TileAboveTheFoldContent>
            <TileBelowTheFoldContent>
                <Stack gap='1rem' className={styles.stackVertical}>
                    <div className={styles.header}>
                        <div className={styles.title}>Document requesting summary for the last 365 days</div>
                    </div>
                    {
                        [1, 2, 3].map(i => {
                            return (
                                <div className={styles.detail}>
                                    <div className={styles.name}>Type {i}</div>
                                    <div className={styles.amountType}>15</div>
                                    {/* <div className={styles.amountType}>{Math.floor(Math.random() * 100) % 50}</div> */}
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

export default DocSummary;