import React from 'react';
import styles from '../../scss/manage/manage-employee.module.scss';
import {
    Form,
    Select,
    SelectItem,
    TextInput,
    Button,
    Stack,
    Accordion,
    AccordionItem,
} from '@carbon/react';

const NewEmployee = () => {

    const sectionTitle = title => <p>{title}</p>

    return (
        <Form className={styles['manage-employee']}>
            <Accordion className={styles.Accordion}>
                <AccordionItem open title={sectionTitle('Work information')} className={styles.AccordionItem + ' ' + styles.topItem}>
                    <div className={styles.work}>
                        <Select
                            inline
                            labelText="Role"
                            defaultValue="placeholder-item"
                            id="select-1"
                            // inline
                            size="md"
                        >
                            <SelectItem
                                disabled
                                hidden
                                text=""
                                value="placeholder-item"
                            />
                            <SelectItem
                                text="Employee"
                                value="employeeid"
                            />
                            <SelectItem
                                text="Manager"
                                value="managerid"
                            />
                            <SelectItem
                                text="HR Employee"
                                value="hrmanagerid"
                            />
                            <SelectItem
                                text="Admin"
                                value="adminid"
                            />
                        </Select>
                        <Select
                            inline
                            labelText="Department"
                            defaultValue="placeholder-item"
                            id="select-1"
                            // inline
                            size="md"
                        >
                            <SelectItem
                                disabled
                                hidden
                                text=""
                                value="placeholder-item"
                            />
                            <SelectItem
                                text="HR"
                                value="employeeid"
                            />
                            <SelectItem
                                text="IT"
                                value="managerid"
                            />
                            <SelectItem
                                text="SL"
                                value="hrmanagerid"
                            />
                        </Select>
                        <Select
                            inline
                            labelText="Position"
                            defaultValue="placeholder-item"
                            id="select-1"
                            // inline
                            size="md"
                        >
                            <SelectItem
                                disabled
                                hidden
                                text=""
                                value="placeholder-item"
                            />
                            <SelectItem
                                text="position1"
                                value="position1"
                            />
                            <SelectItem
                                text="position2"
                                value="position2"
                            />
                            <SelectItem
                                text="position3"
                                value="position3"
                            />
                        </Select>
                    </div>
                </AccordionItem>
                <AccordionItem open title={sectionTitle('Employee information')} className={styles.AccordionItem}>
                    <Stack gap='32px'>
                        <TextInput type='text' labelText="Citizen ID" />
                        <div className={styles.name}>
                            <TextInput type='text' labelText="First Name" />
                            <TextInput type='text' labelText="Last Name" />
                            <Select
                                labelText="Physical gender"
                                defaultValue="placeholder-item"
                                id="select-1"
                                // inline
                                size="md"
                            >
                                <SelectItem
                                    disabled
                                    hidden
                                    text=""
                                    value="placeholder-item"
                                />
                                <SelectItem
                                    text="Male"
                                    value="M"
                                />
                                <SelectItem
                                    text="Female"
                                    value="F"
                                />
                            </Select>
                        </div>
                        <TextInput type='email' labelText="Email" />
                    </Stack>
                </AccordionItem>
                <AccordionItem open title={sectionTitle('Bank information')} className={styles.AccordionItem}>
                    <div className={styles.bank}>
                        <TextInput type='text' labelText='Bank name' />
                        <TextInput type='text' labelText='Bank account number' />
                    </div>
                </AccordionItem>
            </Accordion>
            <div open className={styles.buttonGroup}>
                <Button className={styles.button} type='reset' size='lg' kind="danger">Clear</Button>
                <Button className={styles.button} type='reset' size='lg' >Add</Button>
            </div>
        </Form>
    )
}

export default NewEmployee;