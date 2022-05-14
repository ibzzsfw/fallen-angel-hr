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

const Profile = () => {

    const [modalPersonal, setModalPersonal] = useState(false);
    const [modalContact, setModalContact] = useState(false);
    const [modalBank, setModalBank] = useState(false);
    const [modalPassword, setModalPassword] = useState(false);

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
                }}>
                <p>Be aware your information correctness</p>
                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='firstName'
                    placeholder={'current'}
                    labelText='First name'
                    styles={{ marginBottom: '1rem' }}
                />
                <TextInput
                    size='lg'
                    id='lastname'
                    placeholder={'current'}
                    labelText='Lastname name'
                    styles={{ marginBottom: '1rem' }}
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
                }}>
                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='email'
                    type='email'
                    placeholder={'current'}
                    labelText='Email'
                    styles={{ marginBottom: '1rem' }}
                />
                <TextInput
                    size='lg'
                    id='phone'
                    placeholder={'current'}
                    labelText='Phone'
                    styles={{ marginBottom: '1rem' }}
                />
                <TextInput
                    size='lg'
                    id='address'
                    placeholder={'current'}
                    labelText='Address'
                    styles={{ marginBottom: '1rem' }}
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
                }}>
                <TextInput
                    data-modal-primary-focus
                    size='lg'
                    id='bankname'
                    placeholder={'current'}
                    labelText='Bank name'
                    styles={{ marginBottom: '1rem' }}
                />
                <TextInput
                    size='lg'
                    id='bankNo'
                    placeholder={'current'}
                    labelText='Bank account number'
                    styles={{ marginBottom: '1rem' }}
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
