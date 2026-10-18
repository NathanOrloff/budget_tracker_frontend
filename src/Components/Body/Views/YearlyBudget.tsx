import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts';
import { useGetMonthlyTransactionTotalsQuery } from '../../../api/apiQueries';

export default function YearlyBudget() {

    const { data, error, isLoading } = useGetMonthlyTransactionTotalsQuery();
    if (isLoading || !data) {
        return <div>Loading...</div>
    }

    const totals = data.data;

    const sortedTotals = Object.entries(totals).sort(([keyA], [keyB]) => {
        const dateA = new Date(keyA);
        const dateB = new Date(keyB);
        
        return dateA.getTime() - dateB.getTime(); 
    });

    const spendingByMonthDataset: any = [];
    sortedTotals.forEach((value, _) => {
        spendingByMonthDataset.push({
            month: value[0],
            total: value[1]
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
