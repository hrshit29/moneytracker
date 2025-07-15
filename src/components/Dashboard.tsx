import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import { useTheme } from '../context/ThemeContext';
import History from './History';
import Chart from './chart';
import { dollar } from '../help/icons';

const getThemeColors = (theme: 'light' | 'dark') => ({
  background: theme === 'dark' ? '#000' : '#fff',
  accent: '#ec4899',
  primary: theme === 'dark' ? '#f9fafb' : '#111827',
  secondary: theme === 'dark' ? '#cbd5e1' : '#475569',
  card: theme === 'dark' ? '#1e1e1e' : '#ffe4ec',
  border: theme === 'dark' ? '#333' : '#fbcfe8',
  shadow: 'rgba(236, 72, 153, 0.3)',
  green: '#4ade80',
  red: '#f87171',
  glass: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
});

const Dashboard: React.FC = () => {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const Container = styled.div`
    width: 100%;
    padding: 1rem;
    max-width: 1280px;
    margin: 0 auto;
    color: ${colors.secondary};
  `;

  const Title = styled.h1`
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin: 1rem 0 2rem;
    color: ${colors.accent};
  `;

  const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 2rem;
    }
  `;

  const ChartWrapper = styled.div`
    background: ${colors.glass};
    backdrop-filter: blur(10px);
    border: 1px solid ${colors.border};
    border-radius: 20px;
    padding: 1rem;
    box-shadow: 0 6px 16px ${colors.shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px ${colors.shadow};
    }
  `;

  const SummaryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  `;

  const Card = styled.div`
    background: ${colors.card};
    border: 1px solid ${colors.border};
    border-radius: 14px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 4px 14px ${colors.shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px ${colors.shadow};
    }
  `;

  const CardTitle = styled.h2`
    font-size: 1rem;
    margin-bottom: 0.4rem;
    color: ${colors.primary};
  `;

  const CardValue = styled.p`
    font-size: 1.4rem;
    font-weight: 600;
  `;

  const HighlightGreen = styled.span`
    color: ${colors.green};
  `;

  const HighlightRed = styled.span`
    color: ${colors.red};
  `;

  const HistorySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `;

  const MinMaxWrapper = styled.div`
    background: ${colors.card};
    border: 1px solid ${colors.border};
    border-radius: 14px;
    padding: 0.7rem 1rem;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    box-shadow: 0 4px 12px ${colors.shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px ${colors.shadow};
    }
  `;

  const MinMaxTitle = styled.h2`
    font-size: 0.95rem;
    font-weight: 600;
    color: ${colors.primary};
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.4rem;

    span {
      font-size: 1.05rem;
    }
  `;

  return (
    <Container>
      <Title>All Transactions</Title>
      <Grid>
        <div>
          <ChartWrapper>
            <Chart />
          </ChartWrapper>

          <SummaryGrid>
            <Card>
              <CardTitle>Total Income</CardTitle>
              <CardValue>
                <HighlightGreen>{dollar} {totalIncome()}</HighlightGreen>
              </CardValue>
            </Card>
            <Card>
              <CardTitle>Total Expense</CardTitle>
              <CardValue>
                <HighlightRed>{dollar} {totalExpenses()}</HighlightRed>
              </CardValue>
            </Card>
            <Card style={{ gridColumn: 'span 2' }}>
              <CardTitle>Total Balance</CardTitle>
              <CardValue>
                <HighlightGreen>{dollar} {totalBalance()}</HighlightGreen>
              </CardValue>
            </Card>
          </SummaryGrid>
        </div>

        <HistorySection>
          <History />

          <div>
            <MinMaxTitle>
              Min <span><HighlightGreen>Income</HighlightGreen></span> Max
            </MinMaxTitle>
            <MinMaxWrapper>
              <p>₹{Math.min(...incomes.map(item => item.amount)) || 0}</p>
              <p>₹{Math.max(...incomes.map(item => item.amount)) || 0}</p>
            </MinMaxWrapper>
          </div>

          <div>
            <MinMaxTitle>
              Min <span><HighlightRed>Expense</HighlightRed></span> Max
            </MinMaxTitle>
            <MinMaxWrapper>
              <p>₹{Math.min(...expenses.map(item => item.amount)) || 0}</p>
              <p>₹{Math.max(...expenses.map(item => item.amount)) || 0}</p>
            </MinMaxWrapper>
          </div>
        </HistorySection>
      </Grid>
    </Container>
  );
};

export default Dashboard;










// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../context/GlobalContext';
// import History from './History';
// import Chart from './chart';
// import { dollar } from '../help/icons';

// const Container = styled.div`
//   width: 100%;
//   padding: 1rem;
//   max-width: 1280px;
//   margin: 0 auto;
//   color: var(--primary-color2);
// `;

