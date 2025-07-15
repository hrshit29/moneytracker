import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import { useTheme } from '../context/ThemeContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseItem from '../components/ExpenseItem';

const Container = styled.div<{ themeMode: string }>`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: ${({ themeMode }) =>
    themeMode === 'dark'
      ? 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)'
      : 'linear-gradient(to bottom, #f8fafc, #f1f5f9, #fff)'};
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e2e8f0' : '#1e293b')};
  transition: background 0.3s ease, color 0.3s ease;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
`;

const Card = styled.div<{ themeMode: string }>`
  background: ${({ themeMode }) =>
    themeMode === 'dark' ? 'var(--glass-bg)' : 'var(--color-bg-alt)'};
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 6px 18px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px var(--shadow-color);
  }
`;

const TotalValue = styled.span`
  color: var(--color-green);
  font-size: 2rem;
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

export default function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
  const { theme } = useTheme();

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <Container themeMode={theme}>
      <Wrapper>
        <Header>Expenses</Header>

        <Card themeMode={theme} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Total Expense:</h2>
          <TotalValue>₹{totalExpenses()}</TotalValue>
        </Card>

        <Flex>
          <FormWrapper themeMode={theme}>
            <ExpenseForm />
          </FormWrapper>

          <ListWrapper>
            {expenses.length === 0 ? (
              <EmptyState themeMode={theme}>No expenses added yet.</EmptyState>
            ) : (
              expenses.map((expense) => (
                <Card key={expense._id} themeMode={theme}>
                  <ExpenseItem
                    id={expense._id}
                    title={expense.title}
                    description={expense.description}
                    amount={expense.amount}
                    date={expense.date}
                    category={expense.category}
                    deleteItem={deleteExpense}
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
