import React from 'react';
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

const DocDetails = () => {
    
    return (
        <FlexGrid className={styles['doc-detail']}>
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
                                        <CodeSnippet type="single" feedback="Copied to clipboard">{'1238384473jdcn'}</CodeSnippet>
                                    </div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Requesting date</div>
                                    <div className={styles.content}>{'05/02/2022'}</div>
                                </div>
                                <div className={styles.wraper}>
                                    <div className={styles.title}>Purpose</div>
                                    <div className={styles.content}>{'purpose'}</div>
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
                                    label="HR manager"
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
                        <Column>
                            <Row className={styles['button-row']}>
                                <Column
                                    max={{ span: 3, offset: 10 }}
                                    xlg={{ span: 4, offset: 8 }}
                                    lg={{ span: 4, offset: 8 }}
                                    md={{ span: 2, offset: 4 }}
                                    className={styles['button-col']}
                                >
                                <Button className={styles.button} type='reset' size='lg' kind="danger">Reject</Button>
                                </Column>
                                <Column
                                    max={{ span: 3 }}
                                    xlg={{ span: 4 }}
                                    lg={{ span: 4 }}
                                    md={{ span: 2 }}
                                    className={styles['button-col']}
                                    >
                                    <Button className={styles.button} type='submit' size='lg'>Approve</Button>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default DocDetails;