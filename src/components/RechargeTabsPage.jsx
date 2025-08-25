import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import CardListTable from './CardListTable';
import ClientRechargeTable from './ClientRechargeTable';

const RechargeTabsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="💳 Cartes Enfants" />
        <Tab label="🧑‍💼 Cartes Clients" />
      </Tabs>

      <Box hidden={tabIndex !== 0}>
        <CardListTable />
      </Box>

      <Box hidden={tabIndex !== 1}>
        <ClientRechargeTable />
      </Box>
    </Paper>
  );
};

export default RechargeTabsPage;

