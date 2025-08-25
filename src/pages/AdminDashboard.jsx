// import React from 'react';
// import {
//   Grid,
//   Paper,
//   Typography,
//   Box,
// } from '@mui/material';
// import GroupIcon from '@mui/icons-material/Group';
// import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import { useNavigate } from 'react-router-dom'; // en haut du fichier


// const statCards = [
//   {
//     title: 'Enfants enregistrés',
//     value: 154,
//     icon: <GroupIcon fontSize="large" />,
//     color: '#4caf50',
//   },
//   {
//     title: 'Opérateurs actifs',
//     value: 8,
//     icon: <SupervisorAccountIcon fontSize="large" />,
//     color: '#1e88e5',
//   },
//   {
//     title: 'Jeux disponibles',
//     value: 12,
//     icon: <SportsEsportsIcon fontSize="large" />,
//     color: '#fbc02d',
//   },
//   {
//     title: 'Revenus totaux (FCFA)',
//     value: '245 500',
//     icon: <AttachMoneyIcon fontSize="large" />,
//     color: '#e53935',
//   },


// ];

// const StatCard = ({ title, value, icon, color }) => (
//   <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//     <Box display="flex" alignItems="center" gap={2}>
//       <Box
//         sx={{
//           backgroundColor: color,
//           color: 'white',
//           p: 1.5,
//           borderRadius: 2,
//           display: 'flex',
//         }}
//       >
//         {icon}
//       </Box>
//       <Box>
//         <Typography variant="subtitle2" color="textSecondary">
//           {title}
//         </Typography>
//         <Typography variant="h6" fontWeight="bold">
//           {value}
//         </Typography>
//       </Box>
//     </Box>
//   </Paper>
// );

// const AdminDashboard = () => {
//      const navigate = useNavigate(); // à l'intérieur de ton composant
//   return (
//     <Box p={4}>
//       <Typography variant="h5" fontWeight="bold" mb={3}>
//         🧑‍💼 Tableau de bord administrateur
//       </Typography>

//       <Grid container spacing={3}>
//         {statCards.map((card, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StatCard {...card} />
//           </Grid>



//         ))}
//       </Grid>



// <Typography variant="h6" fontWeight="bold" mt={5} mb={2}>
//   🚀 Actions rapides
// </Typography>

// <Grid container spacing={3}>
//   {[
//    {
//       title: '👤 Gérer les utilisateurs',
//       description: 'Créer, modifier ou supprimer des parents, enfants ou opérateurs.',
//       bg: '#e3f2fd',
//       onClick: () => navigate('/admin/users'), // 👈 ajoute cette propriété
//     },
//     {
//       title: '🎮 Gérer les jeux',
//       description: 'Ajouter, activer, désactiver ou éditer les attractions.',
//       bg: '#fff9c4',
//        onClick: () => navigate('/admin/games'), // 👈 Ajoute cette ligne
//     },
//     {
//     title: '🧒 Gérer les enfants',
//     description: 'Ajouter, modifier ou consulter les enfants enregistrés.',
//     bg: '#f1f8e9',
//     onClick: () => navigate('/admin/children'),
//   },
//     {
//       title: '💳 Transactions',
//       description: 'Consulter les paiements, recharges et leur historique.',
//       bg: '#fce4ec',
//     },
  


//     {
//   title: '🏪 Espaces de vente',
//   description: 'Créer et gérer les points de vente (resto, cafétéria, etc.)',
//   bg: '#f3e5f5',
//   onClick: () => navigate('/admin/espaces'),
// },
// {
//   title: '🍽️ Menus et tarifs',
//   description: 'Définir les plats, snacks et boissons proposés par chaque espace.',
//   bg: '#e8f5e9',
//   onClick: () => navigate('/admin/menus'),
// },


//   {
//       title: '🧾 Gestion des QR codes',
//       description: 'Réassigner, imprimer ou visualiser les QR codes liés aux enfants.',
//       bg: '#ede7f6',
//     },
//     {
//       title: '📊 Rapports & statistiques',
//       description: 'Visualiser les données financières et d’utilisation du parc.',
//       bg: '#e0f2f1',
//     },

//   ].map((card, index) => (
//     <Grid item xs={12} sm={6} md={4} key={index}>
//       <Paper
//         elevation={4}
//          onClick={card.onClick || (() => {})} // 👈 ajoute ceci
//         sx={{
//           height: 160,
//           p: 3,
//           borderRadius: 3,
//           cursor: 'pointer',
//           backgroundColor: card.bg,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           transition: '0.3s',
//           '&:hover': { transform: 'scale(1.03)' },
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold">
//           {card.title}
//         </Typography>
//         <Typography variant="body2" mt={1}>
//           {card.description}
//         </Typography>
//       </Paper>
//     </Grid>
//   ))}
// </Grid>


//     </Box>
//   );
// };

// export default AdminDashboard;




import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';

const brand = {
  green: '#11693A',
  greenDark: '#0D5330',
  blue: '#1e88e5',
  yellow: '#fbc02d',
  red: '#e53935',
  cream: '#F7F5F0',
};

const formatFCFA = (n) =>
  `${Number(n).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} F CFA`;

