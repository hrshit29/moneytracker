import styled from 'styled-components';

export const MainLayout = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  gap: 2rem;
  background: var(--glass-bg);                    /* glass color from theme */
  border-radius: 32px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px var(--shadow-color);     /* shadow color from theme */
  overflow: hidden;
  transition: background 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
  }
`;

export const InnerLayout = styled.div`
  padding: 2rem 1.5rem;
  width: 100%;
  background: var(--color-bg-alt);                /* subtle semi-transparent bg */
  border-radius: 24px;
  box-shadow: 0 4px 16px var(--shadow-color);
  transition: box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease;

  &:hover {
    box-shadow: 0 8px 28px var(--shadow-color);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;
