import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts';
import React from 'react'
import { TransactionOutput } from '../../../api/types';

export type TopPlacesSpentAtProps = {
    transactions: TransactionOutput[]
}

export default function TopPlacesSpentAt({ transactions }: TopPlacesSpentAtProps) {

    const accumulatedTransactions = transactions.reduce((map, current) => {
        const currentTotal = map.get(current.merchant_name) || 0;
        map.set(current.merchant_name, currentTotal + current.amount);
        return map;
    }, new Map());

    const topFiveMerchants = [...accumulatedTransactions.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const colors = [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#FFFF00'
    ];

    const merchant_data: any = [];
    topFiveMerchants.forEach((merchant, i) => {
        merchant_data.push({
            label: merchant[0],
            value: merchant[1],
            color: colors[i]
        })
    })

    const settings = {
        margin: { right: 5 },
        width: 350,
        height: 350,
        hideLegend: true,
    };

    return (
        <Card variant="outlined" sx={{
            maxWidth: 400,
            margin: 'auto',
            mt: 4
        }}>
            <PieChart
                series={[{ innerRadius: 100, outerRadius: 150, data: merchant_data, arcLabel: 'value' }]}
                {...settings}
            />
        </Card>
    )
}
