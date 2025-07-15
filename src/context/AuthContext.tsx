import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchUserProfile(token);
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await axios.get<User>('/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await axios.post<{ token: string }>('/api/v1/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    await fetchUserProfile(res.data.token);
    navigate('/');
  };

  const signup = async (username: string, password: string) => {
    await axios.post('/api/v1/auth/signup', { username, password });
    navigate('/login');
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};


// // src/context/AuthContext.tsx
// import React, { createContext, useState, useEffect } from 'react';
// import api from '../api/axiosInstance'; // the axios instance
// import { useNavigate } from 'react-router-dom';

// interface AuthContextType {
//   user: string | null;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Load user on mount if token exists
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       api.get('/auth/profile')
//         .then((res) => setUser(res.data.username))
//         .catch(() => {
//           localStorage.removeItem('token');
//           setUser(null);
//         });
//     }
//   }, []);

//   // Login function
//   const login = async (username: string, password: string) => {
//     try {
//       const res = await api.post('/auth/login', { username, password });
//       localStorage.setItem('token', res.data.token);
//       // Fetch user profile
//       const profile = await api.get('/auth/profile');
//       setUser(profile.data.username);
//       navigate('/'); // redirect to home/dashboard
//     } catch (err) {
//       console.error('Login failed', err);
//       throw err;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
