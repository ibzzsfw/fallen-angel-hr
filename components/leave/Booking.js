import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from '../../scss/leave/booking.module.scss';
import {
    FlexGrid,
    Row,
    Column,
    Form,
    Stack,
    FormItem,
    FileUploaderDropContainer,
    Select,
    SelectItem,
    DatePicker,
    DatePickerInput,
    TextArea,
    Button,
    Tile
} from '@carbon/react';

const Booking = ({ leaveType }) => {

    const [employeeid, setEmployeeid] = useState('');
    const [leaveid, setLeaveid] = useState('');
    const [reason, setReason] = useState('');
    const [startdate, setStartdate] = useState(new Date().toLocaleString());
    const [enddate, setEnddate] = useState(new Date().toLocaleString());

    const dateFormat = date => {

        return (
            date.getUTCFullYear().toString() + '-' + (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + date.getUTCDate().toString().padStart(2, '0')
        )
    }

    const POSTaddLeave = () => {

        console.log('body', {
            employeeid: "0e38af30-7a6a-4201-9584-42264f2684fc",
            leaveid: leaveid,
            reason: reason,
            startdate: dateFormat(new Date(startdate)),
            enddate: dateFormat(new Date(enddate))
        })

        axios.post('http://localhost:3000/api/leave/addLeave', {
            employeeid: "0e38af30-7a6a-4201-9584-42264f2684fc",
            leaveid: leaveid,
            reason: reason,
            startdate: startdate,
            enddate: enddate
        })
    }

    return (
        <FlexGrid fullWidth condensed className={styles.booking}>
            <Row className={styles.header}>
                <Column >Apply your leave application here</Column>
            </Row>
            <Row narrow>
                <Column>
                    <Form className={styles.form}>
                        <FlexGrid fullWidth>
                            <Row>
                                <p className="cds--file--label" style={{ marginBottom: '1rem' }}>Leave datails</p>
                            </Row>
                            <Row>
                                <Column max={10} xlg={10} lg={10} md={4} sm={4} style={{ marginBottom: '32px' }}>
                                    <Select
                                        id='leave-type'
                                        defaultValue="placeholder-item"
                                        labelText="Leave type"
                                        onChange={(e) => setLeaveid(e.target.value)}
                                    >
                                        <SelectItem
                                            disabled
                                            hidden
                                            value="placeholder-item"
                                            text=""
                                        />
                                        {
                                            leaveType.map(item => {
                                                return (
                                                    <SelectItem
                                                        key={item.leaveID}
                                                        value={item.leaveID}
                                                        text={item.leaveName}
                                                    />
                                                )
                                            })
                                        }
                                    </Select>
                                </Column>
                                <Column max={6} xlg={6} lg={6} md={4} sm={4} style={{ marginBottom: '32px', padding: '0' }}>
                                    <DatePicker
                                        className={styles['date-picker']}
                                        datePickerType='range'
                                        locale='en'
                                        dateFormat='d/m/Y'
                                    >
                                        <DatePickerInput
                                            id={`date-picker-input-id-Start`}
                                            labelText={`Start date`}
                                            placeholder="dd/mm/yyyy"
                                            size="md"
                                            onChange={(e) => setStartdate(e.target.value)}
                                        />
                                        <DatePickerInput
                                            id={`date-picker-input-id-End`}
                                            labelText={`End date`}
                                            placeholder="dd/mm/yyyy"
                                            size="md"
                                            onChange={(e) => setEnddate(e.target.value)}
                                        />
                                    </DatePicker>
                                </Column>
                            </Row>
                            <Row>
                                <Column max={10} className={styles.stack}>
                                    <Stack gap='32px'>
                                        <TextArea
                                            labelText='Reason'
                                            maxCount={500}
                                            row={5}
                                            helperText='max 500 characters'
                                            onChange={(e) => setReason(e.target.value)}
                                        />
                                        <FormItem>
                                            <p className="cds--file--label">
                                                Upload documents
                                            </p>
                                            <p className="cds--label-description">
                                                Max file size is 500kb. Supported file type only .pdf
                                            </p>
                                            <FileUploaderDropContainer
                                                accept={['.pdf']}
                                                filenameStatus="complete"
                                                labelText="Drag and drop files here or click to upload"
                                                multiple
                                                name=""
                                                onAddFiles={function noRefCheck() { }}
                                                onChange={function noRefCheck() { }}
                                                role=""
                                            />
                                            <div
                                                className="cds--file-container"
                                                style={{
                                                    width: '100%'
                                                }}
                                            />
                                        </FormItem>
                                    </Stack>
                                </Column>
                            </Row>
                            <Row className={styles['button-row']} >
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
                                    <Button className={styles.button} size='lg' kind="primary" onClick={POSTaddLeave}>Submit</Button>
                                </Column>
                            </Row>
                        </FlexGrid>
                    </Form>
                </Column>
            </Row>
            <Row>
                <Tile>Alert</Tile>
            </Row>
        </FlexGrid >
    )
}

export default Booking;