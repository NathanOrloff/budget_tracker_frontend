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

    const monthOrder: Record<string, number> = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3,
        May: 4, Jun: 5, Jul: 6, Aug: 7,
        Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    const sortedTotals = Object.entries(totals).sort(([keyA], [keyB]) => monthOrder[keyA] - monthOrder[keyB]);

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
                            curve: 'linear',
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
