import React from "react";
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

const Booking = () => {

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
                                <p className="cds--file--label" style={{marginBottom: '1rem'}}>Leave datails</p>
                            </Row>
                            <Row>
                                <Column max={10} xlg={10} lg={10} md={4} sm={4} style={{ marginBottom: '32px' }}>
                                    <Select
                                        id='leave-type'
                                        defaultValue="placeholder-item"
                                        labelText="Leave type"
                                    >
                                        <SelectItem
                                            disabled
                                            hidden
                                            value="placeholder-item"
                                            text=""
                                        />
                                        {[1, 2, 3, 4].map(i => <SelectItem value={`option-${i}`} text={`option-${i}`} />)}
                                    </Select>
                                </Column>
                                <Column max={6} xlg={6} lg={6} md={4} sm={4} style={{ marginBottom: '32px', padding: '0' }}>
                                    <DatePicker
                                        className={styles['date-picker']}
                                        datePickerType='range'
                                        locale='en'
                                        dateFormat='d/m/Y'
                                    >
                                        {
                                            ['Start', 'End'].map(label => {
                                                return (
                                                    <DatePickerInput
                                                        id={`date-picker-input-id-${label}`}
                                                        labelText={`${label} date`}
                                                        placeholder="dd/mm/yyyy"
                                                        size="md"
                                                    />
                                                )
                                            })
                                        }
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
                                    <Button className={styles.button} type='submit' size='lg' kind="primary">Submit</Button>
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