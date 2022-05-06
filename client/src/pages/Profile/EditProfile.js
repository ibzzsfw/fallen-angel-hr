import React from 'react';
import {
    Form,
    TextInput,
    DatePicker,
    DatePickerInput,
    RadioButtonGroup,
    RadioButton,
    TextArea
} from 'carbon-components-react';

const EditProfile = ({ CloseModal }) => {

    return (
        <div className='edit__bg'>
            <div className='cds--grid cds--grid--max-8 edit__container'>
                <div className='cds--row edit__basic'>
                    <div className='head'>
                        <h4 className='heading'>Basic Info</h4>
                        <p className='p'>Some info may be visible to other people.</p>
                    </div>
                    <div className='form'>
                        <Form>
                            <TextInput 
                                className='input'
                                id='identification'
                                labelText='Identification no.'
                                placeholder='1 1000 20000 30 4'
                                size='sm'
                            />
                            <TextInput 
                                className='input'
                                id='firstname'
                                labelText='First name'
                                placeholder='suppakorn'
                                size='sm'
                            />
                            <TextInput 
                                className='input'
                                id='lastname'
                                labelText='Last name'
                                placeholder='rakna'
                                size='sm'
                            />
                            <DatePicker
                                className='input'
                                datePickerType="single"
                                size='sm'
                            >
                                <DatePickerInput
                                    id="dob"
                                    labelText="Date of birth"
                                    placeholder="mm/dd/yyyy"
                                    size='sm'
                                />
                            </DatePicker>
                            <RadioButtonGroup
                                className='input'
                                defaultSelected="gender"
                                legendText="Gender"
                                name="gender"
                                size='sm'
                            >
                                <RadioButton
                                    id="male"
                                    labelText="Male"
                                    value="male"
                                />
                                <RadioButton
                                    id="female"
                                    labelText="Female"
                                    value="female"
                                />
                                <RadioButton
                                    id="other"
                                    labelText="Other"
                                    value="other"
                                />
                            </RadioButtonGroup>
                        </Form>
                    </div>
                </div>
                <div className='cds--row edit__contact'>
                    <div className='head'>
                        <h4 className='heading'>Contact Info</h4>
                        <p className='p'>Some info may be visible to other people.</p>
                    </div>
                    <div className='form'>
                        <Form>
                            <TextInput 
                                className='input'
                                //className='text-input'
                                id='email'
                                labelText='Email'
                                placeholder='username@angel.com'
                                size='sm'
                            />
                            <TextInput 
                                className='input'
                                //className='text-input'
                                id='phone'
                                labelText='Phone'
                                placeholder='0812345678'
                                size='sm'
                            />
                            <TextArea 
                                className='input'
                                //className='text-area'
                                id='address'
                                labelText='Address'
                                size='sm'
                            />
                        </Form>
                    </div>
                </div>
                <div className='cds--row edit__footer'>
                    <button className='bx--btn bx--btn--primary button__save'>Save</button>
                    <button className='bx--btn bx--btn--danger button__cancel' 
                        onClick={() => CloseModal(false)}>Cancel</button >
                </div>
            </div>
        </div>
            
    )
}

export default EditProfile;