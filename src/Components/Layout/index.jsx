import React from 'react';

function Layout({children}) {
    return (
        <div className="flex flex-col items-center mt-20 pl-4 pr-4 relative">
            {children}
        </div>
    );
}

export {Layout};