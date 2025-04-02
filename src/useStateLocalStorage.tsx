import { useState } from "react";

export function useStateLocalStorage<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(() => {
        const item = localStorage.getItem(key);
        if (item === null) {
            return initialValue;
        }
        if (typeof initialValue === 'object') {
            return {...initialValue, ...JSON.parse(item)};
        } else {
            return JSON.parse(item);
        }
    });

    const setStoredValue = (value: T) => {
        try {
            setState(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting localStorage key “' + key + '”: ', error);
        }
    };

    return [state, setStoredValue] as const;
}
