import React, { useState } from 'react';
import styles from '../../scss/leave/leave-detail.module.scss';
import {
    Stack,
    CodeSnippet,
    ProgressIndicator,
    ProgressStep,
    FlexGrid,
    Row,
    Column,
    Tile,
    Form,
    TextArea,
    Button,
} from '@carbon/react';
import { dateFormat } from '../../utils/utils';
import { CaretLeft, CaretRight, Close } from '@carbon/react/icons';
import axios from 'axios';

const LeaveDetails = ({ detail, isOpen, selected }) => {

    const [note, setNote] = useState('');

    const POSTresponse = confirmation => {

        console.log('body', {
            bookingid: detail.bookingID,
            employeeid: detail.employeeID,
            leaveid: detail.leaveID,
            startdate: detail.startDate,
            enddate: detail.endDate,
            managernote: detail.managerNote,
            confirmation: confirmation
        })

        axios.post('http://localhost:3000/api/manager/responseLeave', {
            bookingid: detail.bookingID,
            employeeid: detail.employeeID,
            leaveid: detail.leaveID,
            startdate: detail.startDate,
            enddate: detail.endDate,
            managernote: note,
            confirmation: confirmation
        })
    }

    return (
        <FlexGrid className={styles['leave-detail']} key={detail.bookingID}>
            <Row className={styles.header}>
                <div className={styles.title}>Leave Details</div>
                <div className={styles.menu}>
                    <div
                        className={styles.item}
                        onClick={() => selected(-1)}
                    >
                        <div className={styles.vertical} />
                        <CaretLeft size='32' />
                    </div>
                    <div
                        className={styles.item}
                        onClick={() => selected(1)}
                    >
                        <div className={styles.vertical} />
                        <CaretRight size='32' />
                    </div>
                    <div
                        className={styles.item}
                        onClick={() => isOpen(false)}
                    >
                        <div className={styles.vertical} />
                        <Close size='32' />
                    </div>
                </div>
            </Row>
            <Row className={styles.middle}>
                <Column>
                    <Row>
                        <div className={styles['section-name']}>Details</div>
                    </Row>
                    <Row narrow>
                        <Column max={10}>
                            <Stack gap='1rem'>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Booking ID</div>
                                    <div className={styles.content}>
                                        <CodeSnippet type="single" feedback="Copied to clipboard">{detail.bookingID}</CodeSnippet>
                                    </div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Booking date</div>
                                    <div className={styles.content}>{dateFormat(detail.bookingDate)}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Reason</div>
                                    <div className={styles.content}>{detail.reason}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Duration</div>
                                    <div className={styles.content}>{dateFormat(detail.startDate)} - {dateFormat(detail.endDate)}</div>
                                </div>
                            </Stack>
                        </Column>
                        <Column max={6}>
                            <Stack gap='1rem'>
                                <Tile light className={styles.tile}>
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Department</div>
                                        <div className={styles.content}>{detail.departmentName}</div>
                                    </div>
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Position</div>
                                        <div className={styles.content}>{detail.positionName}</div>
                                    </div>
                                </Tile>
                                <Tile gap='0.5rem' className={styles.tile}>
                                    <div className={styles.leaveCount}>All leaves in <span>{detail.departmentName}</span></div>
                                    <Stack className={styles.dayWraper}>
                                        <div className={styles.day}>
                                            <div className={styles.title}>{'07/02/2022'}</div>
                                            <div className={styles.content}>{'5'}</div>
                                        </div>
                                        <div className={styles.day}>
                                            <div className={styles.title}>{'08/02/2022'}</div>
                                            <div className={styles.content}>{'2'}</div>
                                        </div>
                                        <div className={styles.day}>
                                            <div className={styles.title}>{'09/02/2022'}</div>
                                            <div className={styles.content}>{'2'}</div>
                                        </div>
                                        <div className={styles.day}>
                                            <div className={styles.title}>{'09/02/2022'}</div>
                                            <div className={styles.content}>{'2'}</div>
                                        </div>
                                        <div className={styles.day}>
                                            <div className={styles.title}>{'09/02/2022'}</div>
                                            <div className={styles.content}>{'2'}</div>
                                        </div>
                                        <div className={styles.day}>
                                            <div className={styles.title}>{'09/02/2022'}</div>
                                            <div className={styles.content}>{'2'}</div>
                                        </div>
                                    </Stack>
                                </Tile>
                            </Stack>
                        </Column>
                    </Row>
                </Column>
            </Row>
            <Row className={styles.footer}>
                <Column>
                    <Row>
                        <Column className={styles.progress}>
                            <ProgressIndicator>
                                <ProgressStep
                                    complete={detail.status === 'approved' || detail.status === 'rejected' || detail.status === 'waiting'}
                                    label="booking form"
                                />
                                <ProgressStep
                                    complete={detail.status === 'approved' || detail.status === 'rejected'}
                                    current={detail.status === 'waiting'}
                                    label="Manager"
                                />
                                <ProgressStep
                                    current={detail.status === 'approved' || detail.status === 'rejected'}
                                    label="Complete"
                                />
                            </ProgressIndicator>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <TextArea
                                labelText='Note'
                                defaultValue={detail.managerNote}
                                readOnly={detail.status === 'approved' || detail.status === 'rejected'}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </Column>
                        {
                            detail.status === 'waiting' &&
                            <Column className={styles['button-row']} >
                                <Button className={styles.button} onClick={POSTresponse('rejected')} size='lg' kind="danger">Reject</Button>
                                <Button className={styles.button} onClick={POSTresponse('approved')} size='lg'>Approve</Button>
                            </Column>
                        }
                    </Row>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default LeaveDetails;