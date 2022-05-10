import React from 'react';
import styles from '../../scss/leave-detail.module.scss';
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

const LeaveDetails = () => {

    return (
        <FlexGrid className={styles['leave-detail']}>
            <Row className={styles.header}>
                <div className={styles.title}>Leave Details</div>
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
                                    <div className={styles.title}>Booking ID</div>
                                    <div className={styles.content}>
                                        <CodeSnippet type="single" feedback="Copied to clipboard">{'1238384473jdcn'}</CodeSnippet>
                                    </div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Booking date</div>
                                    <div className={styles.content}>{'05.02.2022'}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Reason</div>
                                    <div className={styles.content}>{'reason'}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Duration</div>
                                    <div className={styles.content}>07/02/2022 - 09/02/2022</div>
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
                                <Tile gap='0.5rem' className={styles.tile}>
                                    <div className={styles.leaveCount}>All leaves in <span>{'Human resources'}</span></div>
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
                                    complete
                                    label="booking form"
                                />
                                <ProgressStep
                                    current
                                    label="Manager"
                                />
                                <ProgressStep
                                    label="Complete"
                                />
                                <ProgressStep
                                    disabled
                                    label="Reconsider"
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
                            <Button className={styles.button} type='submit' size='lg' kind="secondary">Reconsider</Button>
                            <Button className={styles.button} type='submit' size='lg'>Approve</Button>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default LeaveDetails;