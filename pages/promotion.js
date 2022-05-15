import React, { useState, useEffect } from 'react';
import styles1 from '../scss/manage/manage.module.scss';
import {
    FlexGrid,
    Row,
    Column,
    Form,
    Select,
    SelectItem,
    Button,
    Accordion,
    AccordionItem,
    SelectableTile,
    RadioTile,
    NumberInput,
} from '@carbon/react';
import axios from 'axios';
import styles from '../scss/manage/manage-employee.module.scss';

const Manage = ({ getDepartment }) => {

    const [getPosition, setGetPosition] = useState([]);
    const [getEmployee, setGetEmployee] = useState([]);

    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [employeeid, setEmployeeID] = useState('');
    const [employee, setEmployee] = useState([]);
    const [openEmployeeInfo, setOpenEmployeeInfo] = useState(false);
    const [promotePosition, setPromotePosition] = useState(false);
    const [promoteSalary, setPromoteSalary] = useState(false);
    const [newPosition, setNewPosition] = useState(0);
    const [newSalary, setNewSalary] = useState(-1);

    useEffect(() => setOpenEmployeeInfo(department && position), [department, position]);
    useEffect(() => setPromotePosition(newPosition !== ''), [newPosition]);
    useEffect(() => setPromoteSalary(newSalary != -1), [newSalary]);
    useEffect(() => {

        let arr = getEmployee.filter(e => e.employeeID === employeeid)
        // console.log(arr)
        setEmployee(arr[0])

    }, [employeeid]);

    useEffect(() => {

        axios.get(`http://localhost:3000/api/profile/getPosition`, {
            headers: {
                departmentid: department
            }
        }).then(response => {
            // console.log(response.data)
            setGetPosition(response.data)
        });

    }, [department])

    useEffect(() => {

        // console.log(position)

        axios.get(`http://localhost:3000/api/profile/getEmployeeByPosition`, {
            headers: {
                positionid: position
            }
        }).then(response => {
            // console.log(response.data)
            setGetEmployee(response.data)
        });

    }, [position])

    const sectionTitle = title => <p>{title}</p>

    const defaultFormState = () => {
        setDepartment('')
        setPosition('')
        setEmployeeID('')
        setNewPosition('')
        setNewSalary(-1)
    }

    const POSTpromotion = () => {

        console.log('body', {
            employeeid: employeeid,
            positionid: newPosition,
            salary: newSalary
        })


        if (promotePosition === true && promoteSalary !== true) {
            axios.post(`http://localhost:3000/api/manager/promotionPosition`, {
                employeeid: employeeid,
                positionid: newPosition
            })
        }
        if (promotePosition !== true && promoteSalary === true) {
            axios.post(`http://localhost:3000/api/manager/promotionSalary`, {
                employeeid: employeeid,
                salary: newSalary
            })
        }

        defaultFormState()
    }

    return (
        <FlexGrid fullWidth className={styles1.manage}>
            <Row>
                <Column max={6} xlg={6} lg={6} md={0} sm={0} className={styles1.bg} />
                <Column max={10} xlg={10} lg={10} md={8} sm={4} className={styles1.mainCol}>
                    <Form className={styles['manage-employee']}>
                        <h1>Promotion</h1>
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
                                    onChange={(e) => setEmployeeID(e.target.value)}
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
                                                        text={`${e.firstName} ${e.lastName}`}
                                                        value={e.employeeID}
                                                    />
                                                )
                                            }) : <SelectItem text="No employee" />
                                    }
                                </Select>
                            </AccordionItem>
                            <AccordionItem
                                disabled={!employeeid}
                                open={employeeid}
                                title={sectionTitle('Promote')}
                                className={styles.AccordionItem}
                            >
                                <SelectableTile
                                    selected={promotePosition}
                                    id='position'
                                    name='Position'
                                    disabled={!employeeid}
                                >
                                    <Select
                                        inline
                                        labelText="Position"
                                        defaultValue="placeholder-item"
                                        id="select-1"
                                        size="md"
                                        disabled={!employeeid}
                                        onChange={(e) => {
                                            setNewPosition(e.target.value)
                                            setPromotePosition(true)
                                            setPromoteSalary(false)
                                        }}
                                    >
                                        <SelectItem
                                            disabled
                                            hidden
                                            text=""
                                            value="placeholder-item"
                                        />
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
                                </SelectableTile>
                                <SelectableTile
                                    id='salary'
                                    name='Salary'
                                    selected={promoteSalary}
                                    disabled={!employeeid}
                                >
                                    <NumberInput
                                        onChange={(e) => {
                                            setNewSalary(e.target.value)
                                            setPromoteSalary(true)
                                            setPromotePosition(false)
                                        }}
                                        id='salary'
                                        min={1}
                                        value={employee ? employee.salary : 0}
                                        disabled={!employeeid}
                                        labelText="Salary"
                                    />
                                </SelectableTile>
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
                            <Button className={styles.button} size='lg' onClick={POSTpromotion}>Promote</Button>
                        </div>
                    </Form>
                </Column>
            </Row>
        </FlexGrid>
    )
}

export default Manage;

export const getStaticProps = async () => {

    const res = await axios.get('http://localhost:3000/api/profile/getDepartment');
    const getDepartment = await res.data;

    return {
        props: {
            getDepartment: getDepartment,
        },
    }

}