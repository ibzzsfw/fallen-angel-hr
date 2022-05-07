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
    Theme
} from '@carbon/react';
import { ArrowRight32 } from '@carbon/icons-react';
import styles from '../scss/login.module.scss';

const Login = () => {

    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [items, setItems] = useState([
        {
            id: 'email',
            text: 'Email'
        },
        {
            id: 'employeeid',
            text: 'Employee ID'
        },
    ]);
    const [currentItem, setCurrentItem] = useState(items[0]);

    // useEffect(() => sessionStorage.setItem('login', 'false'), [])

    const onClickLogin = useCallback(() => {

        if (email === "") {
            setIsInvalidEmail(email === "");
            // setIsInvalidPassword(password === "");
        } else {
            // navigate('/profile', { replace: true })
            // sessionStorage.setItem('login', 'true')
        }
    }, [email])

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
                            <Row condensed={true}>
                                {
                                    isInvalidEmail &&
                                    <Column max={16} xlg={16} lg={16} md={8} sm={4} className={styles.notification}>
                                        <InlineNotification
                                            // lowContrast
                                            kind="error"
                                            role='alert'
                                            title="You must enter an ID."
                                            subtitle="Try again." />
                                    </Column>
                                }
                                <Column max={16} xlg={16} lg={16} md={8} sm={4} className={styles.option}>Sign in with</Column>
                                <Column max={5} xlg={5} lg={5} md={3} className={styles.container}>
                                    <Dropdown
                                        className={styles.select}
                                        defaultValue='email'
                                        id='login-select'
                                        items={items}
                                        itemToString={item => item ? item.text : ''}
                                        initialSelectedItem={items[0].id}
                                        label={currentItem.text}
                                        onChange={({ selectedItem }) => setCurrentItem(selectedItem)}
                                        selectedItem={currentItem}
                                    />
                                </Column>
                                <Column max={11} xlg={11} lg={11} md={5} className={styles.container}>
                                    <TextInput
                                        className={styles['text-input']}
                                        id='email'
                                        invalid={isInvalidEmail}
                                        // invalidText='Invalid Email'
                                        // labelText='Email'
                                        // labelText={forgot('Email')}
                                        placeholder="username@angel.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Column>
                                {/* <TextInput.PasswordInput
                            id='password'
                            invalid={isInvalidPassword}
                            invalidText='Invalid password'
                            labelText={forgot('Password')}
                            onChange={(e) => setPassword(e.target.value)}
                        /> */}
                                <Column max={16} xlg={16} lg={16} md={8} sm={4}>
                                    <Button
                                        className={styles.button}
                                        renderIcon={ArrowRight32}
                                        kind="primary"
                                        tabIndex={0}
                                        onClick={onClickLogin}
                                    >Continue</Button>
                                </Column>
                                <Link className={styles['forgot-id']} to='/'>Forgot ID?</Link>
                            </Row>
                        </Form>
                    </Column>
                </Row >
            </FlexGrid >
        </Theme>
    );
}

export default Login;