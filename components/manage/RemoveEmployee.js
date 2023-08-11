import {
    Accordion,
    AccordionItem,
    Button,
    Form,
    Select,
    SelectItem,
} from '@carbon/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../../scss/manage/manage-employee.module.scss';

const RemoveEmployee = ({ getDepartment }) => {

    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [employee, setEmployee] = useState('');
    const [openEmployeeInfo, setOpenEmployeeInfo] = useState(false);

    const [getPosition, setGetPosition] = useState([]);
    const [getEmployee, setGetEmployee] = useState([]);

    useEffect(() => setOpenEmployeeInfo(department && position), [department, position]);

    const sectionTitle = title => <p>{title}</p>

    useEffect(() => {

        axios.get(`http://localhost:3000/api/profile/getPosition`, {
            headers: {
                departmentid: department
            }
        }).then(response => {
            setGetPosition(response.data)
        });

    }, [department])

    useEffect(() => {

        console.log(position)

        axios.get(`http://localhost:3000/api/profile/getEmployeeByPosition`, {
            headers: {
                positionid: position
            }
        }).then(response => {
            console.log(response.data)
            setGetEmployee(response.data)
        });

    }, [position])

    const defaultFormState = () => {
        setDepartment('')
        setPosition('')
        setEmployee('')
    }

    const POSTremove = () => {

        if (employee) {
            axios.post(`http://localhost:3000/api/manager/removeEmployee`, {
                employeeid: employee
            }).then(response => {
                console.log(response.data)
                defaultFormState()
            });
        }
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
                            {
                                getDepartment &&
                                getDepartment.map(e => {
                                    return (
                                        <SelectItem
                                            //disabled
                                            //hidden
                                            text={e.departmentName}
                                            key={e.departmentID}
                                            value={e.departmentID}
                                        />
                                    )
                                })
                            }
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
                            {
                                getPosition &&
                                getPosition.map(e => {
                                    return (
                                        <SelectItem
                                            //disabled
                                            //hidden
                                            text={e.positionName}
                                            key={e.positionID}
                                            value={e.positionID}
                                        />
                                    )
                                })
                            }
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
                            getEmployee.length > 0 ?
                                getEmployee.map(e => {
                                    return (
                                        <SelectItem
                                            key={e.employeeID}
                                            text={`${e.firstName} ${e.lastName}`}
                                            value={e.employeeID}
                                        />
                                    )
                                }) : <SelectItem text="No employee" />
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
                <Button className={styles.button} size='lg' onClick={POSTremove}>Remove</Button>
            </div>
        </Form>
    )
}

export default RemoveEmployee;