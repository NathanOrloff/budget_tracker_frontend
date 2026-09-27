import Box from '@mui/material/Box';
import { useListTransactions } from './hooks/ListTransactions';
import Alert from '@mui/material/Alert';

export default function Body() {
  const { data, error, isLoading } = useListTransactions(30);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <Alert severity="error">
          {error}
      </Alert>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {JSON.stringify(data)}
    </Box>
  )
}
