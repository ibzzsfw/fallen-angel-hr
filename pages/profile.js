import React, { useRef, useState } from "react";
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


const Profile = ({getProfile, getDepartment}) => {

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

    const editPersonalInfo = () => {
        axios.post('http://localhost:3000/api/profile/editPersonalInfo', {
            firstname: newFirstName ,
            lastname: newLastName 
        })
    }

    const editContact = () => {
        if (getProfile)
        {axios.post('http://localhost:3000/api/profile/editContact', {
            email: newEmail ? newEmail : getProfile.email,
            phonenumber: newPhoneNumber? newPhoneNumber : getProfile.phonenumber,
            address: newAddress ? newAddress : getProfile.address,
        })}
    }

    const editBankInfo = () => {
        axios.put('http://localhost:3000/api/profile/editBankInfo',{
            bankname: newBankName ? newBankName : getProfile.bankname,
            bankaccount: newBankAccountNumber ? newBankAccountNumber : getProfile.bankaccount
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
                                            { key: 'Name', value: 'John Doe' },
                                            { key: 'Identification No.', value: '1110100111293' },
                                            { key: 'Date of birth', value: '01/01/1990' },
                                            { key: 'Physical gender', value: 'Male' }
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
                                            { key: 'Role', value: 'Employee' },
                                            { key: 'Employee ID', value: '0e38af30-7a6a-4201-9584-42264f2684fc' }
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
                                            { key: 'Email', value: 'example@angel.com' },
                                            { key: 'Phone', value: '(+66)954205601' },
                                            { key: 'Address', value: '123/123, Bangkok, Thailand' }
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
                                            { key: 'Bank name', value: 'Kasikornbank' },
                                            { key: 'Bank account number', value: '123456789012345678' }
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
                onRequestSubmit = {editPersonalInfo}
                >
                <p>Be aware your information correctness</p>
                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='firstName'
                    placeholder={'current'}
                    labelText='First name'
                    styles={{ marginBottom: '1rem' }}
                    onChange = {e => setNewFirstName(e.target.value)}
                />
                <TextInput
                    size='lg'
                    id='lastname'
                    placeholder={'current'}
                    labelText='Lastname name'
                    styles={{ marginBottom: '1rem' }}
                    onChange = {e => setNewLastName(e.target.value)}
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
                onRequestSubmit = {editContact}
                >

                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='email'
                    type='email'
                    placeholder={'current'}
                    labelText='Email'
                    styles={{ marginBottom: '1rem' }}
                    onChange = {e=>setNewEmail(e.target.value)}
                />
                <TextInput
                    size='lg'
                    id='phone'
                    placeholder={'current'}
                    labelText='Phone'
                    styles={{ marginBottom: '1rem' }}
                    onChange = {e=>setNewPhoneNumber(e.target.value)}
                />
                <TextInput
                    size='lg'
                    id='address'
                    placeholder={'current'}
                    labelText='Address'
                    styles={{ marginBottom: '1rem' }}
                    onChange = {e=>setNewAddress(e.target.value)}
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
                onRequestSubmit = {editBankInfo}
                >
                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='bankname'
                    placeholder={'current'}
                    labelText='Bank name'
                    styles={{ marginBottom: '1rem' }}
                    onChange = {e => setNewBankName}
                />
                <TextInput
                    size='lg'
                    id='bankNo'
                    placeholder={'current'}
                    labelText='Bank account number'
                    styles={{ marginBottom: '1rem' }}
                    onChange = {e => setNewBankAccountNumber}
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

// photo
// personal
// work
// contact and address
// education
//bank
// password


export const getStaticProps = async () => {
       
   const res = await axios.get('http://localhost:3000/api/profile/showProfile',
                 {headers: {employeeid: '0e38af30-7a6a-4201-9584-42264f2684fc'}});
     const getProfile = await res.data;
    // const res1 = await axios.put('http://localhost:3000/api/profile/editPersonalInfo')
    // const editPersonalInfo = await res1.data;
    
    // const res2 = await axios.put('http://localhost:3000/api/profile/editContact',
    //             {body: {employeeid: '0e38af30-7a6a-4201-9584-42264f2684fc'}});
    // const editContact = await res2.data;
 

    // const res3 = await axios.put('http://localhost:3000/api/profile/editBankInfo',
    //             {body: {employeeid: '0e38af30-7a6a-4201-9584-42264f2684fc'}});
    // const editBankInfo = await res3.data;

    const res4 = await axios.get('http://localhost:3000/api/profile/getDepartment')
    const getDepartment = await res4.data;

    return {
        props: {
            getProfile: getProfile,
            getDepartment: getDepartment,
        },
    }
}