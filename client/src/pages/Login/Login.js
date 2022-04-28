import React, { useState, useEffect, useCallback } from "react";
import {
    Button,
    Form,
    TextInput,
    Dropdown,
    InlineNotification,
} from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
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

    useEffect(() => sessionStorage.setItem('login', 'false'), [])

    const onClickLogin = useCallback(() => {

        if (email === "") {
            setIsInvalidEmail(email === "");
            // setIsInvalidPassword(password === "");
        } else {
            navigate('/profile', { replace: true })
            sessionStorage.setItem('login', 'true')
        }
    }, [email, navigate])

    const forgot = label => {

        return (
            <div className="forgot">
                <div className="label">{label}</div>
                <Link className='link' to={`/`}>Forgot {label}?</Link>
            </div>
        );
    }

    return (
        <div className="cds--grid cds--grid--full-width login">
            <div className='cds--row wrap'>
                <div className="cds--col-max-5 cds--col-xlg-7 cds--col-lg-8 cds--col-md-5 cds--col-sm-4">
                    <div className="cds--row header-wrapper">
                        <img src='https://cloud.ibm.com/login/static/img/IBM_Cloud_White_Rev_RGB.png' alt="logo" />
                        <div className='title'>Log in
                            <span>{' to '}<span className="span">Human Resources</span></span>
                        </div>
                        <div className="help">Need help?
                            <Link className="link" to='/' >Contact admin</Link>
                        </div>
                    </div>
                    <Form className="cds--row cds--row--condensed form">
                        {
                            isInvalidEmail &&
                            <div className="cds--col-max-16 cds--col-xlg-16 cds--lg-16 cds--col-md-8 cds--col-sm-4 notification">
                                <InlineNotification
                                    lowContrast
                                    kind="error"
                                    role='alert'
                                    title="You must enter an ID."
                                    subtitle="Try again." />
                            </div>
                        }
                        <div className="cds--col-max-16 cds--col-xlg-16 cds--lg-16 cds--col-md-8 cds--col-sm-4 option">Sign in with</div>
                        <div className="cds--col-max-5 cds--col-xlg-5 cds--col-lg-5 cds--col-md-3 container">
                            <Dropdown
                                className="select"
                                defaultValue='email'
                                id='login-select'
                                items={items}
                                itemToString={item => item ? item.text : ''}
                                initialSelectedItem={items[0].id}
                                label={currentItem.text}
                                onChange={({ selectedItem }) => setCurrentItem(selectedItem)}
                                selectedItem={currentItem}
                            />
                        </div>
                        <div className="cds--col-max-11 cds--col-xlg-11 cds--col-lg-11 cds--col-md-5 container">
                            <TextInput
                                className="text-input"
                                id='email'
                                invalid={isInvalidEmail}
                                // invalidText='Invalid Email'
                                // labelText='Email'
                                // labelText={forgot('Email')}
                                placeholder="username@angel.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* <TextInput.PasswordInput
                            id='password'
                            invalid={isInvalidPassword}
                            invalidText='Invalid password'
                            labelText={forgot('Password')}
                            onChange={(e) => setPassword(e.target.value)}
                        /> */}
                        <Button
                            className="cds--col-max-16 cds--col-xlg-16 cds--lg-16 cds--col-md-8 cds--col-sm-4 button"
                            renderIcon={ArrowRight32}
                            kind="primary"
                            tabIndex={0}
                            onClick={onClickLogin}
                        >Log in</Button>
                        <Link className="forgot-id" to='/'>Forgot ID?</Link>
                    </Form>
                </div>
            </div >
        </div >
    );
}

export default Login;