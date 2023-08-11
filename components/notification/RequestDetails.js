import {
    Button,
    CodeSnippet,
    Column,
    FlexGrid,
    ProgressIndicator,
    ProgressStep,
    Row,
    Stack,
    Tile,
} from '@carbon/react';
import { CaretLeft, CaretRight, Close } from '@carbon/react/icons';
import axios from 'axios';
import styles from '../../scss/notification/request-details.module.scss';
import { dateFormat } from '../../utils/utils';

const RequestDetails = ({ detail, isOpen, selected }) => {

    const POSTresponse = (e, status) => {

        e.preventDefault();
        axios.post('http://localhost:3000/api/notification/responseNotification', {
            notificationid: detail.notificationID,
            senderid: detail.senderID,
            status: status,
            date: detail.date,
            title: detail.title,
            content: detail.content
        })
    }

    return (
        <FlexGrid className={styles['request-detail']} key={detail.notificationID}>
            <Row className={styles.header}>
                <div className={styles.title}>Notification Details</div>
                {<div className={styles.menu}>
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
                </div>}
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
                                    <div className={styles.title}>Notification ID</div>
                                    <div className={styles.content}>
                                        <CodeSnippet type="single" feedback="Copied to clipboard">{detail.notificationID}</CodeSnippet>
                                    </div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Request date</div>
                                    <div className={styles.content}>{dateFormat(detail.date)}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Title</div>
                                    <div className={styles.content}>{detail.title}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Content</div>
                                    <div className={styles.content2}>{detail.content}</div>
                                </div>
                            </Stack>
                        </Column>
                        <Column max={6}>
                            <Stack gap='1rem'>
                                <Tile light className={styles.tile}>
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Department</div>
                                        <div className={styles.content}>{'human resource'}</div>
                                    </div>
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Position</div>
                                        <div className={styles.content}>{'HR assistant'}</div>
                                    </div>
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
                                    label="Request form"
                                />
                                <ProgressStep
                                    complete={detail.status === 'approved' || detail.status === 'rejected'}
                                    current={detail.status === 'waiting'}
                                    label="Admin"
                                />
                                <ProgressStep
                                    current={detail.status === 'approved' || detail.status === 'rejected'}
                                    label="Complete"
                                />
                            </ProgressIndicator>
                        </Column>
                    </Row>
                    <Row>
                        {
                            detail.status === 'waiting' &&
                            <Column className={styles['button-row']} >
                                <Button className={styles.button} onClick={e => POSTresponse(e, 'rejected')} size='lg' kind="danger">Reject</Button>
                                <Button className={styles.button} onClick={e => POSTresponse(e, 'approved')} size='lg'>Approve</Button>
                            </Column>
                        }
                    </Row>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default RequestDetails;