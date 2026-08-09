import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);

            return storedValue !== null
                ? JSON.parse(storedValue)
                : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            console.error(`Failed to save "${key}" to localStorage`);
        }
    }, [key, value]);

    return [value, setValue] as const;
}

export default useLocalStorage;