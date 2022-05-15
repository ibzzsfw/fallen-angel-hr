import React from "react";
import styles from '../../scss/documentRequest/doc-summary.module.scss';
import {
    ExpandableTile,
    TileAboveTheFoldContent,
    TileBelowTheFoldContent,
    Stack,
    Button
} from '@carbon/react'
import { CheckmarkFilled, InProgress, CloseFilled } from '@carbon/react/icons';

const DocSummary = () => {

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
        <ExpandableTile className={styles['doc-summary']}>
            <TileAboveTheFoldContent>
                <Stack gap='1rem' className={styles.stackVertical}>
                    <div className={styles.header}>
                        <div className={styles.title}>Document request summary</div>
                    </div>
                    <div className={styles.current}>
                        <div className={styles.amount}>5</div>
                        <div className={styles.description}>Pending booking now</div>
                    </div>
                    {
                        [
                            {
                                documentName: 'employment certification',
                                amountType: [
                                    {
                                        status: 'waiting',
                                        amount: 2
                                    },
                                    {
                                        status: 'approved',
                                        amount: 2
                                    },
                                    {
                                        status: 'rejected',
                                        amount: 0
                                    }
                                ]
                            },
                            {
                                documentName: 'leave booking record',
                                amountType: [
                                    {
                                        status: 'waiting',
                                        amount: 3
                                    },
                                    {
                                        status: 'approved',
                                        amount: 0
                                    },
                                    {
                                        status: 'rejected',
                                        amount: 1
                                    }
                                ]
                            },
                            {
                                documentName: 'salary certification',
                                amountType: [
                                    {
                                        status: 'waiting',
                                        amount: 0
                                    },
                                    {
                                        status: 'approved',
                                        amount: 0
                                    },
                                    {
                                        status: 'rejected',
                                        amount: 1
                                    }
                                ]
                            },
                        ].map(type => {
                            return (
                                <div className={styles.detail}>
                                    <div className={styles.name}>{type.documentName}</div>
                                    <div className={styles.amountType}>
                                        {
                                            type.amountType.map(s => render(s))
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
                        [
                            {
                                documentName: 'employment certification',
                                amountType: [
                                    {
                                        status: 'waiting',
                                        amount: 2
                                    },
                                    {
                                        status: 'approved',
                                        amount: 2
                                    },
                                    {
                                        status: 'rejected',
                                        amount: 0
                                    }
                                ]
                            },
                            {
                                documentName: 'leave booking record',
                                amountType: [
                                    {
                                        status: 'waiting',
                                        amount: 3
                                    },
                                    {
                                        status: 'approved',
                                        amount: 0
                                    },
                                    {
                                        status: 'rejected',
                                        amount: 1
                                    }
                                ]
                            },
                            {
                                documentName: 'salary certification',
                                amountType: [
                                    {
                                        status: 'waiting',
                                        amount: 0
                                    },
                                    {
                                        status: 'approved',
                                        amount: 0
                                    },
                                    {
                                        status: 'rejected',
                                        amount: 1
                                    }
                                ]
                            },
                        ].map(type => {
                            return (
                                <div className={styles.detail}>
                                    <div className={styles.name}>{type.documentName}</div>
                                    <div className={styles.amountType}>
                                        {
                                            type.amountType.map(s => render(s))
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

export default DocSummary;