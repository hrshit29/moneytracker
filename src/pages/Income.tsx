import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import { useTheme } from '../context/ThemeContext';
import IncomeForm from '../components/IncomeForm';
import IncomeItem from '../components/IncomeItem';

const Container = styled.div<{ themeMode: string }>`
  width: 100%;
  min-height: 100vh;
  background: ${({ themeMode }) =>
    themeMode === 'dark'
      ? 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)'
      : 'linear-gradient(to bottom, #f8fafc, #f1f5f9, #fff)'};
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e2e8f0' : '#1e293b')};
  transition: background 0.3s ease, color 0.3s ease;
  box-sizing: border-box;
  overflow-x: hidden;

  * {
    box-sizing: border-box;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
`;

const Card = styled.div<{ themeMode: string }>`
  background: ${({ themeMode }) =>
    themeMode === 'dark' ? 'var(--glass-bg)' : 'var(--color-bg-alt)'};
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 6px 18px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px var(--shadow-color);
  }
`;

const TotalValue = styled.span`
  color: var(--color-green);
  font-size: 1.8rem;
  font-weight: 700;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const FormWrapper = styled(Card)`
  flex: 1;
`;

const ListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled(Card)<{ themeMode: string }>`
  text-align: center;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#94a3b8' : '#64748b')};
`;

export default function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
  const { theme } = useTheme();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <Container themeMode={theme}>
      <Wrapper>
        <Header>Incomes</Header>

        <Card themeMode={theme} style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 500 }}>Total Income:</h2>
          <TotalValue>₹{totalIncome()}</TotalValue>
        </Card>

        <Flex>
          <FormWrapper themeMode={theme}>
            <IncomeForm />
          </FormWrapper>

          <ListWrapper>
            {incomes.length === 0 ? (
              <EmptyState themeMode={theme}>No incomes added yet.</EmptyState>
            ) : (
              incomes.map((income) => (
                <Card key={income._id} themeMode={theme}>
                  <IncomeItem
                    id={income._id}
                    title={income.title}
                    description={income.description}
                    amount={income.amount}
                    date={income.date}
                    category={income.category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteIncome}
                  />
                </Card>
              ))
            )}
          </ListWrapper>
        </Flex>
      </Wrapper>
    </Container>
  );
}
