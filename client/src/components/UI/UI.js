import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
} from 'carbon-components-react';

import {
    Switcher20,
    Notification20,
    UserAvatar20,
    Logout20
} from '@carbon/icons-react';

const UI = () => {

    const navigate = useNavigate();
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
    const [currentAction, setCurrentAction] = useState('login');
    const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('currentPage'));
    const onClickLogOut = useCallback(() => {

        sessionStorage.setItem('login', 'false')
        sessionStorage.setItem('currentPage', 'login')
        setCurrentAction('login')
        navigate('/', { replace: true })
    }, [navigate]);

    useEffect(() => {
        if (sessionStorage.getItem('login') === 'true') {
            setCurrentAction('profile')
        }
    }, [sessionStorage.getItem('login')])

    useEffect(() => setCurrentPage(sessionStorage.getItem('currentPage')), [sessionStorage.getItem('currentPage')])

    const onClickAction = action => setCurrentAction(
        action === currentAction && action !== 'profile'
            ? ''
            : action
    )

    useEffect(() => console.log(currentPage), [currentPage])

    return (
        sessionStorage.getItem('login') === 'true' ?
            <Header aria-label="FallenAngel Platform" className='header'>
                <SkipToContent />
                <HeaderMenuButton
                    aria-label="Open menu"
                    onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
                    isActive={isSideNavExpanded}
                />
                <HeaderName element={Link} to='/profile' prefix="FallenAngel">
                    [Human Resources]
                </HeaderName>
                <HeaderNavigation aria-label="FallenAngel [Human Resources]">
                    <HeaderMenuItem
                        element={Link}
                        to='/dailytime'
                        onClick={() => sessionStorage.setItem('currentPage', 'dailytime')}
                        isCurrentPage={currentPage === 'dailytime'}
                    >
                        Daily Time
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        element={Link}
                        to='/deduction'
                        onClick={() => sessionStorage.setItem('currentPage', 'deduction')}
                        isCurrentPage={currentPage === 'deduction'}
                    >
                        Deduction
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        element={Link}
                        to='/dailytime'
                        onClick={() => sessionStorage.setItem('currentPage', 'leave')}
                        isCurrentPage={currentPage === 'leave'}
                    >
                        Leave
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        href="#"
                        onClick={() => sessionStorage.setItem('currentPage', 'payment')}
                        isCurrentPage={currentPage === 'payment'}
                    >
                        Payment
                    </HeaderMenuItem>
                    <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                        <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                        <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                        <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                    </HeaderMenu>
                </HeaderNavigation>
                <HeaderGlobalBar>
                    <HeaderGlobalAction
                        aria-label="Notifications"
                        isActive={currentAction === 'notifications'}
                        onClick={() => onClickAction('notifications')}
                    >
                        <Notification20 />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction
                        aria-label="User Avatar"
                        isActive={currentAction === 'profile'}
                        onClick={() => {
                            onClickAction('profile')
                            navigate('/profile', { replace: true })
                        }}
                    >
                        <UserAvatar20 />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction
                        aria-label="App Switcher"
                        isActive={currentAction === 'switcher'}
                        onClick={() => onClickAction('switcher')}
                    >
                        <Switcher20 />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction aria-label="Log out" onClick={onClickLogOut}>
                        <Logout20 />
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
            </Header> :
            <Header aria-label="FallenAngel Platform">
                <HeaderName element={Link} to='/' prefix="Welcome to FallenAngel" >
                    Human Resources
                </HeaderName>
            </Header>
    );
}

export default UI;