'use client';
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(clave: string, valorInicial: Record<string, { type: string; calories: number; description: string }> = {}) {
    const [storedValue, setStoreValue] = useState(() => {
        if (typeof window !== 'undefined') {
            const item = localStorage.getItem(clave);
            try {
                return item ? JSON.parse(item) : valorInicial;
            } catch (e) {
                return valorInicial;
            }
        }
        return valorInicial;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(clave, JSON.stringify(storedValue));
        }
    }, [clave, storedValue]);

    const setValue = (key: string, value: { type: string; calories: number; description: string }) => {
        setStoreValue((prevStoredValue: any) => {
            if (prevStoredValue && typeof prevStoredValue === 'object') {
                return {
                    ...prevStoredValue,
                    [key]: value,
                };
            } else {
                return { [key]: value };
            }
        });
    };

    const resetValue = useCallback(()=>{
        setStoreValue(valorInicial)
    }, [valorInicial])

    return [storedValue, setValue, resetValue];
}