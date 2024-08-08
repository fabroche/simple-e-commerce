import React, {useEffect, useState} from 'react';

function useLocalStorage(itemKeyName, initialValue) {
    const localStorageItem = localStorage.getItem(itemKeyName);

    let parsedItem;

    if (!localStorageItem) {
        localStorage.setItem(itemKeyName, JSON.stringify(initialValue));
        parsedItem = initialValue;
    } else {
        parsedItem = JSON.parse(localStorageItem);
    }

    const [item, setItem] = useState(parsedItem);

    const saveItem = (newItem) => {
        localStorage.setItem(itemKeyName, JSON.stringify(newItem));
        setItem(newItem);
    };

    return [item, saveItem]
}

export {useLocalStorage};