import React from "react";
import styles from '../../scss/notification/booknotification.module.scss';
import { 
    FlexGrid, 
    Row, 
    Column,
    Form,
    TextInput,
    TextArea,
    Button,
    Stack
} from '@carbon/react';

const BookNotification = () => {

    return (
        <FlexGrid fullWidth condensed className={styles.booknoti}>
            <Row className={styles.header}>
                <Column>Send a notification request here</Column>
            </Row>
            <Row narrow>
                <Form className={styles.form}>
                    <FlexGrid fullWidth>
                        <Row>
                            <p className="cds--file--label" style={{marginBottom: '1rem'}}>Notification details</p>
                        </Row>
                        <Row>
                            <Column max={10} xlg={10} lg={10} md={4} sm={4} style={{ marginBottom: '32px' }}>
                                <TextInput
                                    labelText="Sender ID"
                                    placeholder="039439"
                                    readonly=''
                                >
                                </TextInput>
                            </Column>
                        </Row>
                        <Row>
                            <Column max={10} xlg={10} lg={10} md={4} sm={4} style={{ marginBottom: '32px' }}>
                            <Stack gap='32px'>
                                <TextArea
                                    labelText="Content"
                                    maxCount={500}
                                    row={5}
                                    helperText='max 500 characters'
                                >
                                </TextArea>
                            </Stack>
                            </Column>
                        </Row>
                        <Row className={styles['button-row']}>
                            <Column
                                max={{ span: 3, offset: 10 }}
                                xlg={{ span: 4, offset: 8 }}
                                lg={{ span: 4, offset: 8 }}
                                md={{ span: 2, offset: 4 }}
                                className={styles['button-col']}
                            >
                                <Button className={styles.button} type='reset' size='lg' kind="danger">Clear</Button>
                            </Column>
                            <Column
                                max={{ span: 3 }}
                                xlg={{ span: 4 }}
                                lg={{ span: 4 }}
                                md={{ span: 2 }}
                                className={styles['button-col']}
                                >
                                <Button className={styles.button} type='submit' size='lg' kind="primary">Submit</Button>
                            </Column>
                        </Row>
                    </FlexGrid>
                </Form>
            </Row>
        </FlexGrid>
    );
}

export default BookNotification;