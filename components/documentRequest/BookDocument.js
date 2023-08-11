import {
    Button,
    Column,
    FlexGrid,
    Form,
    Row,
    Select,
    SelectItem,
    Stack,
    TextArea
} from '@carbon/react';
import axios from "axios";
import React, { useState } from "react";
import styles from '../../scss/documentRequest/book-document.module.scss';

const BookDocument = ({ getDocument }) => {

    const [documentid, setDocumentid] = useState('');
    const [purpose, setPurpose] = useState('');

    const POSTbookDocument = () => {
        axios.post('http://localhost:3000/api/document/addDocumentRequest', {
            documentid: documentid,
            purpose: purpose
        }).then(_res => {
            setDocumentid('');
            setPurpose('');
        }).catch(_err => {
        })
    }

    return (
        <FlexGrid fullWidth condensed className={styles.bookdocument}>
            <Row className={styles.header}>
                <Column>Send a document request here</Column>
            </Row>
            <Row narrow>
                <Form className={styles.form}>
                    <FlexGrid fullWidth>
                        <Row>
                            <p className="cds--file--label" style={{ marginBottom: '1rem' }}>Document request details</p>
                        </Row>
                        <Row>
                            <Column max={16} xlg={16} lg={16} md={8} sm={4} style={{ marginBottom: '32px' }}>
                                <Select
                                    id='ddocument-type'
                                    defaultValue="placeholder-item"
                                    labelText="Document type"
                                    onChange={(e) => setDocumentid(e.target.value)}
                                >
                                    <SelectItem
                                        disabled
                                        hidden
                                        value="placeholder-item"
                                        text=""
                                    />
                                    {getDocument && getDocument.map(i => <SelectItem key={i.documentID} value={i.documentID} text={i.documentName} />)}
                                </Select>
                            </Column>
                        </Row>
                        <Row>
                            <Column max={16} xlg={16} lg={16} md={8} sm={4} style={{ marginBottom: '32px' }}>
                                <Stack gap='32px'>
                                    <TextArea
                                        labelText="Purpose"
                                        maxCount={500}
                                        row={5}
                                        helperText='max 500 characters'
                                        onChange={(e) => setPurpose(e.target.value)}
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
                                <Button className={styles.button} onClick={POSTbookDocument} size='lg' kind="primary">Submit</Button>
                            </Column>
                        </Row>
                    </FlexGrid>
                </Form>
            </Row>
        </FlexGrid>
    )
}

export default BookDocument;