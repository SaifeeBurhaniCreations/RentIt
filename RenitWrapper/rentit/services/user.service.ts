import axios from 'axios';
import Constants from 'expo-constants';

// const API_URL = Constants.expoConfig?.extra?.API_URL || process.env.API_URL;
const API_URL = "https://3906-2402-8100-26f3-a5d0-6041-d93e-66d2-e390.ngrok-free.app";

export const registerUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/api/v1/users/register`, userData);
  return response.status === 200 ? response.data : { status: response.status, message: response.data.message };
};
