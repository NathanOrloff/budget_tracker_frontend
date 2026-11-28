import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper';
import React from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import { PERSONAL_FINANCE_CATEGORIES } from '../Utils/constants'

type BudgetItem = {
  category: string,
  amount: number
}

export default function Body() {
  const [category, setCategory] = React.useState('');
  const [amount, setAmount] = React.useState<number>(0);
  const [budget, setBudget] = React.useState<BudgetItem[]>([]);

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value as string);
  };

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value as number);
  }

  const handleAddClick = (event: any) => {
    if (category === '') return;
    setBudget([...budget, { category: category, amount: 0 }]);
    setCategory('');
    setAmount(0);
  }

  const handleRemoveClick = (indexToRemove: number) => {
    setBudget((prevRows) => prevRows.filter((_, idx) => idx !== indexToRemove));
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#F5F5F5" }}>
        <Card variant="outlined" sx={{
            maxWidth: 1000,
            minWidth: 600,
            margin: 'auto',
            mt: 4,
            p: 2,
        }}>
          <Stack spacing={4} useFlexGap>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel id="category-input">Category</InputLabel>
                <Select
                  labelId="category-input"
                  id="category-input"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  {PERSONAL_FINANCE_CATEGORIES.map((row, index) => (
                    <MenuItem value={index}>{row}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="amount-input"
                label="Amount"
                variant="outlined"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  },
                  htmlInput: {
                    step: '0.01',
                    min: 0,
                  },
                }}
              />

              <Button variant="contained" onClick={handleAddClick}>Add</Button>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell align="right">Amount</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {budget.map((row, index) => (
                    <StyledTableRow
                      key={row.category}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.category}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.amount}</StyledTableCell>
                      <StyledTableCell align="right"><Button onClick={() => handleRemoveClick(index)} variant="contained" color='error' sx={{ width: 30 }}>X</Button></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" sx={{ width: 250 }} >Submit</Button>
            </Box>
          </Stack>
        </Card>
    </Box>
  )
}