// ===================== STATS =====================
const statCards = [
  {
    title: 'Enfants enregistrés',
    value: 154,
    icon: <GroupIcon fontSize="large" />,
    from: '#34c759',
    to: '#0a7d39',
    delta: '+12%',
    positive: true,
  },
  {
    title: 'Opérateurs actifs',
    value: 8,
    icon: <SupervisorAccountIcon fontSize="large" />,
    from: '#42a5f5',
    to: '#1565c0',
    delta: '+1',
    positive: true,
  },
  {
    title: 'Jeux disponibles',
    value: 12,
    icon: <SportsEsportsIcon fontSize="large" />,
    from: '#ffd54f',
    to: '#f9a825',
    delta: '0',
    positive: true,
  },
  {
    title: 'Revenus totaux',
    value: formatFCFA(245500),
    icon: <AttachMoneyIcon fontSize="large" />,
    from: '#ff6b6b',
    to: '#d32f2f',
    delta: '-3%',
    positive: false,
  },
];

const StatCard = ({ title, value, icon, from, to, delta, positive }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 3,
      color: '#fff',
      background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      minHeight: 120,
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        right: -20,
        top: -20,
        width: 100,
        height: 100,
        borderRadius: '50%',
        bgcolor: '#ffffff22',
      }}
    />
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 2,
          bgcolor: '#ffffff2a',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight={900} lineHeight={1.2}>
          {value}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
          <Chip
            size="small"
            icon={positive ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
            label={delta}
            sx={{
              bgcolor: '#ffffff2a',
              color: '#fff',
              height: 22,
            }}
          />
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            par rapport à hier
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Paper>
);

// ===================== QUICK ACTIONS =====================
const quickActions = (navigate) => [
  {
    title: 'Gérer les utilisateurs',
    description: 'Créer, modifier ou supprimer des parents, enfants ou opérateurs.',
    icon: <PeopleAltRoundedIcon />,
    bg: '#e3f2fd',
    onClick: () => navigate('/admin/users'),
  },
  {
    title: 'Gérer les jeux',
    description: 'Ajouter, activer, désactiver ou éditer les attractions.',
    icon: <SportsEsportsIcon />,
    bg: '#fff9c4',
    onClick: () => navigate('/admin/games'),
  },
  {
    title: 'Gérer les enfants',
    description: 'Ajouter, modifier ou consulter les enfants enregistrés.',
    icon: <GroupIcon />,
    bg: '#f1f8e9',
    onClick: () => navigate('/admin/children'),
  },
  {
    title: 'Transactions',
    description: 'Consulter les paiements, recharges et historiques.',
    icon: <ReceiptLongRoundedIcon />,
    bg: '#fce4ec',
    onClick: () => navigate('/transactions'),
  },
  {
    title: 'Espaces de vente',
    description: 'Créer et gérer resto, cafétéria, etc.',
    icon: <StorefrontRoundedIcon />,
    bg: '#f3e5f5',
    onClick: () => navigate('/admin/espaces'),
  },
  {
    title: 'Menus & tarifs',
    description: 'Définir les plats, snacks et boissons par espace.',
    icon: <RestaurantMenuRoundedIcon />,
    bg: '#e8f5e9',
    onClick: () => navigate('/admin/menus'),
  },
  {
    title: 'QR codes',
    description: 'Réassigner, imprimer ou visualiser les QR liés aux enfants.',
    icon: <QrCode2RoundedIcon />,
    bg: '#ede7f6',
    onClick: () => navigate('/qrcodes'),
  },
  {
    title: 'Rapports & stats',
    description: 'Visualiser les données financières et d’utilisation.',
    icon: <AssessmentRoundedIcon />,
    bg: '#e0f2f1',
    onClick: () => navigate('/reports'),
  },
];

const ActionCard = ({ title, description, icon, bg, onClick }) => (
  <Paper
    elevation={0}
    onClick={onClick}
    sx={{
      height: 180,
      p: 2.5,
      borderRadius: 3,
      cursor: 'pointer',
      backgroundColor: bg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform .2s, box-shadow .2s',
      border: '1px solid #E8E8E8',
      '&:hover': { transform: 'translateY(-3px)', boxShadow: 4 },
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        right: -10,
        top: -10,
        width: 88,
        height: 88,
        borderRadius: '50%',
        bgcolor: '#00000008',
      }}
    />
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: 2,
          bgcolor: '#0000000a',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" fontWeight={800}>
        {title}
      </Typography>
    </Stack>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
        {description}
      </Typography>
      <IconButton color="primary" sx={{ ml: 1 }}>
        <ArrowForwardRoundedIcon />
      </IconButton>
    </Stack>
  </Paper>
);

// ===================== PAGE =====================
const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: brand.cream, minHeight: '100vh' }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={1.5}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h5" fontWeight={900}>
            🧑‍💼 Tableau de bord administrateur
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vue d’ensemble du parc — aujourd’hui
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Voir les rapports">
            <Button
              variant="outlined"
              startIcon={<AssessmentRoundedIcon />}
              onClick={() => navigate('/reports')}
              sx={{ textTransform: 'none' }}
            >
              Rapports
            </Button>
          </Tooltip>
          <Tooltip title="Toutes les transactions">
            <Button
              variant="contained"
              startIcon={<ReceiptLongRoundedIcon />}
              onClick={() => navigate('/transactions')}
              sx={{ textTransform: 'none', bgcolor: brand.green, '&:hover': { bgcolor: brand.greenDark } }}
            >
              Transactions
            </Button>
          </Tooltip>
        </Stack>
      </Stack>

      {/* Stats */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {statCards.map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Divider sx={{ my: 2 }} />

<Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
  🚀 Actions rapides
</Typography>

<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, // ✅ 3 cartes par ligne dès sm
    gap: 2.5,
  }}
>
  {quickActions(navigate).map((card, i) => (
    <ActionCard key={i} {...card} />
  ))}
</Box>


    </Box>
  );
};

export default AdminDashboard;
