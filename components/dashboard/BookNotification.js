import {
    Button,
    Column,
    FlexGrid,
    Form,
    InlineNotification,
    Row,
    Stack,
    TextArea,
    TextInput
} from '@carbon/react';
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from '../../scss/notification/book-notification.module.scss';

const BookNotification = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(false);

    const POSTaddNotification = () => {
        if (title === '' || content === '') {
            setError(true);
        } else {

            axios.post('http://localhost:3000/api/notification/addNotificationRequest', {
                title: title,
                content: content
            }).then(() => {
                setTitle('');
                setContent('');
            })
        }
    }

    return (
        <FlexGrid fullWidth condensed className={styles.booknoti}>
            <Row className={styles.header}>
                <Column>Send a notification request here</Column>
            </Row>
            <Row narrow>
                <Form className={styles.form}>
                    <FlexGrid fullWidth>
                        <Row>
                            <p className="cds--file--label" style={{ marginBottom: '1rem' }}>Notification details</p>
                        </Row>
                        <Row>
                            <Column style={{ marginBottom: '32px' }}>
                                <TextInput
                                    id='title'
                                    labelText="Title"
                                    placeholder="type title here"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Column>
                        </Row>
                        <Row>
                            <Column style={{ marginBottom: '32px' }}>
                                <Stack gap='32px'>
                                    <TextArea
                                        labelText="Content"
                                        maxCount={500}
                                        style={{ height: '500px' }}
                                        helperText='Accept HTML'
                                        onChange={(e) => setContent(e.target.value)}

                                    />
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
                                <Button
                                    className={styles.button}
                                    type='reset'
                                    size='lg'
                                    kind="danger"
                                    onClick={() => {
                                        setContent('');
                                        setTitle('');
                                    }}
                                >Clear</Button>
                            </Column>
                            <Column
                                max={{ span: 3 }}
                                xlg={{ span: 4 }}
                                lg={{ span: 4 }}
                                md={{ span: 2 }}
                                className={styles['button-col']}
                            >
                                <Button
                                    className={styles.button}
                                    type='submit'
                                    size='lg'
                                    kind="primary"
                                    onClick={POSTaddNotification}
                                >Submit</Button>
                            </Column>
                            {
                                error && <InlineNotification
                                    style={{ marginTop: '1rem' }}
                                    kind="error"
                                    title="Request error"
                                    subtitle="Please fill all fields"
                                    onCloseButtonClick={() => setError(false)}
                                    onClose={() => setError(false)}
                                />
                            }
                        </Row>
                    </FlexGrid>
                </Form>
            </Row>
        </FlexGrid>
    );
}

export default BookNotification;