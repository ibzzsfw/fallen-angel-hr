import {
    Accordion,
    AccordionItem,
    Button,
    Form,
    Select,
    SelectItem,
    Stack,
    TextInput,
} from '@carbon/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../../scss/manage/manage-employee.module.scss';

const NewEmployee = ({ getRole, getDepartment }) => {
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedSex, setSelectedSex] = useState('');
    const [salary, setSalary] = useState(0);
    const [identification, setIdentification] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [bankname, setBankname] = useState('');
    const [bankaccount, setBankaccount] = useState('');
    const [getPosition, setGetPosition] = useState([]);

    useEffect(() => {

        if (selectedPosition) {
            getPosition.map(position => {
                if (position.positionID === selectedPosition) {
                    setSalary(position.salary);
                }
            })
        }
    }, [selectedPosition]);

    useEffect(() => {

        console.log(selectedDepartment)

        if (selectedDepartment) {
            axios.get('http://localhost:3000/api/profile/getPosition', {
                headers: {
                    departmentid: selectedDepartment,
                }
            }).then(res => {
                console.log('position', res.data);
                setGetPosition(res.data);
            })
        }
    }, [selectedDepartment])

    const POSTnewEmployee = () => axios.post('http://localhost:3000/api/admin/addEmployee', {
        roleid: selectedRole,
        positionid: selectedPosition,
        identification: identification,
        firstname: firstname,
        lastname: lastname,
        sex: selectedSex,
        email: email,
        bankname: bankname,
        bankaccount: bankaccount,
        salary: salary,
        password: 'test'
    })

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
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <SelectItem
                                disabled
                                hidden
                                text=""
                                value="placeholder-item"
                            />
                            {
                                getRole &&
                                getRole.map(role => {
                                    return (
                                        <SelectItem
                                            key={role.roleID}
                                            text={role.roleName}
                                            value={role.roleID}
                                        />
                                    )
                                })
                            }
                        </Select>
                        <Select
                            inline
                            labelText="Department"
                            defaultValue="placeholder-item"
                            id="select-1"
                            // inline
                            size="md"
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                        >
                            <SelectItem
                                disabled
                                hidden
                                text=""
                                value="placeholder-item"
                            />
                            {
                                getDepartment &&
                                getDepartment.map(department => {
                                    return (
                                        <SelectItem
                                            key={department.departmentID}
                                            text={department.departmentName}
                                            value={department.departmentID}
                                        />
                                    )
                                })
                            }
                        </Select>
                        <Select
                            inline
                            labelText="Position"
                            defaultValue="placeholder-item"
                            id="select-1"
                            // inline
                            size="md"
                            onChange={(e) => setSelectedPosition(e.target.value)}
                        >
                            <SelectItem
                                disabled
                                hidden
                                text=""
                                value="placeholder-item"
                            />
                            {
                                getPosition &&
                                getPosition.map(position => {
                                    return (
                                        <SelectItem
                                            key={position.positionID}
                                            text={position.positionName}
                                            value={position.positionID}
                                        />
                                    )
                                })
                            }
                        </Select>
                    </div>
                </AccordionItem>
                <AccordionItem open title={sectionTitle('Employee information')} className={styles.AccordionItem}>
                    <Stack gap='32px'>
                        <TextInput type='text' labelText="Citizen ID" onChange={e => setIdentification(e.target.value)} />
                        <div className={styles.name}>
                            <TextInput type='text' labelText="First Name" onChange={e => setFirstname(e.target.value)} />
                            <TextInput type='text' labelText="Last Name" onChange={e => setLastname(e.target.value)} />
                            <Select
                                labelText="Physical gender"
                                defaultValue="placeholder-item"
                                id="select-1"
                                // inline
                                size="md"
                                onChange={(e) => setSelectedSex(e.target.value)}
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
                        <TextInput type='email' labelText="Email" onChange={(e) => setEmail(e.target.value)} />
                    </Stack>
                </AccordionItem>
                <AccordionItem open title={sectionTitle('Bank information')} className={styles.AccordionItem}>
                    <div className={styles.bank}>
                        <TextInput type='text' labelText='Bank name' onChange={(e) => setBankname(e.target.value)} />
                        <TextInput type='text' labelText='Bank account number' onChange={(e) => setBankaccount(e.target.value)} />
                    </div>
                </AccordionItem>
            </Accordion>
            <div open className={styles.buttonGroup}>
                <Button className={styles.button} type='reset' size='lg' kind="danger">Clear</Button>
                <Button className={styles.button} type='reset' size='lg' onClick={POSTnewEmployee}>Add</Button>
            </div>
        </Form>
    )
}

export default NewEmployee;