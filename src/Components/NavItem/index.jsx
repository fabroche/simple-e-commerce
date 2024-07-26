import React from 'react';

function NavItem({to, activeStyle, children}) {
    return (
        <NavLink
        to={to}
        className={({isActive}) => isActive ? activeStyle : undefined}
        >
            {children}
        </NavLink>
    );
}

export {NavItem}