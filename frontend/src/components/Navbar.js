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
    HeaderSideNavItems,
    HeaderPanel,
    SideNav,
    SideNavItems,
    HeaderMenu,
    Theme,
    Link
} from '@carbon/react';

import {
    Switcher,
    UserAvatar,
    Logout
} from '@carbon/icons-react';
// import { useThemePreference } from './ThemePreference.js'

const Navbar = () => {

    // const navigate = useNavigate();
    const router = useRouter()

    // const { theme, setTheme } = useThemePreference();
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
        action === currentAction && action !== 'profile'
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
                            onClick={() => router.push('/document')}
                            // element={Link}
                            // to='/dailytime'
                            // onClick={() => sessionStorage.setItem('currentPage', 'leave')}
                            isCurrentPage={currentPage === 'document'}
                        >
                            Document
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
                    </HeaderNavigation>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction
                            aria-label="User Avatar"
                            isActive={currentAction === 'profile'}
                            onClick={() => {
                                // sessionStorage.setItem('currentPage', 'profile')
                                onClickAction('profile')
                                router.push('/profile')
                            }}
                        >
                            <UserAvatar size={20} />
                        </HeaderGlobalAction>
                        <HeaderGlobalAction
                            aria-label="App Switcher"
                            isActive={currentAction === 'switcher'}
                            onClick={() => onClickAction('switcher')}
                        >
                            <Switcher size={20} />
                        </HeaderGlobalAction>
                        <HeaderGlobalAction aria-label="Log out" onClick={onClickLogOut}>
                            <Logout size={20} />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                    <SideNav
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
                    </SideNav>
                    <HeaderPanel aria-label="Notifications" expanded={currentAction === 'notifications'}>Notifications</HeaderPanel>
                    <HeaderPanel aria-label="Switcher" expanded={currentAction === 'switcher'}>Switcher</HeaderPanel>
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