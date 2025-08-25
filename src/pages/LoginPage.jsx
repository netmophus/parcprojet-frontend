// import React, { useState } from 'react';
// import {
//   Container,
//   Box,
//   TextField,
//   Typography,
//   Button,
//   Paper,
//   InputAdornment,
//   IconButton,
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext'; // si ce n'est pas déjà fait
// import { useContext } from 'react';
// import API from '../services/api';


// const LoginPage = () => {
//   const [form, setForm] = useState({ phone: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
// const navigate = useNavigate();
// const { setUser } = useContext(AuthContext);


// const roleHome = {
//   operator: '/operator/play',
//   caissier: '/caissier/dashboard',
//   admin: '/admin-dashboard',       // ⚠️ c'était /admin/dashboard
//   parent: '/parent-dashboard',     // ⚠️ c'était /parent/dashboard
//   agent: '/agent-dashboard',
// };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


// //   const handleSubmit = async () => {
// //   try {
// //     setLoading(true);
// //    const res = await API.post('/auth/login', form).then(res => res.data);


// //     setMessage(`✅ Bienvenue ${res.name}`);
// //     localStorage.setItem('token', res.token);

// //     // Mise à jour du contexte utilisateur
// //     setUser({
// //       _id: res._id,
// //       role: res.role,
// //     });

// //     // Redirection vers le tableau de bord du rôle
// // // Redirection vers le tableau de bord du rôle
// // if (res.role === 'operator') {
// //   navigate('/operator/play');
// // } else if (res.role === 'caissier') {
// //   navigate('/caissier/dashboard');
// // } else if (res.role === 'admin') {
// //   navigate('/admin/dashboard');
// // } else if (res.role === 'parent') {
// //   navigate('/parent/dashboard');
// // } else if (res.role === 'client') {
// //   navigate('/client/dashboard');
// // } else if (res.role === 'agent') {
// //   navigate('/agent/dashboard');
// // } else {
// //   setMessage('Rôle non pris en charge');
// // }




// //   } catch (err) {
// //     setMessage(err.response?.data?.message || 'Erreur lors de la connexion');
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// const handleSubmit = async () => {
//   try {
//     setLoading(true);
//     const res = await API.post('/auth/login', form).then(r => r.data);

//     setMessage(`✅ Bienvenue ${res.name}`);
//     localStorage.setItem('token', res.token);

//     setUser({ _id: res._id, role: res.role });

//     // Redirection
//     navigate(roleHome[res.role] || '/', { replace: true });
//   } catch (err) {
//     setMessage(err.response?.data?.message || 'Erreur lors de la connexion');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={4} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
//           🔐 Connexion - ParcProjet
//         </Typography>

//         <Box component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//   <TextField
//     label="Numéro de téléphone"
//     name="phone"
//     value={form.phone}
//     onChange={handleChange}
//     fullWidth
//     required
//     type="tel"
//     placeholder="+227..."
//   />

//   <TextField
//     label="Mot de passe"
//     name="password"
//     type={showPassword ? 'text' : 'password'}
//     value={form.password}
//     onChange={handleChange}
//     fullWidth
//     required
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//             {showPassword ? <VisibilityOff /> : <Visibility />}
//           </IconButton>
//         </InputAdornment>
//       ),
//     }}
//   />

//   {/* 🔑 Mot de passe oublié */}
//   <Typography
//     variant="body2"
//     textAlign="right"
//     sx={{ cursor: 'pointer', color: 'primary.main' }}
//     onClick={() => navigate('/forgot-password')}
//   >
//     Mot de passe oublié ?
//   </Typography>

//   <Button
//     variant="contained"
//     fullWidth
//     size="large"
//     sx={{ mt: 1, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
//     onClick={handleSubmit}
//     disabled={loading}
//   >
//     {loading ? 'Connexion...' : 'Se connecter'}
//   </Button>

//   {/* Message d'erreur ou de bienvenue */}
//   {message && (
//     <Typography textAlign="center" color={message.startsWith('✅') ? 'green' : 'error'} mt={1}>
//       {message}
//     </Typography>
//   )}

//   {/* 📝 Lien vers inscription */}
//   <Typography variant="body2" textAlign="center" mt={2}>
//     Pas encore de compte ?{' '}
//     <Button variant="text" size="small" onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>
//       S'inscrire
//     </Button>
//   </Typography>
// </Box>

//       </Paper>
  

