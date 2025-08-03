const API_BASE_URL = 'http://localhost:5000/api';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Appointment {
  id: number;
  userId: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  notes: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  availableSlots: string[];
  image: string;
}

export interface WaitTime {
  department: string;
  currentWait: number;
  status: string;
}

export interface Payment {
  id: number;
  userId: number;
  amount: number;
  description: string;
  status: string;
  dueDate?: string;
  date?: string;
}

export interface DashboardStats {
  upcomingAppointments: number;
  activePrescriptions: number;
  totalVisits: number;
  pendingPayments: number;
}

export interface Activity {
  type: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to make API requests
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: string;
    bloodGroup: string;
  }) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },
};

// User API
export const userAPI = {
  getProfile: async (): Promise<User> => {
    return apiRequest('/user/profile');
  },

  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    return apiRequest('/dashboard/stats');
  },

  getRecentActivity: async (): Promise<Activity[]> => {
    return apiRequest('/dashboard/recent-activity');
  },
};

// Doctors API
export const doctorsAPI = {
  getAll: async (specialty?: string, search?: string): Promise<Doctor[]> => {
    const params = new URLSearchParams();
    if (specialty) params.append('specialty', specialty);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/doctors?${queryString}` : '/doctors';
    return apiRequest(endpoint);
  },

  getById: async (id: number): Promise<Doctor> => {
    return apiRequest(`/doctors/${id}`);
  },
};

// Appointments API
export const appointmentsAPI = {
  getAll: async (): Promise<Appointment[]> => {
    return apiRequest('/appointments');
  },

  create: async (appointmentData: {
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    duration?: number;
    notes?: string;
  }): Promise<Appointment> => {
    return apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  update: async (
    id: number,
    appointmentData: {
      date?: string;
      time?: string;
      notes?: string;
    }
  ): Promise<Appointment> => {
    return apiRequest(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  },

  cancel: async (id: number): Promise<{ message: string }> => {
    return apiRequest(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Wait Times API
export const waitTimesAPI = {
  getAll: async (): Promise<WaitTime[]> => {
    return apiRequest('/wait-times');
  },
};

// Payments API
export const paymentsAPI = {
  getAll: async (): Promise<Payment[]> => {
    return apiRequest('/payments');
  },

  process: async (paymentData: {
    amount: number;
    description: string;
    paymentMethod: string;
  }): Promise<Payment> => {
    return apiRequest('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
};

// Emergency Services API
export const emergencyAPI = {
  bookAmbulance: async (bookingData: {
    pickupAddress: string;
    destination: string;
    ambulanceType: string;
    contactNumber: string;
    notes?: string;
  }) => {
    return apiRequest('/ambulance', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  bookDiagnosticVan: async (bookingData: {
    fullName: string;
    address: string;
    contactNumber: string;
    date: string;
    testType: string;
  }) => {
    return apiRequest('/diagnostic-van', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}`);
    return response.json();
  } catch (error) {
    throw new Error('Backend server is not running');
  }
}; 