import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import * as mock from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const USE_MOCK = true; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

const mockCall = async <T>(data: T, delay = 500): Promise<ApiResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data }), delay);
  });
};

// Helper to convert AxiosResponse to ApiResponse
const wrap = <T>(promise: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> => {
  return promise.then(res => ({ data: res.data }));
};

export const apiService = {
  auth: {
    login: (credentials: any) => USE_MOCK 
      ? mockCall({ user: mock.mockUsers.find(u => u.email === credentials.email) || mock.mockUsers[0], token: 'mock-jwt' })
      : wrap(api.post('/auth/login', credentials)),
    me: () => USE_MOCK 
      ? mockCall(mock.mockUsers[0])
      : wrap(api.get('/auth/me')),
  },

  properties: {
    getAll: () => USE_MOCK ? mockCall(mock.mockProperties) : wrap(api.get<any[]>('/properties')),
    getById: (id: string) => USE_MOCK ? mockCall(mock.mockProperties.find(p => p.id === id)) : wrap(api.get(`/properties/${id}`)),
  },

  units: {
    getAll: (params?: any) => USE_MOCK ? mockCall(mock.mockUnits) : wrap(api.get('/units', { params })),
  },

  maintenance: {
    getAll: (params?: any) => USE_MOCK ? mockCall(mock.mockMaintenance) : wrap(api.get('/maintenance', { params })),
    create: (data: any) => USE_MOCK ? mockCall({ ...data, id: Math.random().toString() }) : wrap(api.post('/maintenance', data)),
    updateStatus: (id: string, status: string) => USE_MOCK ? mockCall({ id, status }) : wrap(api.patch(`/maintenance/${id}/status`, { status })),
  },

  invoices: {
    getAll: (params?: any) => USE_MOCK ? mockCall(mock.mockInvoices) : wrap(api.get('/invoices', { params })),
  },
  
  payments: {
    getAll: () => USE_MOCK ? mockCall([]) : wrap(api.get('/payments')),
    create: (data: any) => USE_MOCK ? mockCall({ ...data, id: Math.random().toString() }) : wrap(api.post('/payments', data)),
  }
};

export default api;