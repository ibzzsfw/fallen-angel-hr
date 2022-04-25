import React, { useState, useCallback } from 'react';
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
    Switcher,
    Notification,
    UserAvatar,
    Logout
} from '@carbon/icons-react';

const UI = () => {

    const navigate = useNavigate();
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
    const onClickAvatar = useCallback(() => navigate('/profile', { replace: true }), [navigate]);

    return (
        <Header aria-label="IBM Platform Name">
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
                <HeaderMenuItem href="#">Deduction</HeaderMenuItem>
                <HeaderMenuItem href="#">Leave</HeaderMenuItem>
                <HeaderMenuItem href="#">Payment</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
            </HeaderNavigation>
            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Notifications">
                    <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="User Avatar">
                    <UserAvatar size={20} onClick={onClickAvatar} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="App Switcher">
                    <Switcher size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Log out">
                    <Logout size={20} />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}>
                <SideNavItems>
                    <HeaderSideNavItems>
                        <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                        <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                        <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                        <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                            <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                            <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                            <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                        </HeaderMenu>
                    </HeaderSideNavItems>
                </SideNavItems>
            </SideNav>
        </Header>
    );
}

export default UI;