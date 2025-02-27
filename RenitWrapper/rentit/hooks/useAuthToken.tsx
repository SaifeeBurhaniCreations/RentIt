import { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const REFRESH_URL = 'https://8746-2402-8100-26e7-1a2e-6811-a8ee-d1d2-ab4d.ngrok-free.app/api/v1/auth/refresh';

const fetchUserData = async (accessToken: string | null) => {
    if (!accessToken) return null;
    const response = await axios.get('https://8746-2402-8100-26e7-1a2e-6811-a8ee-d1d2-ab4d.ngrok-free.app/api/v1/users/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
};

const useAuthToken = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const refreshTimeout = useRef<NodeJS.Timeout | null>(null);

    const { data: user, refetch: refetchUser } = useQuery({
        queryKey: ['user', accessToken],
        queryFn: () => fetchUserData(accessToken),
        enabled: !!accessToken,
        staleTime: 1000 * 60 * 5, // Cache user data for 5 minutes
    });

    const saveAuthData = async (accessToken: string, refreshToken: string, expiresIn: number) => {
        const expiry = Date.now() + expiresIn * 1000;
        const authData = { accessToken, refreshToken, expiry };

        await AsyncStorage.setItem('authData', JSON.stringify(authData));
        setAccessToken(accessToken);
        scheduleTokenRefresh(expiresIn);
    };

    const refreshToken = async (): Promise<string | null> => {
        const jsonValue = await AsyncStorage.getItem('authData');
        if (!jsonValue) {
            logout();
            return null;
        }

        const authData = JSON.parse(jsonValue);
        const { refreshToken } = authData;

        try {
            const response = await axios.post(REFRESH_URL, { refreshToken });
            if (response.status === 200) {
                const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data;
                await saveAuthData(accessToken, newRefreshToken, expiresIn);
                refetchUser();
                return accessToken;
            } else {
                logout();
                return null;
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('❌ Token refresh failed:', error.message);
                if (error.response?.status === 500) {
                    setTimeout(refreshToken, 5000);
                } else {
                    logout();
                }
            } else {
                console.error('❌ Unknown error during token refresh:', error);
                logout();
            }
            return null;
        }
    };

    const scheduleTokenRefresh = async (expiresIn: number) => {
        if (refreshTimeout.current) clearTimeout(refreshTimeout.current);

        const timeLeft = expiresIn * 1000 - 5000;
        refreshTimeout.current = setTimeout(refreshToken, timeLeft);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('authData');
        setAccessToken(null);

        if (refreshTimeout.current) {
            clearTimeout(refreshTimeout.current);
            refreshTimeout.current = null;
        }

        console.log('👋 Logged out');
    };

    useEffect(() => {
        const init = async () => {
            const jsonValue = await AsyncStorage.getItem('authData');
            if (!jsonValue) return;

            const authData = JSON.parse(jsonValue);
            const timeLeft = authData.expiry - Date.now();

            if (isNaN(timeLeft) || timeLeft <= 0) {
                console.log('⏳ Token expired, refreshing now...');
                await refreshToken();
            } else {
                console.log(`🕒 Token valid, scheduling refresh in ${timeLeft / 1000} seconds`);
                setAccessToken(authData.accessToken);
                scheduleTokenRefresh(timeLeft / 1000);
            }
        };

        init();
    }, []);

    return { accessToken, user, saveAuthData, logout };
};

export default useAuthToken;
