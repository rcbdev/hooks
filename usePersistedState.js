import * as React from 'react';

const { useState, useEffect } = React;

const usePersistedState = (defaultState, key) => {
    const restored = localStorage.getItem(key);
    const [value, setValue] = useState(
        restored ? JSON.parse(restored) : defaultState
    );

    const setValueInStorage = x => {
        const newValue = typeof x === "function"
            ? x(value)
            : x;
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    };

    useEffect(() => {
        const restored = localStorage.getItem(key);
        if (restored) {
            setValue(JSON.parse(restored));
        }
    }, []);

    useEffect(() => {
        const handler = e => {
            if (e.key === key) {
                if (e.newValue) {
                    setValue(JSON.parse(e.newValue));
                } else {
                    setValue(defaultState);
                }
            }
        };

        window.addEventListener("storage", handler);

        return () => window.removeEventListener("storage", handler);
    }, []);

    return [value, setValueInStorage];
};

export default usePersistedState;
