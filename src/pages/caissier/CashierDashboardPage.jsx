// import React, { useState } from 'react';
// import { Box, Tabs, Tab, Typography } from '@mui/material';

// import CreateClientForm from '../../components/caissier/CreateClientForm';
// import CreateParentChildForm from '../../components/caissier/CreateParentChildForm';

// import RechargeCardForm from '../../components/caissier/RechargeCardForm';
// import CardListTable from '../../components/RechargeTabsPage';

// const CashierDashboardPage = () => {
//   const [tab, setTab] = useState(0);

//   const handleChange = (e, newValue) => setTab(newValue);

//   return (
//     <Box p={4}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         🧾 Tableau de bord Caissier
//       </Typography>

//       <Tabs value={tab} onChange={handleChange} sx={{ mb: 3 }}>
//         <Tab label="Créer un client" />
//         <Tab label="Parent & Enfant" />
       
//         <Tab label="Recharger une carte" />
//         <Tab label="Cartes et soldes" />
//       </Tabs>

//       {tab === 0 && <CreateClientForm />}
//       {tab === 1 && <CreateParentChildForm />}
     
//       {tab === 2 && <RechargeCardForm />}
//       {tab === 3 && <CardListTable />}
//     </Box>
//   );
// };

// export default CashierDashboardPage;




import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Stack,
  Chip,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icônes onglets
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';

// Tes composants
import CreateClientForm from '../../components/caissier/CreateClientForm';
import CreateParentChildForm from '../../components/caissier/CreateParentChildForm';
import RechargeCardForm from '../../components/caissier/RechargeCardForm';
import CardListTable from '../../components/RechargeTabsPage';

const brand = {
  green: '#11693A',
  greenDark: '#0D5330',
  orange: '#F26B21',
  cream: '#F7F5F0',
};

function TabLabel({ icon, text }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon}
      <Typography sx={{ textTransform: 'none', fontWeight: 700 }}>{text}</Typography>
    </Stack>
  );
}

const TabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`tab-${index}`}>
      {value === index && (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            border: '1px solid #EAEAEA',
            bgcolor: '#fff',
          }}
        >
          {children}
        </Paper>
      )}
    </div>
  );
};

const CashierDashboardPage = () => {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_e, newValue) => setTab(newValue);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: brand.cream, minHeight: '100vh' }}>
      {/* En-tête dégradé */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          mb: 3,
          color: '#fff',
          background: `linear-gradient(135deg, ${brand.green} 0%, ${brand.greenDark} 100%)`,
          border: '1px solid #0e442a',
        }}
      >
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            spacing={1}
          >
            <Box>
              <Typography variant="h5" fontWeight={900}>
                🧾 Tableau de bord Caissier
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Créez des clients, liez des cartes et rechargez en un clin d’œil.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip label="Caisse ouverte" size="small" sx={{ bgcolor: '#ffffff2a', color: '#fff' }} />
              <Chip label="Session #A12" size="small" sx={{ bgcolor: '#ffffff2a', color: '#fff' }} />
            </Stack>
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,.22)' }} />
        {/* Onglets */}
        <Box sx={{ px: { xs: 1, md: 2 }, bgcolor: 'transparent' }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={isMobile ? 'auto' : false}
            allowScrollButtonsMobile
            TabIndicatorProps={{ sx: { height: 3, bgcolor: brand.orange } }}
            sx={{
              minHeight: 0,
              '& .MuiTab-root': {
                minHeight: 0,
                py: 1.25,
                px: { xs: 1.25, md: 2 },
                mx: 0.5,
                bgcolor: 'rgba(255,255,255,0.06)',
                color: '#fff',
                borderRadius: 999,
                textTransform: 'none',
              },
              '& .Mui-selected': {
                bgcolor: '#fff',
                color: brand.greenDark + ' !important',
                boxShadow: '0 6px 16px rgba(0,0,0,.12)',
              },
            }}
          >
            <Tab
              id="tab-0"
              iconPosition="start"
              icon={<PersonAddAlt1RoundedIcon />}
              label={<TabLabel icon={<></>} text="Créer un client" />}
            />
            <Tab
              id="tab-1"
              iconPosition="start"
              icon={<FamilyRestroomRoundedIcon />}
              label={<TabLabel icon={<></>} text="Parent & Enfant" />}
            />
            <Tab
              id="tab-2"
              iconPosition="start"
              icon={<AddCardRoundedIcon />}
              label={<TabLabel icon={<></>} text="Recharger une carte" />}
            />
            <Tab
              id="tab-3"
              iconPosition="start"
              icon={<CreditCardRoundedIcon />}
              label={<TabLabel icon={<></>} text="Cartes & soldes" />}
            />
          </Tabs>
        </Box>
      </Paper>

      {/* Contenu des onglets */}
      <TabPanel value={tab} index={0}>
        <CreateClientForm />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <CreateParentChildForm />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <RechargeCardForm />
      </TabPanel>

      <TabPanel value={tab} index={3}>
        <CardListTable />
      </TabPanel>
    </Box>
  );
};

export default CashierDashboardPage;
