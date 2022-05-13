import React, { useState, useEffect } from 'react';
import styles from '../../scss/manage/manage-employee.module.scss';
import {
    Form,
    Select,
    SelectItem,
    Button,
    Accordion,
    AccordionItem,
} from '@carbon/react';

const RemoveEmployee = () => {

    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [employee, setEmployee] = useState('');
    const [openEmployeeInfo, setOpenEmployeeInfo] = useState(false);

    useEffect(() => setOpenEmployeeInfo(department && position), [department, position]);

    const sectionTitle = title => <p>{title}</p>

    const defaultFormState = () => {
        setDepartment('')
        setPosition('')
        setEmployee('')
    }

    return (
        <Form className={styles['manage-employee']}>
            <Accordion className={styles.Accordion}>
                <AccordionItem open title={sectionTitle('Work information')} className={styles.AccordionItem + ' ' + styles.topItem}>
                    <div className={styles.work}>
                        <Select
                            inline
                            labelText="Department"
                            defaultValue="placeholder-item"
                            id="select-1"
                            // inline
                            size="md"
                            onChange={(e) => setDepartment(e.target.value)}
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
                            disabled={!department}
                            inline
                            labelText="Position"
                            defaultValue="placeholder-item"
                            id="select-1"
                            // inline
                            size="md"
                            onChange={(e) => setPosition(e.target.value)}
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
                <AccordionItem
                    disabled={!openEmployeeInfo}
                    open={openEmployeeInfo}
                    title={sectionTitle('Employee information')}
                    className={styles.AccordionItem}
                >
                    <Select
                        labelText="Employee"
                        defaultValue="placeholder-item"
                        id="select-1"
                        // inline
                        size="md"
                        onChange={(e) => setEmployee(e.target.value)}
                    >
                        <SelectItem
                            disabled
                            hidden
                            text=""
                            value="placeholder-item"
                        />
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {

                                return (
                                    <SelectItem
                                        text={`Employee ${i}`}
                                        value={i}
                                    />
                                )
                            })
                        }
                    </Select>
                </AccordionItem>
            </Accordion>
            <div open className={styles.buttonGroup}>
                <Button
                    className={styles.button}
                    type='reset'
                    size='lg'
                    kind="danger"
                    onClick={defaultFormState}
                >
                    Clear
                </Button>
                <Button className={styles.button} type='reset' size='lg' >Remove</Button>
            </div>
        </Form>
    )
}

export default RemoveEmployee;