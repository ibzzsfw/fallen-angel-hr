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
    NumberInput,
} from '@carbon/react';
import axios from 'axios';
import styles from '../scss/manage/manage-employee.module.scss';

const Manage = ({ getDepartment }) => {

    // console.log(getDepartment)

    const [getPosition, setGetPosition] = useState([]);
    const [getEmployee, setGetEmployee] = useState([]);
    const [temp, setTemp] = useState([]);

    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [employee, setEmployee] = useState('');
    const [openEmployeeInfo, setOpenEmployeeInfo] = useState(false);
    const [promoteRole, setPromoteRole] = useState(false);
    const [promotePosition, setPromotePosition] = useState(false);
    const [promoteSalary, setPromoteSalary] = useState(false);
    const [newRole, setNewRole] = useState('');
    const [newPosition, setNewPosition] = useState('');
    const [newSalary, setNewSalary] = useState(-1);

    useEffect(() => setOpenEmployeeInfo(department && position), [department, position]);
    useEffect(() => setPromoteRole(newRole !== ''), [newRole]);
    useEffect(() => setPromotePosition(newPosition !== ''), [newPosition]);
    useEffect(() => setPromoteSalary(newSalary != -1), [newSalary]);

    useEffect(() => {

        axios.get(`http://localhost:3000/api/profile/getPosition`, {
            headers: {
                departmentid: department
            }
        }).then(response => {
            console.log(response.data)
            setGetPosition(response.data)
        });

    }, [department])

    useEffect(() => {

        axios.get(`http://localhost:3000/api/profile/getEmployee`, {
            headers: {
                positionid: position
            }
        }).then(response => setTemp(response.data));

    }, [position])

    useEffect(() => {

        console.log(temp.map(e => e.employeeID))

        axios.get(`http://localhost:3000/api/profile/getEmployee`, {
            headers: {
                employeeid: (temp.map(e => e.employeeID))
            }
        }).then(response => {
            console.log('tap', response.data)
            setGetEmployee(response.data)
        });

    }, [temp])

    const sectionTitle = title => <p>{title}</p>

    const defaultFormState = () => {
        setDepartment('')
        setPosition('')
        setEmployee('')
        setNewRole('')
        setNewPosition('')
        setNewSalary(-1)
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
                                    onChange={(e) => setEmployee(e.target.value)}
                                >
                                    <SelectItem
                                        disabled
                                        hidden
                                        text=""
                                        value="placeholder-item"
                                    />
                                    {
                                        getEmployee ?
                                            getEmployee.map(e => {
                                                console.log(e)
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
                                disabled={!employee}
                                open={employee}
                                title={sectionTitle('Promote')}
                                className={styles.AccordionItem}
                            >
                                <SelectableTile
                                    id='role'
                                    name='Role'
                                    selected={promoteRole}
                                    disabled={!employee}
                                >
                                    <Select
                                        inline
                                        labelText="Role"
                                        defaultValue="placeholder-item"
                                        id="select-1"
                                        size="md"
                                        disabled={!employee}
                                        onChange={(e) => setNewRole(e.target.value)}
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
                                </SelectableTile>
                                <SelectableTile
                                    selected={promotePosition}
                                    id='position'
                                    name='Position'
                                    disabled={!employee}
                                >
                                    <Select
                                        inline
                                        labelText="Position"
                                        defaultValue="placeholder-item"
                                        id="select-1"
                                        size="md"
                                        disabled={!employee}
                                        onChange={(e) => setNewPosition(e.target.value)}
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
                                </SelectableTile>
                                <SelectableTile
                                    id='salary'
                                    name='Salary'
                                    selected={promoteSalary}
                                    disabled={!employee}
                                >
                                    <NumberInput
                                        onChange={(e) => setNewSalary(e.target.value)}
                                        id='salary'
                                        min={1}
                                        value={51000}
                                        disabled={!employee}
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
                            <Button className={styles.button} type='reset' size='lg' >Promote</Button>
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