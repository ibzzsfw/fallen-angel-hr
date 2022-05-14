import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router'
import {
    Header,
    SkipToContent,
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    HeaderMenu,
    Theme,
} from '@carbon/react';
import {
    UserAvatar,
    Light,
    Asleep
} from '@carbon/react/icons';
import styles from '../scss/navbar.module.scss';
import { useThemePreference } from './ThemePreference.js'

const Navbar = () => {

    const router = useRouter()

    const { theme, setTheme } = useThemePreference();
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
    const [currentAction, setCurrentAction] = useState('login');
    const [currentPage, setCurrentPage] = useState('currentPage');
    const onClickLogOut = useCallback(() => {

        // sessionStorage.setItem('login', 'false')
        // sessionStorage.setItem('currentPage', 'login')
        setCurrentAction('login')
        router.push('/')
        // navigate('/', { replace: true })
    }, []);

    // useEffect(() => {
    //     if (sessionStorage.getItem('login') === 'true') {
    //         setCurrentAction('profile')
    //     }
    // }, [sessionStorage.getItem('login')])

    // useEffect(() => setCurrentPage(sessionStorage.getItem('currentPage')), [sessionStorage.getItem('currentPage')])

    const onClickAction = action => setCurrentAction(
        action === currentAction
            ? ''
            : action
    )

    return (
        true ?
            <Theme theme={'g100'}>
                <Header aria-label="FallenAngel Platform" className='header'>
                    <SkipToContent />
                    <HeaderMenuButton
                        aria-label="Open menu"
                        onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
                        isActive={isSideNavExpanded}
                    />
                    <HeaderName prefix="FallenAngel" onClick={() => router.push('/dashboard')}>
                        [Human Resources]
                    </HeaderName>
                    <HeaderNavigation aria-label="FallenAngel [Human Resources]">
                        <HeaderMenuItem
                            onClick={() => router.push('/dailytime')}
                            // element={Link}
                            // to='/dailytime'
                            // onClick={() => sessionStorage.setItem('currentPage', 'dailytime')}
                            isCurrentPage={currentPage === 'dailytime'}
                        >
                            Daily Time
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            onClick={() => router.push('/leave')}
                            // element={Link}
                            // to='/dailytime'
                            // onClick={() => sessionStorage.setItem('currentPage', 'leave')}
                            isCurrentPage={currentPage === 'leave'}
                        >
                            Leave
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            onClick={() => router.push('/payment')}
                            // onClick={() => sessionStorage.setItem('currentPage', 'payment')}
                            isCurrentPage={currentPage === 'payment'}
                        >
                            Payment
                        </HeaderMenuItem>
                        <HeaderMenu aria-label="Admin" menuLinkName="Admin">
                            <HeaderMenuItem onClick={() => router.push('/notification')}>Notification request</HeaderMenuItem>
                            <HeaderMenuItem onClick={() => router.push('/manage')}>Manage employee</HeaderMenuItem>
                            <HeaderMenuItem onClick={() => router.push('/promotion')}>Promotion</HeaderMenuItem>
                        </HeaderMenu>
                        <HeaderMenu aria-label="Manager" menuLinkName="Manager">
                            <HeaderMenuItem onClick={() => router.push('/document')}>Document</HeaderMenuItem>
                        </HeaderMenu>
                    </HeaderNavigation>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction
                            aria-label="Profile"
                            isActive={currentAction === 'profile'}
                            onClick={() => onClickAction('profile')}>
                            <UserAvatar size={20} />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                    {/* <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}>
                        <SideNavItems>
                            <HeaderSideNavItems>
                                <HeaderMenuItem element={Link} to='/dailytime'>Daily Time</HeaderMenuItem>
                                <HeaderMenuItem element={Link} to='/deduction'>Deduction</HeaderMenuItem>
                                <HeaderMenuItem element={Link} to='/dailytime'>Leave</HeaderMenuItem>
                                <HeaderMenuItem element={Link} to='/document'>Document</HeaderMenuItem>
                                <HeaderMenuItem href="#">Payment</HeaderMenuItem>
                                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                                    <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                                    <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                                </HeaderMenu>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav> */}
                    <HeaderPanel aria-label="Profile" expanded={currentAction === 'profile'} className={styles.panel}>
                        <div className={styles.profilePanel}>
                            <div className={styles.row}>
                                <div className={styles.label}>Signed in as:</div>
                                <div className={styles.value}>Suppakorn Rakna</div>
                                <div className={styles.value}>example@angel.com</div>
                            </div>
                            <div className={styles.row + ' ' + styles.setting}>
                                <div onClick={() => router.push('/profile')}>
                                    <a>Account setting</a>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.option}>
                                    <div className={styles.value}>Theme</div>
                                    <div
                                        className={styles.tileGroup}
                                        defautlSelected='g10'
                                        name='radio theme group'>
                                        <div
                                            className={styles.radioTile + ' ' + (theme === 'g10' ? styles.selected : '')}
                                            onClick={() => setTheme('g10')} >
                                            <Light size={20} />
                                            Light
                                        </div>
                                        <div
                                            className={styles.radioTile + ' ' + (theme === 'g100' ? styles.selected : '')}
                                            onClick={() => setTheme('g100')} >
                                            <Asleep size={20} />
                                            Dark
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.signout}>Sign out</div>
                        </div>
                    </HeaderPanel>
                </Header>
            </Theme> :
            <Theme theme={'g100'}>
                <Header aria-label="FallenAngel Platform">
                    <HeaderName element={Link} to='/' prefix="Welcome to FallenAngel" >
                        Human Resources
                    </HeaderName>
                </Header>
            </Theme>
    );
}

export default Navbar;