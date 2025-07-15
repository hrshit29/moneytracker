import React, { useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg);
  padding: 2rem;
  transition: background 0.3s ease;
`;

const Card = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  box-shadow: 0 8px 24px var(--shadow-color);
  padding: 3rem 2rem;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px var(--shadow-color);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: var(--primary-color);
  font-size: 1.8rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--primary-color2);
  font-size: 0.95rem;
`;

const StyledInputWrapper = styled.div`
  background: var(--color-bg-alt);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s ease, border 0.3s ease;

  &:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(245, 102, 146, 0.3);
  }
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: var(--primary-color2);
  font-size: 1rem;

  &::placeholder {
    color: var(--primary-color3);
  }
`;

const ErrorText = styled.p`
  color: var(--color-delete);
  text-align: center;
  font-size: 0.9rem;
`;

const SignupButton = styled.button`
  background: var(--color-accent);
  color: #fff;
  text-align: center;
  padding: 0.8rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px var(--shadow-color);
  transition: background 0.3s ease, transform 0.2s ease;
  background: #e25582;

  &:active {
    transform: scale(0.97);
  }
`;

const BottomText = styled.p`
  text-align: center;
  color: var(--primary-color3);
  font-size: 0.8rem;

  a {
    color: var(--color-accent);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signup(username, password);
    } catch (err: any) {
      if (typeof err === 'string') {
        setError(err);
      } else if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed');
      }
    }
  };

  return (
    <Container>
      <Card>
        <Title>Signup</Title>
        <Subtitle>Create your account to get started</Subtitle>
        {error && <ErrorText>{error}</ErrorText>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <StyledInputWrapper>
            <StyledInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </StyledInputWrapper>

          <StyledInputWrapper>
            <StyledInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledInputWrapper>

          <SignupButton type="submit">Signup</SignupButton>
        </form>

        <BottomText>
          Already have an account? <Link to="/login">Login</Link>
        </BottomText>
      </Card>
    </Container>
  );
};

export default Signup;



// import React, { createContext, useState, useEffect } from 'react';
// import type { ReactNode, FC } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // --- Define User Interface ---
// interface User {
//   id: string;
//   username: string;
// }

// // --- Define Auth Context Interface ---
// interface AuthContextType {
//   user: User | null;
//   login: (username: string, password: string) => Promise<void>;
//   signup: (username: string, password: string) => Promise<void>;
//   signOut: () => void;
// }

// // --- Create Auth Context ---
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // --- AuthProvider Props ---
// interface AuthProviderProps {
//   children: ReactNode;
// }

// // --- AuthProvider Component ---
// export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUserProfile(token);
//     }
//   }, []);

//   const fetchUserProfile = async (token: string) => {
//     try {
//       const response = await axios.get<User>('/api/v1/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       localStorage.removeItem('token');
//       navigate('/login');
//     }
//   };

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await axios.post<{ token: string }>('/api/v1/auth/login', { username, password });
//       localStorage.setItem('token', response.data.token);
//       await fetchUserProfile(response.data.token);
//       navigate('/');
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   const signup = async (username: string, password: string) => {
//   try {
//     await axios.post('/api/v1/auth/signup', { username, password });
//     navigate('/login');
//   } catch (error: any) {
//     console.error('Error during signup:', error);
//     // Extract backend message and throw so UI can catch
//     throw error.response?.data?.message || 'Signup failed';
//   }
// };


//   const signOut = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
