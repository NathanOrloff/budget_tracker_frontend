import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts';
import React from 'react'
import { TransactionOutput } from '../../../api/types';

export type YearlyBudgetProps = {
    transactions: TransactionOutput[]
}

export default function YearlyBudget({ transactions }: YearlyBudgetProps) {

    function dateToMonth(date: Date | string): string {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(parsedDate.getTime())) {
            console.error("Invalid date provided to dateToMonth:", date);
            return ""; 
        }

        return parsedDate.toLocaleString('en-US', { month: 'short' });
    }

    const spendingByMonth = transactions.reduce((map, current) => {
        const currentTotal = map.get(dateToMonth(current.date)) || 0;
        map.set(dateToMonth(current.date), currentTotal + current.amount);
        return map
    }, new Map());

    const spendingByMonthDataset: any = [];
    spendingByMonth.forEach((value, key) => {
        spendingByMonthDataset.push({
            month: key,
            total: value
        })
    })

    return (
        <Card variant="outlined" sx={{
            maxWidth: 1000,
            minWidth: 600,
            margin: 'auto',
            mt: 4
        }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1}
                sx={{ width: '100%', padding: 2 }}
                >
                <Box sx={{ flexGrow: 1 }}>
                    <LineChart
                    height={250}
                    dataset={spendingByMonthDataset}
                    series={[
                        {
                            dataKey: 'total',
                            label: 'Spending by month',
                            curve: 'natural',
                            showMark: true,
                            shape: 'circle',
                        },
                    ]}
                    xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
                    grid={{ vertical: true, horizontal: true }}
                    />
                </Box>
            </Stack>
        </Card>
    );
}
