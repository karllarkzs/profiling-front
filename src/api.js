import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const useFetchPatients = () => {
  return useQuery('patients', async () => {
    const response = await axiosInstance.get('/patients');
    return response.data;
  });
};

export const useCreatePatient = () => {
  const { refetch } = useQuery('patients');

  return useMutation(
    async (patientData) => {
      const response = await axiosInstance.post('/patients', { data: patientData }); // Ensure the request body has the 'data' field
      return response.data;
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
};
