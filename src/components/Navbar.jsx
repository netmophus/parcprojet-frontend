


import React, { useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Tooltip, Chip, Stack
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const brand = {
  green: '#11693A',
  greenDark: '#0D5330',
  orange: '#F26B21',
};

const roleHome = {
  admin: '/admin-dashboard',
  parent: '/parent-dashboard',
  operator: '/operator/play',
  caissier: '/caissier/dashboard',
  agent: '/agent-dashboard',
};

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: `linear-gradient(90deg, ${brand.green} 0%, ${brand.greenDark} 100%)`,
        borderBottom: '1px solid #0b3c24',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {/* Logo + Nom */}
        <Stack
          direction="row"
          alignItems="center"
          component={Link}
          to="/"
          sx={{ color: 'inherit', textDecoration: 'none', flexGrow: { xs: 1, md: 0 } }}
        >
          <LocalActivityRoundedIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 0.3 }}>
            Parc Salma
          </Typography>
        </Stack>

        {/* Liens rapides (desktop) */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ ml: { md: 3 }, display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}
        >
          {/* <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<HomeRoundedIcon />}
            sx={{ textTransform: 'none', opacity: pathname === '/' ? 1 : 0.9 }}
          >
            Accueil
          </Button> */}
          {/* <Button
            component={Link}
            to="/#actions"
            color="inherit"
            sx={{ textTransform: 'none', opacity: 0.9 }}
          >
            Actions
          </Button>
          <Button
            component={Link}
            to="/#categories"
            color="inherit"
            sx={{ textTransform: 'none', opacity: 0.9 }}
          >
            Catégories
          </Button>
          <Button
            component={Link}
            to="/#offres"
            color="inherit"
            sx={{ textTransform: 'none', opacity: 0.9 }}
          >
            Offres
          </Button> */}
        </Stack>

        {/* À droite */}
        {!user ? (
          // Non connecté : icônes + libellés (mobile: icônes seuls)
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Se connecter">
              <IconButton
                color="inherit"
                component={Link}
                to="/login"
                sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
              >
                <LoginRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="S'inscrire">
              <IconButton
                color="inherit"
                component={Link}
                to="/register"
                sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
              >
                <PersonAddAltRoundedIcon />
              </IconButton>
            </Tooltip>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                startIcon={<LoginRoundedIcon />}
                sx={{ textTransform: 'none' }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                startIcon={<PersonAddAltRoundedIcon />}
                sx={{ textTransform: 'none' }}
              >
                Register
              </Button>
            </Box>
          </Stack>
        ) : (
          // Connecté : rôle + Dashboard + Logout
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<AccountCircleRoundedIcon />}
              label={user.role}
              size="small"
              sx={{
                bgcolor: '#ffffff1a',
                color: 'white',
                textTransform: 'capitalize',
              }}
            />
            <Tooltip title="Tableau de bord">
              <IconButton
                color="inherit"
                component={Link}
                to={roleHome[user.role] || '/'}
                sx={{ mr: { xs: 0, sm: 0.5 } }}
              >
                <DashboardRoundedIcon />
              </IconButton>
            </Tooltip>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutRoundedIcon />}
              sx={{ textTransform: 'none', display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Déconnexion
            </Button>
            <Tooltip title="Déconnexion">
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
              >
                <LogoutRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
