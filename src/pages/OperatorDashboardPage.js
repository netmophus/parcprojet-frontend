import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OperatorDashboardPage = () => {
  const navigate = useNavigate();

  const handleScan = () => {
    navigate('/operator/play');
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>👷 Tableau de bord Opérateur</Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" mb={2}>🎯 Actions disponibles :</Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleScan}
          sx={{ mb: 2 }}
        >
          🎮 Scanner un enfant pour jouer
        </Button>

        {/* Tu peux ajouter d'autres actions ici si besoin */}

        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          🔓 Déconnexion
        </Button>
      </Paper>
    </Box>
  );
};

export default OperatorDashboardPage;
