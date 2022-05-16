import React, { useState } from 'react';
import styles from '../../scss/documentRequest/doc-details.module.scss';
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
import axios from 'axios';
import { CaretLeft, CaretRight, Close } from '@carbon/react/icons';

const DocDetails = ({ detail, isOpen, selected }) => {

    const POSTresponse = (e, confirmation) => {

        e.preventDefault();

        console.log('body', {
            requestid: detail.requestid,
            requestDate: detail.requestdate,
            purpose: detail.purpose,
            confirmation: confirmation,
        })

        axios.post(`http://localhost:3000/document/postDocumentResponse`, {
            requestid: detail.requestid,
            requestDate: detail.requestdate,
            purpose: detail.purpose,
            confirmation: confirmation,
        }).then(res => {
            console.log('res', res);
        }).catch(err => {
            console.log('err', err);
        })
    }


    return (

        <FlexGrid className={styles['doc-detail']} key={detail.requestid}>
            <Row className={styles.header}>
                <div className={styles.title}>Document request Details</div>
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
                                    <div className={styles.title}>Request ID</div>
                                    <div className={styles.content}>
                                        <CodeSnippet type="single" feedback="Copied to clipboard">{detail.requestid}</CodeSnippet>
                                    </div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Requesting date</div>
                                    <div className={styles.content}>{dateFormat(detail.requestDate)}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Purpose</div>
                                    <div className={styles.content}>{detail.purpose}</div>
                                </div>
                                {
                                    detail.status !== 'waiting' &&
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Confirmation</div>
                                        <div className={styles.content}>{detail.confirmation}</div>
                                    </div>
                                }
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
                        {
                            detail.status === 'waiting' &&
                            <Column>
                                <Row className={styles['button-row']}>
                                    <Column
                                        max={{ span: 3, offset: 10 }}
                                        xlg={{ span: 4, offset: 8 }}
                                        lg={{ span: 4, offset: 8 }}
                                        md={{ span: 2, offset: 4 }}
                                        className={styles['button-col']}
                                    >
                                        <Button className={styles.button} onClick={e=>POSTresponse(e, 'rejected')} type='reset' size='lg' kind="danger">Reject</Button>
                                    </Column>
                                    <Column
                                        max={{ span: 3 }}
                                        xlg={{ span: 4 }}
                                        lg={{ span: 4 }}
                                        md={{ span: 2 }}
                                        className={styles['button-col']}
                                    >
                                        <Button className={styles.button} onClick={e=>POSTresponse(e, 'approved')} size='lg'>Approve</Button>
                                    </Column>
                                </Row>
                            </Column>
                        }
                    </Row>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default DocDetails;