import React from 'react';
import {
  Box, Typography, Container, Grid, Stack, IconButton, Divider, Link as MuiLink
} from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';

const brand = { green: '#11693A', greenDark: '#0D5330', orange: '#F26B21' };

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        pt: 4,
        pb: 2,
        color: 'white',
        background: `linear-gradient(180deg, ${brand.greenDark} 0%, ${brand.green} 100%)`,
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={800}>
              Parc Salma
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Loisirs • Culture • Saveurs. Paiement par carte prépayée dans tout le parc.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Liens utiles
            </Typography>
            <Stack spacing={0.5}>
              <MuiLink href="/#actions" color="inherit" underline="hover">Actions rapides</MuiLink>
              <MuiLink href="/#categories" color="inherit" underline="hover">Catégories</MuiLink>
              <MuiLink href="/#offres" color="inherit" underline="hover">Offres du jour</MuiLink>
              <MuiLink href="/contact" color="inherit" underline="hover">Contact</MuiLink>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Nous joindre
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
              <PhoneRoundedIcon fontSize="small" />
              <Typography variant="body2">+227 00 00 00 00</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AlternateEmailRoundedIcon fontSize="small" />
              <Typography variant="body2">contact@parcsalma.ne</Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
              <IconButton color="inherit" size="small" aria-label="Facebook">
                <FacebookRoundedIcon />
              </IconButton>
              <IconButton color="inherit" size="small" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" size="small" aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © {new Date().getFullYear()} Parc Salma. Tous droits réservés.
          </Typography>
          <Stack direction="row" spacing={2}>
            <MuiLink href="/terms" color="inherit" underline="hover">Conditions</MuiLink>
            <MuiLink href="/privacy" color="inherit" underline="hover">Confidentialité</MuiLink>
            <MuiLink href="/help" color="inherit" underline="hover">Aide & FAQ</MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
