import React from 'react'
import { TransactionOutput } from '../../../api/types'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { BarChart } from '@mui/x-charts/BarChart';

export type MonthlyBudgetProps = {
    transactions: TransactionOutput[]
}

export default function MonthlyBudget({ transactions }: MonthlyBudgetProps) {

    const accumulatedTransactions = transactions.reduce((map, current) => {
        const currentTotal = map.get(current.personal_finance_category) || 0;
        map.set(current.personal_finance_category, currentTotal + current.amount);
        return map;
    }, new Map());

    const categories = [...accumulatedTransactions.keys()];
    const totals = [...accumulatedTransactions.values()];

    return (
        <Card variant="outlined" sx={{
            maxWidth: 1000,
            minWidth: 600,
            margin: 'auto',
            mt: 4
        }}>
            <BarChart
                xAxis={[{
                    scaleType: 'band',
                    data: categories,
                    tickLabelInterval: () => true,
                    tickLabelStyle: {
                        angle: -45,
                        textAnchor: 'end',
                        fontSize: 12,
                    },
                    height: 100,
                }]}
                series={[{ data: totals, label: 'Spent' }]}
                height={350}
            />
        </Card>
    )
}