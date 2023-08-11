import {
    Button,
    Column,
    DatePicker,
    DatePickerInput,
    FileUploaderDropContainer,
    FlexGrid,
    Form,
    FormItem,
    Row,
    Select,
    SelectItem,
    Stack,
    TextArea
} from '@carbon/react';
import axios from 'axios';
import { useEffect, useState } from "react";
import styles from '../../scss/leave/booking.module.scss';

const Booking = ({ leaveType }) => {
    const [leaveid, setLeaveid] = useState('');
    const [reason, setReason] = useState('');
    const [startdate, setStartdate] = useState(new Date().toLocaleString());
    const [enddate, setEnddate] = useState(new Date().toLocaleString());

    const dateFormat = date => {

        return (
            date.getUTCFullYear().toString() + '-' + (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + date.getUTCDate().toString().padStart(2, '0')
        )
    }

    useEffect(() => {
        console.log(startdate)
        console.log(enddate)
    }, [startdate, enddate])

    const POSTaddLeave = () => {

        console.log('body', {
            employeeid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
            leaveid: leaveid,
            reason: reason,
            startdate: dateFormat(new Date(startdate)),
            enddate: dateFormat(new Date(enddate))
        })

        axios.post('http://localhost:3000/api/leave/addLeave', {
            employeeid: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
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
                            <Row style={{ marginBottom: '2rem' }}>
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
                            </Row>
                            <Row style={{ marginBottom: '2rem' }}>
                                <label htmlFor='start-date'>Start date:</label>
                                <input
                                    type='date'
                                    id='start-date'
                                    name='start-date'
                                    placeholder='Start date'
                                    onChange={(e) => setStartdate(e.target.value)}
                                    style={{ marginRight: '3rem' }}
                                />
                                <label htmlFor='end-date'>End date:</label>
                                <input
                                    type='date'
                                    id='end-date'
                                    name='end-date'
                                    placeholder='End date'
                                    onChange={(e) => setEnddate(e.target.value)}
                                />
                            </Row>
                            <Row style={{ marginBottom: '2rem' }}>
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
                                        onChange={(e) => {
                                            console.log(e)
                                            setStartdate(e.target.value)
                                        }}
                                    />
                                    <DatePickerInput
                                        id={`date-picker-input-id-End`}
                                        labelText={`End date`}
                                        placeholder="dd/mm/yyyy"
                                        size="md"
                                        onChange={(e) => setEnddate(e.target.value)}
                                    />
                                </DatePicker>
                            </Row>
                            <Row style={{ marginBottom: '2rem' }}>
                                <Column className={styles.stack}>
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
            </Row>
        </FlexGrid >
    )
}

export default Booking;