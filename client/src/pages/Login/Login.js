import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    TextInput,
    Select,
    SelectItem,
} from 'carbon-components-react';
import {
    g100,
} from '@carbon/themes';
import { ArrowRight32 } from '@carbon/icons-react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);

    useEffect(() => sessionStorage.setItem('login', 'false'), [])

    const onClickLogin = () => {

        if (email === "" ) {
            setIsInvalidEmail(email === "");
            // setIsInvalidPassword(password === "");
        } else {
            navigate('/profile', { replace: true })
            sessionStorage.setItem('login', 'true')
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
        <div className="cds--grid cds--grid--full-width login">
            <div className='cds--row wrap'>
                <div className="cds--col-max-5 cds--col-xlg-7 cds--col-lg-8 cds--col-md-5 cds--col-sm-4">
                    <div className="cds--row header-wrapper">
                        <img src='https://cloud.ibm.com/login/static/img/IBM_Cloud_White_Rev_RGB.png' alt="logo" />
                        <div className='title'>Log in</div>
                        <div className="help">Need help?
                            <Link className="link" to='/' >Contact admin</Link>
                        </div>
                    </div>
                    <Form className="cds--row cds--row--condensed form">
                        <div className="cds--col-max-5 cds--col-xlg-5 cds--col-lg-5 cds--col-md-3 container">
                            <Select
                                className="select"
                                defaultValue='email'
                                id='login-select'
                                labelText='Log in with'
                            >
                                <SelectItem
                                    text="Email"
                                    value="eamil"
                                />
                                <SelectItem
                                    text="EmployeeID"
                                    value="employeeId"
                                />
                            </Select>
                        </div>
                        <div className="cds--col-max-11 cds--col-xlg-11 cds--col-lg-11 cds--col-md-5 container">
                            <TextInput
                                className="text-input"
                                id='email'
                                invalid={isInvalidEmail}
                                invalidText='Invalid Email'
                                labelText='Email'
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
                            // type="submit"
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