// const Title = styled.h1`
//   text-align: center;
//   font-size: 2rem;
//   font-weight: 700;
//   margin: 1rem 0 2rem;
//   color: var(--color-accent);
// `;

// const Grid = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;

//   @media (min-width: 1024px) {
//     display: grid;
//     grid-template-columns: 3fr 2fr;
//     gap: 2rem;
//   }
// `;

// const ChartWrapper = styled.div`
//   background: var(--glass-bg);
//   backdrop-filter: blur(10px);
//   border: 1px solid var(--border-color);
//   border-radius: 20px;
//   padding: 1rem;
//   box-shadow: 0 6px 16px var(--shadow-color);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 24px var(--shadow-color);
//   }
// `;

// const SummaryGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
//   gap: 1rem;
//   margin-top: 1rem;
// `;

// const Card = styled.div`
//   background: var(--color-bg-alt);
//   border: 1px solid var(--border-color);
//   border-radius: 14px;
//   padding: 1rem;
//   text-align: center;
//   box-shadow: 0 4px 14px var(--shadow-color);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 20px var(--shadow-color);
//   }
// `;

// const CardTitle = styled.h2`
//   font-size: 1rem;
//   margin-bottom: 0.4rem;
//   color: var(--primary-color);
// `;

// const CardValue = styled.p`
//   font-size: 1.4rem;
//   font-weight: 600;
// `;

// const HighlightGreen = styled.span`
//   color: var(--color-green);
// `;

// const HighlightRed = styled.span`
//   color: var(--color-delete);
// `;

// const HistorySection = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.2rem;
// `;

// const MinMaxWrapper = styled.div`
//   background: var(--color-bg-alt);
//   border: 1px solid var(--border-color);
//   border-radius: 14px;
//   padding: 0.7rem 1rem;
//   display: flex;
//   justify-content: space-between;
//   font-weight: 500;
//   box-shadow: 0 4px 12px var(--shadow-color);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 20px var(--shadow-color);
//   }
// `;

// const MinMaxTitle = styled.h2`
//   font-size: 0.95rem;
//   font-weight: 600;
//   color: var(--primary-color);
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 0.4rem;

//   span {
//     font-size: 1.05rem;
//   }
// `;

// const Dashboard: React.FC = () => {
//   const {
//     totalExpenses,
//     incomes,
//     expenses,
//     totalIncome,
//     totalBalance,
//     getIncomes,
//     getExpenses,
//   } = useGlobalContext();

//   useEffect(() => {
//     getIncomes();
//     getExpenses();
//   }, []);

//   return (
//     <Container>
//       <Title>All Transactions</Title>
//       <Grid>
//         <div>
//           <ChartWrapper>
//             <Chart />
//           </ChartWrapper>

//           <SummaryGrid>
//             <Card>
//               <CardTitle>Total Income</CardTitle>
//               <CardValue>
//                 <HighlightGreen>{dollar} {totalIncome()}</HighlightGreen>
//               </CardValue>
//             </Card>
//             <Card>
//               <CardTitle>Total Expense</CardTitle>
//               <CardValue>
//                 <HighlightRed>{dollar} {totalExpenses()}</HighlightRed>
//               </CardValue>
//             </Card>
//             <Card style={{ gridColumn: 'span 2' }}>
//               <CardTitle>Total Balance</CardTitle>
//               <CardValue>
//                 <HighlightGreen>{dollar} {totalBalance()}</HighlightGreen>
//               </CardValue>
//             </Card>
//           </SummaryGrid>
//         </div>

//         <HistorySection>
//           <History />

//           <div>
//             <MinMaxTitle>
//               Min <span><HighlightGreen>Income</HighlightGreen></span> Max
//             </MinMaxTitle>
//             <MinMaxWrapper>
//               <p>₹{Math.min(...incomes.map(item => item.amount)) || 0}</p>
//               <p>₹{Math.max(...incomes.map(item => item.amount)) || 0}</p>
//             </MinMaxWrapper>
//           </div>

//           <div>
//             <MinMaxTitle>
//               Min <span><HighlightRed>Expense</HighlightRed></span> Max
//             </MinMaxTitle>
//             <MinMaxWrapper>
//               <p>₹{Math.min(...expenses.map(item => item.amount)) || 0}</p>
//               <p>₹{Math.max(...expenses.map(item => item.amount)) || 0}</p>
//             </MinMaxWrapper>
//           </div>
//         </HistorySection>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;
