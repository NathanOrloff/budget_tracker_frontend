import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import MonthlyBudget from './Views/MonthlyBudget';
import YearlyBudget from './Views/YearlyBudget';
import TopPlacesSpentAt from './Views/TopPlacesSpentAt';
import { useListTransactionsQuery } from '../../api/apiQueries';
import { getErrorMessage } from '../utils/error';

export default function Body() {
  const d = new Date();
  d.setDate(d.getDate() - 90);
  const { data: thisMonthsTransacs, error, isLoading } = useListTransactionsQuery(d.toISOString().split('T')[0]);
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <Alert severity="error">
          {getErrorMessage(error)}
      </Alert>
    )
  }

  if (thisMonthsTransacs === null || thisMonthsTransacs === undefined) {
    return (
      <Alert severity="error">
          {"Data is undefined"}
      </Alert>
    )
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#F5F5F5" }}>
      <MonthlyBudget transactions={thisMonthsTransacs}/>
      <YearlyBudget transactions={thisMonthsTransacs}/>
      <TopPlacesSpentAt transactions={thisMonthsTransacs}/>
    </Box>
  )
}
