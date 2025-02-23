import axios from 'axios';

const API_URL = 'https://498e-2401-4900-1ca2-b818-c03e-abc3-ef5c-b3bb.ngrok-free.app/api/v1/users';

export const registerUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.status === 200 ? response.data : { status: response.status, message: response.data.message };
};

