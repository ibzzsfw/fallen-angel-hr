import React from 'react';
import styles from '../../scss/notification/RequestDetails.module.scss';
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

const RequestDetails = () => {
    
    return (
        <FlexGrid className={styles['leave-detail']}>
            <Row className={styles.header}>
                <div className={styles.title}>Notification Details</div>
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
                                    <div className={styles.title}>Sender ID</div>
                                    <div className={styles.content}>
                                        <CodeSnippet type="single" feedback="Copied to clipboard">{'1238384473jdcn'}</CodeSnippet>
                                    </div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Request date</div>
                                    <div className={styles.content}>{'05/02/2022'}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Content</div>
                                    <div className={styles.content}>{'content'}</div>
                                </div>
                            </Stack>
                        </Column>
                        <Column max={6}>
                            <Stack gap='1rem'>
                                <Tile light className={styles.tile}>
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Department</div>
                                        <div className={styles.content}>Human resources</div>
                                    </div>
                                    <div className={styles.wraper}>
                                        <div className={styles.title}>Position</div>
                                        <div className={styles.content}>Secretary</div>
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
                                    complete
                                    label="Request form"
                                />
                                <ProgressStep
                                    current
                                    label="Admin"
                                />
                                <ProgressStep
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
                        <Column className={styles['button-row']} >
                            <Button className={styles.button} type='submit' size='lg' kind="danger">Reject</Button>
                            <Button className={styles.button} type='submit' size='lg'>Approve</Button>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default RequestDetails;