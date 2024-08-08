import React from 'react';

function PriceCurrency({currency}) {
    return (
        <span className="absolute top-0 text-xs">{currency}</span>
    );
}

export {PriceCurrency};