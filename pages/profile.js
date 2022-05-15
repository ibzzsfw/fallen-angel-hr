import React, { useRef, useState, useEffect } from "react";
import {
    FlexGrid,
    Row,
    Column,
    Tile,
    Button,
    Stack,
    PasswordInput,
    CodeSnippet,
    Modal,
    TextInput,
} from "@carbon/react";
import { Edit } from '@carbon/react/icons';
import styles from "../scss/profile.module.scss";
import axios from 'axios';


const Profile = ({ getProfile, getRole }) => {

    console.log(getRole)

    const [modalPersonal, setModalPersonal] = useState(false);
    const [modalContact, setModalContact] = useState(false);
    const [modalBank, setModalBank] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);

    //Contact Modal
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    const [newEmail, setNewEmail] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newAddress, setNewAddress] = useState('');

    const [newBankName, setNewBankName] = useState('');
    const [newBankAccountNumber, setNewBankAccountNumber] = useState('');

    const [roleName, setRoleName] = useState('');

    useEffect(() => {

        let roleName = getRole.filter(role => role.roleID === getProfile.roleID)[0]
        setRoleName(roleName.roleName)

    }, [getProfile])

    const editPersonalInfo = () => {
        axios.post('http://localhost:3000/api/profile/editPersonalInfo', {
            employeeid: getProfile.employeeID,
            firstname: newFirstName ? newFirstName : getProfile.firstName,
            lastname: newLastName ? newLastName : getProfile.lastName,
        }).then(res => {
            console.log(res)
        })
    }

    const editContact = () => {
        axios.post('http://localhost:3000/api/profile/editContact', {
            employeeid: getProfile.employeeID,
            email: newEmail ? newEmail : getProfile.email,
            phonenumber: newPhoneNumber ? newPhoneNumber : getProfile.phoneNumber,
            address: newAddress ? newAddress : getProfile.address,
        }).then(res => {
            console.log(res)
        })
    }

    const editBankInfo = () => {
        axios.post('http://localhost:3000/api/profile/editBankInfo', {
            employeeid: getProfile.employeeID,
            bankname: newBankName ? newBankName : getProfile.bankName,
            bankaccount: newBankAccountNumber ? newBankAccountNumber : getProfile.bankAccountNumber,
        }).then(res => {
            console.log(res)
        })
    }

    const renderValue = item => {

        if (item.key === 'Employee ID') {
            return (
                <CodeSnippet type='inline' feedback="Copied to clipboard">
                    {item.value}
                </CodeSnippet>
            )
        }
        if (item.key === 'Password') {
            return (
                <PasswordInput
                    readOnly
                    defaultValue={item.value}
                    hidePasswordLabel="Hide password"
                    showPasswordLabel="Show password"
                />
            )
        }

        return <div className={styles.value}>{item.value}</div>
    }

    return (
        <FlexGrid className={styles.profile}>
            <Row>
                <Column max={4} className={styles.picContainer}>
                    <img
                        src="/profile.jpeg"
                        className={styles.Image}
                    />
                </Column>
                <Column max={{ span: 11, offset: 1 }}>
                    <Stack gap='32px' className={styles.stack}>
                        <div className={styles.category}>
                            <Tile className={styles.topic}>
                                <div className={styles.header}>
                                    <div>Personal information</div>
                                    <Button
                                        kind='ghost'
                                        size='sm'
                                        renderIcon={Edit}
                                        onClick={() => setModalPersonal(true)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </Tile>
                            <Tile>
                                <Stack gap='24px' className={styles.content}>
                                    {
                                        [
                                            { key: 'Name', value: `${getProfile.firstName} ${getProfile.lastName}` },
                                            { key: 'Identification No.', value: getProfile.identificationNo },
                                            { key: 'Date of birth', value: new Date(getProfile.dob).toLocaleDateString() },
                                            { key: 'Physical gender', value: getProfile.sex === 'M' ? 'Male' : 'Female' }
                                        ].map((item, index) => {

                                            return (
                                                <div className={styles.wraper} key={index}>
                                                    <div className={styles.title}>{item.key}</div>
                                                    {renderValue(item)}
                                                </div>
                                            )
                                        })
                                    }
                                </Stack>
                            </Tile>
                        </div>
                        <div className={styles.category}>
                            <Tile className={styles.topic}>
                                <div className={styles.header}>
                                    <div>Work information</div>
                                </div>
                            </Tile>
                            <Tile>
                                <Stack gap='24px' className={styles.content}>
                                    {
                                        [
                                            { key: 'Role', value: roleName },
                                            { key: 'Employee ID', value: getProfile.employeeID }
                                        ].map((item, index) => {

                                            return (
                                                <div className={styles.wraper} key={index}>
                                                    <div className={styles.title}>{item.key}</div>
                                                    {renderValue(item)}
                                                </div>
                                            )
                                        })
                                    }
                                </Stack>
                            </Tile>
                        </div>
                        <div className={styles.category}>
                            <Tile className={styles.topic}>
                                <div className={styles.header}>
                                    <div>Contact and address</div>
                                    <Button
                                        kind='ghost'
                                        size='sm'
                                        renderIcon={Edit}
                                        onClick={() => setModalContact(true)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </Tile>
                            <Tile>
                                <Stack gap='24px' className={styles.content}>
                                    {
                                        [
                                            { key: 'Email', value: getProfile.email },
                                            { key: 'Phone', value: getProfile.phoneNumber },
                                            { key: 'Address', value: getProfile.address }
                                        ].map((item, index) => {

                                            return (
                                                <div className={styles.wraper} key={index}>
                                                    <div className={styles.title}>{item.key}</div>
                                                    {renderValue(item)}
                                                </div>
                                            )
                                        })
                                    }
                                </Stack>
                            </Tile>
                        </div>
                        <div className={styles.category}>
                            <Tile className={styles.topic}>
                                <div className={styles.header}>
                                    <div>Bank information</div>
                                    <Button
                                        kind='ghost'
                                        size='sm'
                                        renderIcon={Edit}
                                        onClick={() => setModalBank(true)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </Tile>
                            <Tile>
                                <Stack gap='24px' className={styles.content}>
                                    {
                                        [
                                            { key: 'Bank name', value: getProfile.bankName },
                                            { key: 'Bank account number', value: getProfile.bankAccount }
                                        ].map((item, index) => {

                                            return (
                                                <div className={styles.wraper} key={index}>
                                                    <div className={styles.title}>{item.key}</div>
                                                    {renderValue(item)}
                                                </div>
                                            )
                                        })
                                    }
                                </Stack>
                            </Tile>
                        </div>
                        <div className={styles.category}>
                            <Tile className={styles.topic}>
                                <div className={styles.header}>
                                    <div>Password</div>
                                    <Button
                                        isExpressive
                                        kind='danger'
                                        size='lg'
                                        renderIcon={Edit}
                                        onClick={() => setModalPassword(true)}
                                    >
                                        Edit password
                                    </Button>
                                </div>
                            </Tile>
                        </div>
                    </Stack>
                </Column>
            </Row>
            <Modal
                open={modalPersonal}
                modalHeading="Personal information"
                modalLabel="Account resources"
                primaryButtonText="Save"
                secondaryButtonText="Cancel"
                onRequestClose={() => {
                    setModalPersonal(false);
                }}
                onRequestSubmit={editPersonalInfo}
            >
                <p>Be aware your information correctness</p>
                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='firstName'
                    placeholder={getProfile.firstName}
                    labelText='First name'
                    styles={{ marginBottom: '1rem' }}
                    onChange={e => setNewFirstName(e.target.value)}
                />
                <TextInput
                    size='lg'
                    id='lastname'
                    placeholder={getProfile.lastName}
                    labelText='Lastname name'
                    styles={{ marginBottom: '1rem' }}
                    onChange={e => setNewLastName(e.target.value)}
                />
            </Modal>
            <Modal
                open={modalContact}
                modalHeading="Contact and address"
                modalLabel="Account resources"
                primaryButtonText="Save"
                secondaryButtonText="Cancel"
                onRequestClose={() => {
                    setModalContact(false);
                }}
                onRequestSubmit={editContact}
            >

                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='email'
                    type='email'
                    placeholder={getProfile.email}
                    labelText='Email'
                    styles={{ marginBottom: '1rem' }}
                    onChange={e => setNewEmail(e.target.value)}
                />
                <TextInput
                    size='lg'
                    id='phone'
                    placeholder={getProfile.phoneNumber}
                    labelText='Phone'
                    styles={{ marginBottom: '1rem' }}
                    onChange={e => setNewPhoneNumber(e.target.value)}
                />
                <TextInput
                    size='lg'
                    id='address'
                    placeholder={getProfile.address}
                    labelText='Address'
                    styles={{ marginBottom: '1rem' }}
                    onChange={e => setNewAddress(e.target.value)}
                />
            </Modal>
            <Modal
                open={modalBank}
                modalHeading="Contact and address"
                modalLabel="Account resources"
                primaryButtonText="Save"
                secondaryButtonText="Cancel"
                onRequestClose={() => {
                    setModalBank(false);
                }}
                onRequestSubmit={editBankInfo}
            >
                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='bankname'
                    placeholder={getProfile.bankName}
                    labelText='Bank name'
                    styles={{ marginBottom: '1rem' }}
                    onChange={e => setNewBankName(e.target.value)}
                />
                <TextInput
                    size='lg'
                    id='bankNo'
                    placeholder={getProfile.bankAccount}
                    labelText='Bank account number'
                    styles={{ marginBottom: '1rem' }}
                    onChange={e => setNewBankAccountNumber(e.target.value)}
                />
            </Modal>
            <Modal
                open={modalPassword}
                modalHeading="Edit password"
                modalLabel="Account resources"
                primaryButtonText="Save"
                secondaryButtonText="Cancel"
                onRequestClose={() => {
                    setModalPassword(false);
                }}>
                <PasswordInput
                    data-modal-primary-focus
                    size='lg'
                    id='password'
                    placeholder={'current'}
                    labelText='Password'
                    styles={{ marginBottom: '1rem' }}
                />
            </Modal>
        </FlexGrid>
    );
}


export default Profile;

export const getStaticProps = async () => {

    const res = await axios.get('http://localhost:3000/api/profile/getProfile', {
        headers: {
            employeeid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        }
    })
    const getProfile = await res.data;

    const res1 = await axios.get('http://localhost:3000/api/admin/getRole')
    const getRole = await res1.data;

    return {
        props: {
            getProfile: getProfile[0],
            getRole: getRole
        },
    }
}