//     </Container>
//   );
// };

// export default LoginPage;


import React, { useState, useContext } from 'react';
import {
  Container, Box, TextField, Typography, Button, Paper, InputAdornment,
  IconButton, Stack, Divider, FormControlLabel, Checkbox, Alert, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import API from '../services/api';

const brand = { green:'#11693A', greenDark:'#0D5330', orange:'#F26B21', blue:'#0B79BF' };

const roleHome = {
  operator: '/operator/play',
  caissier: '/caissier/dashboard',
  admin: '/admin-dashboard',
  parent: '/parent-dashboard',
  agent: '/agent-dashboard',
};

const LoginPage = () => {
  // on affiche seulement les 8 chiffres locaux à l’écran
  const [phoneDigits, setPhoneDigits] = useState(''); // ex: "96648383"
  const [form, setForm] = useState({ password: '' }); // le numéro complet sera construit au submit
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const sanitizeDigits = (v) => v.replace(/\D/g, ''); // enlève espaces et tout sauf chiffres

  const handlePhoneChange = (e) => {
    const digits = sanitizeDigits(e.target.value).slice(0, 8); // Niger = 8 chiffres
    setPhoneDigits(digits);
  };

  const handlePasswordChange = (e) => setForm((p) => ({ ...p, password: e.target.value }));

  const isValid = phoneDigits.length === 8 && form.password.length >= 4;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!isValid || loading) return;
    try {
      setLoading(true);
      const payload = {
        phone: `+227${phoneDigits}`, // format DB/Backend: +22796648383
        password: form.password,
      };
      const res = await API.post('/auth/login', payload).then((r) => r.data);

      setMessage(`✅ Bienvenue ${res.name}`);
      localStorage.setItem('token', res.token);
      if (remember) localStorage.setItem('remember_me', '1'); else localStorage.removeItem('remember_me');

      setUser({ _id: res._id, role: res.role });
      navigate(roleHome[res.role] || '/', { replace: true });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        // background: `
        //   radial-gradient(1000px 400px at 20% 0%, #1aa25b22 0%, transparent 60%),
        //   radial-gradient(900px 380px at 100% 100%, #0b79bf22 0%, transparent 60%),
        //   linear-gradient(180deg, ${brand.greenDark} 0%, ${brand.green} 100%)
        // `,
        p: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 2 } }}>
        <Paper elevation={8} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, bgcolor: '#ffffffee', backdropFilter: 'blur(6px)' }}>
          <Stack alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
            <Typography variant="h4" fontWeight={900} sx={{ color: brand.green, letterSpacing: 0.2, textAlign: 'center' }}>
              Parc Salma
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Loisirs • Culture • Saveurs
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Numéro de téléphone"
                value={phoneDigits}
                onChange={handlePhoneChange}
                fullWidth
                required
                placeholder="90000000"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 8 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ fontWeight: 700, color: brand.green }}>+227</Typography>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneIphoneRoundedIcon sx={{ color: brand.green }} />
                    </InputAdornment>
                  ),
                }}
                helperText="Entrez uniquement les 8 chiffres (ex. 96648383)."
              />

              <TextField
                label="Mot de passe"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handlePasswordChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon sx={{ color: brand.green }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((v) => !v)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      sx={{ color: brand.green, '&.Mui-checked': { color: brand.green } }}
                    />
                  }
                  label="Se souvenir de moi"
                />
                <Button variant="text" size="small" onClick={() => navigate('/forgot-password')} sx={{ textTransform: 'none' }}>
                  Mot de passe oublié ?
                </Button>
              </Stack>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!isValid || loading}
                startIcon={!loading ? <LoginRoundedIcon /> : null}
                endIcon={!loading ? <ArrowForwardRoundedIcon /> : null}
                sx={{ py: 1.4, fontWeight: 800, borderRadius: 2, textTransform: 'none', bgcolor: brand.orange, '&:hover': { bgcolor: '#E4601F' } }}
              >
                {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Se connecter'}
              </Button>

              {message && (
                <Alert severity={message.startsWith('✅') ? 'success' : 'error'} sx={{ mt: 0.5 }}>
                  {message}
                </Alert>
              )}

              <Divider>ou</Divider>

              <Stack direction="row" justifyContent="center" spacing={1}>
                <Typography variant="body2">Pas encore de compte ?</Typography>
                <Button variant="outlined" size="small" onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>
                  Créer un compte
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
