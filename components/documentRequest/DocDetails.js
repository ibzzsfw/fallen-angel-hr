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


const DocDetails = ({ detail, isOpen, selected }) => {

    const [note, setNote] = useState('');
    

    const POSTresponse = confirmation => {

        console.log('body', {
        requestid: detail.requestid,
        requestDate: detail.requestdate,
        purpose: detail.purpose,
        confirmation: confirmation
        })

        axios.post('http://localhost:3000/api/document/getDocumentResponse', {
        requestid: detail.requestid,
        requestDate: detail.requestdate,
        purpose: detail.purpose,
        confirmation: confirmation
        })
    }


    return (

        <FlexGrid className={styles['doc-detail']} key={detail.requestid}>
            <Row className={styles.header}>
                <div className={styles.title}>Document request Details</div>
                <Stack orientation='horizontal' className={styles.menu}>
                    <div className={styles.item} />
                    <div className={styles.vertical} />
                    <div className={styles.item} />
                    <div className={styles.vertical} />
                    <div className={styles.item} />
                </Stack>
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
                                    complete = {detail.status === 'approved' || detail.status === 'rejected' || detail.status === 'waiting'}
                                    label="Request form"
                                />
                                <ProgressStep
                                    complete = {detail.status === 'approved' || detail.status === 'rejected'}
                                    current = {detail.status === 'waiting'}
                                    label="HR manager"
                                />
                                <ProgressStep
                                    current = {detail.status === 'approved' || detail.status === 'rejected'}
                                    label="Complete"
                                />
                            </ProgressIndicator>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <TextArea
                                labelText='Note'
                            />
                        </Column>
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
                                    <Button className={styles.button} onClick = {POSTresponse('rejected')} type='reset' size='lg' kind="danger">Reject</Button>
                                    </Column>
                                    <Column
                                        max={{ span: 3 }}
                                        xlg={{ span: 4 }}
                                        lg={{ span: 4 }}
                                        md={{ span: 2 }}
                                        className={styles['button-col']}
                                        >
                                        <Button className={styles.button} onClick = {POSTresponse('approved')} type='submit' size='lg'>Approve</Button>
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