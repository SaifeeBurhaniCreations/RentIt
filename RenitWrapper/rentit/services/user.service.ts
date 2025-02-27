import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginRequestProps, RegisterRequestProps, RegisterResponseProp, LoginResponseProp } from '@/types/types';

import Constants from 'expo-constants';

// const API_URL = Constants.expoConfig?.extra?.API_URL || process.env.API_URL;

const API_URL = "https://8203-1-187-180-153.ngrok-free.app";

const API = axios.create({ baseURL: `${API_URL}/api/v1` });

// ✅ Intercept requests and inject the token
API.interceptors.request.use(async (config) => {
  const jsonValue = await AsyncStorage.getItem('authData');
  if (jsonValue) {
    const { accessToken } = JSON.parse(jsonValue);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ✅ Automatically refresh token on 401 errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const jsonValue = await AsyncStorage.getItem('authData');
      if (!jsonValue) return Promise.reject(error);

      const { refreshToken } = JSON.parse(jsonValue);
      try {
        const refreshResponse = await axios.post(`${API_URL}/api/v1/auth/refresh`, { refreshToken });

        if (refreshResponse.status === 200) {
          const { accessToken, refreshToken: newRefreshToken, expiresIn } = refreshResponse.data;
          await AsyncStorage.setItem(
            'authData',
            JSON.stringify({ accessToken, refreshToken: newRefreshToken, expiry: Date.now() + expiresIn * 1000 })
          );

          // 🔄 Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return API(error.config);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData: RegisterRequestProps) => {
  const response: RegisterResponseProp = await API.post('/users/register', userData);
  return response;
};

export const loginUser = async (userData: LoginRequestProps) => {
  const response: LoginResponseProp = await API.post('/users/login', userData);
  return response;
};

export const fetchUserProfile = async () => {
  const response = await API.get('/users/me');
  return response.data;
};

export default API;
