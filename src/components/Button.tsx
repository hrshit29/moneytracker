import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';  // adjust the import path if needed

interface ButtonProps {
  name: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  color?: string;
  bg?: string;
  bPad?: string;         // optional custom padding
  bRad?: string;         // optional custom border radius
}

const StyledButton = styled.button<{
  themeMode: 'light' | 'dark';
  bPad?: string;
  bRad?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  background-color: ${({ themeMode }) =>
    themeMode === 'light' ? '#ec4899' : '#ec4899'};  /* pink accent in both themes */
  color: #fff;
  padding: ${(props) => props.bPad || '0.6em 1.2em'};
  border-radius: ${(props) => props.bRad || '9999px'};
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px
    ${({ themeMode }) =>
      themeMode === 'light'
        ? 'rgba(236, 72, 153, 0.4)' // soft pink shadow
        : 'rgba(236, 72, 153, 0.4)'};
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ themeMode }) =>
      themeMode === 'light' ? '#e25582' : '#e25582'};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px
      ${({ themeMode }) =>
        themeMode === 'light'
          ? 'rgba(236, 72, 153, 0.5)'
          : 'rgba(236, 72, 153, 0.5)'};
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 6px
      ${({ themeMode }) =>
        themeMode === 'light'
          ? 'rgba(236, 72, 153, 0.3)'
          : 'rgba(236, 72, 153, 0.3)'};
  }
`;

export const Button: React.FC<ButtonProps> = ({
  name,
  icon,
  onClick,
  bPad,
  bRad,
}) => {
  const { theme } = useTheme();

  return (
    <StyledButton
      onClick={onClick}
      bPad={bPad}
      bRad={bRad}
      themeMode={theme}
    >
      {icon && <span>{icon}</span>}
      <span>{name}</span>
    </StyledButton>
  );
};
