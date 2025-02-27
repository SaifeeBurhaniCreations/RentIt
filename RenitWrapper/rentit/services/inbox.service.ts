import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL || process.env.API_URL;

export const getInbox = async () => {
  const response = await axios.get(`${API_URL}/inbox`);
  return response.status === 200 ? response.data : { status: response.status, message: response.data.message };
};


export const deleteInbox = async (ids: string[]) => {
    const response = await axios.delete(`${API_URL}/inbox`, { data: { ids } });
    return response.status === 200 ? response.data : { status: response.status, message: response.data.message };
  };