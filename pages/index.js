import React, { useState, useEffect, useCallback } from "react";
import {
    Button,
    Form,
    TextInput,
    Dropdown,
    InlineNotification,
    FlexGrid,
    Row,
    Column,
    Link,
    Theme,
    InlineLoading
} from '@carbon/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import checkToken from '../lib/checkToken';
import { ArrowRight } from '@carbon/react/icons';
import styles from '../scss/login.module.scss';

export default () => {

    // const navigate = useNavigate();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrong, setWrong] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => sessionStorage.removeItem('token'), [])

    const onClickLogin = async () => {

        setLoading(true);

        let result = await axios.post('http://localhost:3000/api/login', {
            email: email,
            password: password
        })

        console.log(result)

        if (result.data == 'Email not found') {
            setError('Email not found')
            setLoading(false);
        } else if (result.data == 'Wrong password') {
            setError('Wrong password')
            setLoading(false);
        } else {
            setError('')
            sessionStorage.setItem('token', result.data.token)
            sessionStorage.setItem('employeeid', result.data.employeeid)
            sessionStorage.setItem('name', result.data.firstname + ' ' + result.data.lastname)
            sessionStorage.setItem('email', result.data.email)
            sessionStorage.setItem('roleid', result.data.roleid)
            console.table(result.data)
            router.push('/dashboard')
            
            if (router.asPath === '/dashboard') {
                setLoading(false);
            }
        }
    }

    const forgot = label => {

        return (
            <div className="forgot">
                <div className="label">{label}</div>
                <Link className='link' to={`/`}>Forgot {label}?</Link>
            </div>
        );
    }

    return (
        <Theme theme={'g100'}>
            <FlexGrid fullWidth={true} className={styles.login}>
                <Row className={styles.wrap}>
                    <Column max={5} xlg={7} lg={8} md={5} sm={4}>
                        <Row className={styles['header-wrapper']}>
                            <img src='https://cloud.ibm.com/login/static/img/IBM_Cloud_White_Rev_RGB.png' alt="logo" />
                            <div className={styles.title}>Log in
                                <span>{' to '}<span className="span">Human Resources</span></span>
                            </div>
                            <div className={styles.help}>Need help?
                                <Link className={styles.link} to='/' >Contact admin</Link>
                            </div>
                        </Row>
                        <Form className={styles.form}>
                            <Row condensed>
                                {
                                    (error) &&
                                    <Column max={16} xlg={16} lg={16} md={8} sm={4} className={styles.notification}>
                                        <InlineNotification
                                            // lowContrast
                                            kind="error"
                                            role='alert'
                                            title={error}
                                            subtitle="Try again." />
                                    </Column>
                                }
                                <Column max={16} xlg={16} lg={16} md={8} sm={4} className={styles.container}>
                                    <TextInput
                                        className={styles['text-input']}
                                        id='email'
                                        size='lg'
                                        // invalidText='Invalid Email'
                                        labelText='Email'
                                        // labelText={forgot('Email')}
                                        placeholder="username@angel.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ marginBottom: '1rem' }}
                                    />
                                </Column>
                                <TextInput.PasswordInput
                                    id='password'
                                    invalidText='Invalid password'
                                    labelText='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Column max={16} xlg={16} lg={16} md={8} sm={4}>
                                    <Button
                                        className={styles.button}
                                        renderIcon={!loading ? ArrowRight : null}
                                        kind="primary"
                                        tabIndex={0}
                                        onClick={onClickLogin}
                                        style={{ marginTop: '1rem' }}
                                    >
                                        {loading ?
                                            <InlineLoading
                                                status="active"
                                                iconDescription="Active loading indicator"
                                                description="Loading..."
                                            /> : 'Continue'
                                        }
                                    </Button>
                                </Column>
                                <Link className={styles['forgot-id']} to='/'>Forgot something?</Link>
                            </Row>
                        </Form>
                    </Column>
                </Row >
            </FlexGrid >
        </Theme>
    );
}