import React, { useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
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

const ToggleIcon = styled.div`
  cursor: pointer;
  color: var(--primary-color3);
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color2);
  }
`;

const ErrorText = styled.p`
  color: var(--color-delete);
  text-align: center;
  font-size: 0.9rem;
`;

const LoginButton = styled.button`
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

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err: any) {
      if (typeof err === 'string' && err.includes('Incorrect password')) {
        setError('Incorrect password');
      } else if (typeof err === 'string' && err.includes('User not found')) {
        setError('User not found');
      } else {
        setError('Invalid username or password');
      }
    }
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <Subtitle>Welcome back! Log in to continue.</Subtitle>
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </ToggleIcon>
          </StyledInputWrapper>

          <LoginButton type="submit">Login</LoginButton>
        </form>

        <BottomText>
          New here? <Link to="/signup">Create an Account</Link>
        </BottomText>
      </Card>
    </Container>
  );
};

export default Login;



// import React, { useState, type FormEvent } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { Link } from 'react-router-dom';
// import { AiFillEye, AiFillEyeInvisible } from '../help/icons';
// import styled from 'styled-components';

// const Container = styled.div`
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: var(--color-bg);
//   padding: 2rem;
//   transition: background 0.3s ease;
// `;

// const Card = styled.div`
//   background: var(--glass-bg);
//   backdrop-filter: blur(12px);
//   border: 1px solid var(--border-color);
//   border-radius: 24px;
//   box-shadow: 0 8px 24px var(--shadow-color);
//   padding: 3rem 2rem;
//   max-width: 400px;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   transition: background 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 30px var(--shadow-color);
//   }
// `;

// const Title = styled.h2`
//   text-align: center;
//   color: var(--primary-color);
//   font-size: 1.8rem;
// `;

// const Subtitle = styled.p`
//   text-align: center;
//   color: var(--primary-color2);
//   font-size: 0.95rem;
// `;

// const StyledInputWrapper = styled.div`
//   background: var(--color-bg-alt);
//   border: 1px solid var(--border-color);
//   border-radius: 12px;
//   padding: 0.8rem 1rem;
//   display: flex;
//   align-items: center;
//   transition: box-shadow 0.3s ease, border 0.3s ease;

//   &:focus-within {
//     border-color: var(--color-accent);
//     box-shadow: 0 0 0 3px rgba(245, 102, 146, 0.3);
//   }
// `;

// const StyledInput = styled.input`
//   background: transparent;
//   border: none;
//   outline: none;
//   width: 100%;
//   color: var(--primary-color2);
//   font-size: 1rem;

//   &::placeholder {
//     color: var(--primary-color3);
//   }
// `;

// const ToggleIcon = styled.div`
//   cursor: pointer;
//   color: var(--primary-color3);
//   transition: color 0.3s ease;

//   &:hover {
//     color: var(--primary-color2);
//   }
// `;

// const ErrorText = styled.p`
//   color: var(--color-delete);
//   text-align: center;
//   font-size: 0.9rem;
// `;

// const LoginButton = styled.div`
//   background: var(--color-accent);
//   color: #fff;
//   text-align: center;
//   padding: 0.8rem;
//   border-radius: 12px;
//   font-weight: 600;
//   cursor: pointer;
//   box-shadow: 0 4px 12px var(--shadow-color);
//   transition: background 0.3s ease, transform 0.2s ease;

//   &:hover {
//     background: #e25582;
//   }

//   &:active {
//     transform: scale(0.97);
//   }
// `;

// const BottomText = styled.p`
//   text-align: center;
//   color: var(--primary-color3);
//   font-size: 0.8rem;

//   a {
//     color: var(--color-accent);
//     text-decoration: none;
//     transition: color 0.3s ease;

//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   const { login } = useAuth();

//   const handleSubmit = async (e?: FormEvent) => {
//     if (e) e.preventDefault();
//     try {
//       await login(username, password);
//     } catch (err: any) {
//       if (typeof err === 'string' && err.includes('Incorrect password')) {
//         setError('Incorrect password');
//       } else if (typeof err === 'string' && err.includes('User not found')) {
//         setError('User not found');
//       } else {
//         setError('Invalid username or password');
//       }
//     }
//   };

//   return (
//     <Container>
//       <Card>
//         <Title>Login</Title>
//         <Subtitle>Welcome back! Log in to continue.</Subtitle>

//         {error && <ErrorText>{error}</ErrorText>}

//         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           <StyledInputWrapper>
//             <StyledInput
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </StyledInputWrapper>

//           <StyledInputWrapper>
//             <StyledInput
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
//             </ToggleIcon>
//           </StyledInputWrapper>

//           <LoginButton onClick={handleSubmit}>Login</LoginButton>
//         </form>

//         <BottomText>
//           New here?{' '}
//           <Link to="/signup">
//             Create an Account
//           </Link>
//         </BottomText>
//       </Card>
//     </Container>
//   );
// }

// export default Login;
