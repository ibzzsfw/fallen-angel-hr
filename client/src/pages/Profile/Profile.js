import React from 'react';
import {
    Link
} from 'carbon-components-react';

const Profile = () => {

    return (
        <div className='cds--grid cds--grid--full-width profile'>
            <div className='cds--row profile__banner'>
                <div className="cds--col-lg-16">
                    <h1 className='profile__header'>Profile</h1>
                    <p  className='profile__p'>Welcome, suppakorn rakna</p>
                </div>
            </div>
            <div className='cds--row profile__content'>
                <div className='cds--col left'>
                    <image src=''></image>
                    <div className='info__row'>
                        <h5>Employee ID</h5>
                        <p>0023</p>

                        <h5>Name</h5>
                        <p>suppakorn rakna</p>

                        <h5>Department</h5>
                        <p>human resources</p>

                        <h5>Position</h5>
                        <p>admin</p>
                    </div>
                </div>
                <div className='cds--col mid'>
                    <a href="#" class="bx--link">View all</a>
                </div>
                <div className='cds--col right'>
                    <a href="#" class="bx--link">View all</a>
                </div>
            </div>
        </div>
    )
}

export default Profile;