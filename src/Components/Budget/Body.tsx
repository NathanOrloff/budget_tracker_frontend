import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import React from 'react'

export default function Body() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#F5F5F5" }}>
        <Card variant="outlined" sx={{
            maxWidth: 1000,
            minWidth: 600,
            margin: 'auto',
            mt: 4
        }}>
            
        </Card>
    </Box>
  )
}
