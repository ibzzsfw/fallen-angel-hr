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
    const onClickAvatar = useCallback(() => navigate('/profile', { replace: true }), [navigate]);
    const onClickLogOut = useCallback(() => {

        sessionStorage.setItem('login', 'false')
        navigate('/', { replace: true })
    }, [navigate]);

    return (
        sessionStorage.getItem('login') === 'true' ?
            <Header aria-label="FallenAngel Platform">
                <SkipToContent />
                <HeaderMenuButton
                    aria-label="Open menu"
                    onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
                    isActive={isSideNavExpanded}
                />
                <HeaderName element={Link} to='/' prefix="FallenAngel">
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
                    <HeaderGlobalAction aria-label="Notifications">
                        <Notification20 />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction aria-label="User Avatar">
                        <UserAvatar20 onClick={onClickAvatar} />
                    </HeaderGlobalAction>
                    <HeaderGlobalAction aria-label="App Switcher"  >
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
            </Header> :
            <Header aria-label="FallenAngel Platform">
                <HeaderName element={Link} to='/' prefix="Welcome to FallenAngel">
                    Human Resources
                </HeaderName>
                <HeaderNavigation aria-label="Welcome to FallenAngel [Human Resources]" />
            </Header>
    );
}

export default UI;