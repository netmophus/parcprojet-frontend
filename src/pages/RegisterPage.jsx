import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import API from '../services/api';

import { useNavigate } from 'react-router-dom';

const roles = [
  { value: 'parent', label: 'Parent' },
  { value: 'operator', label: 'Opérateur' },
  { value: 'admin', label: 'Administrateur' },
];

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
  const res = await API.post('/auth/register', form).then(res => res.data);
      setMessage(`✅ Compte créé pour ${res.name}`);
      setTimeout(() => {
        navigate('/login');
        }, 1500); // petite pause pour laisser afficher le message
      setForm({ name: '', phone: '', password: '', role: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de l’inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt:4, mb:4, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          🎡 Créer un compte - ParcProjet
        </Typography>

        <Box component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nom complet"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Numéro de téléphone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
            required
            type="tel"
            placeholder="+227..."
          />

          <TextField
            label="Mot de passe"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Rôle"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            required
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Création en cours...' : 'Créer le compte'}
          </Button>

         {message && (
  <Typography textAlign="center" color={message.startsWith('✅') ? 'green' : 'error'} mt={1}>
    {message}
  </Typography>
)}

{/* 🔄 Lien vers Login */}
<Typography variant="body2" textAlign="center" mt={2}>
  Déjà un compte ?{' '}
  <Button variant="text" size="small" onClick={() => navigate('/login')} sx={{ textTransform: 'none' }}>
    Se connecter
  </Button>
</Typography>

        </Box>
      </Paper>
      
    </Container>
  );
};

export default RegisterPage;
