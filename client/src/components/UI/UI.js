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
    const [currentPage, setCurrentPage] = useState('login');
    const onClickLogOut = useCallback(() => {

        sessionStorage.setItem('login', 'false')
        setCurrentPage('login')
        navigate('/', { replace: true })
    }, [navigate]);

    useEffect(() => setCurrentPage((sessionStorage.getItem('login') === 'true') ? 'profile' : ''), [sessionStorage.getItem('login')])

    const onClickAction = action => setCurrentPage(
        action === currentPage
            ? ''
            : action
    )

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
                    <HeaderMenuItem element={Link} to='/dailytime'>Daily Time</HeaderMenuItem>
                    <HeaderMenuItem element={Link} to='/deduction'>Deduction</HeaderMenuItem>
                    <HeaderMenuItem element={Link} to='/dailytime'>Leave</HeaderMenuItem>
                    <HeaderMenuItem href="#">Payment</HeaderMenuItem>
                    <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                        <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                        <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                        <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                    </HeaderMenu>
                </HeaderNavigation>
                <HeaderGlobalBar>
                    <HeaderGlobalAction
                        aria-label="Notifications"
                        isActive={currentPage === 'notifications'}
                        onClick={() => onClickAction('notifications')}
                    >
                        <Notification20 />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction
                        aria-label="User Avatar"
                        isActive={currentPage === 'profile'}
                        onClick={() => onClickAction('profile')}
                    >
                        <UserAvatar20 />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction
                        aria-label="App Switcher"
                        isActive={currentPage === 'switcher'}
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
                <HeaderPanel aria-label="Notifications" expanded={currentPage === 'notifications'}>Notifications</HeaderPanel>
                <HeaderPanel  aria-label="Switcher" expanded={currentPage === 'switcher'}>Switcher</HeaderPanel>
            </Header> :
            <Header aria-label="FallenAngel Platform">
                <HeaderName element={Link} to='/' prefix="Welcome to FallenAngel" >
                    Human Resources
                </HeaderName>
            </Header>
    );
}

export default UI;