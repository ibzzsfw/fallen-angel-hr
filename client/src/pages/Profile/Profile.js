import React from 'react';
import {
    Link,
    Tile,
    Tabs,
    Tab
} from 'carbon-components-react';
import EditProfile from './EditProfile';
/* import profile from "../../../public/assets/images/profile.jpg"; */

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
                <Tile className='cds--col left'>
                    {/* <image src={profile}></image> */}
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
                    <div className='info__links'>
                        <a href="#" class="bx--link">Edit</a>
                        <a href="#" class="bx--link">View more</a>
                    </div>
                </Tile>
                <Tile className='cds--col mid'>
                    <div className='cds--row dash__booking'>
                        <div className='title'>Booking Summary</div>
                            <Tabs contained className='tabs__booksum'>
                                <Tab label='Leave'>
                                    <p>Content for first tab goes here.</p>
                                </Tab>
                                <Tab label='Document request'>
                                    <p>Content for second tab goes here.</p>
                                </Tab>
                            </Tabs>
                        </div>
                    <div className='cds--row dash__dailytime'>
                        <div className='title'>Daily time</div>
                    </div>
                </Tile>
                <Tile className='cds--col right'>
                    <div className='cds--row dash__income'>
                        <div className='title'>Income</div>
                        <div className='income__data'>
                            <div className='income__month'>
                                <h1>38500</h1>
                                <p>per month</p>
                            </div>
                            <div className='income__year'>
                                <h1>462000</h1>
                                <p>per year</p>
                            </div>
                        </div>
                    </div>
                    <div className='cds--row dash__overtime'>
                        <div className='title'>Overtime</div>
                        <div className='overtime__data'>
                            <div className='overtime__hours'>
                                <h1>12</h1>
                                <p>hours</p>
                            </div>
                            <div className='overtime__amount'>
                                <h1>1805.25</h1>
                                <p>baht</p>
                            </div>
                        </div>
                    </div>
                </Tile>
            </div>
        </div>
    )
}

export default Profile;