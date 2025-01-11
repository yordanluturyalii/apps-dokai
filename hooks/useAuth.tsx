import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync('token');
                console.log('Retrieved token:', storedToken);
                setToken(storedToken);
            } catch (error) {
                console.error('Error getting token:', error);
            } finally {
                setLoading(false);
            }
        };

        getToken();
    }, []);

    return { token, loading };
};