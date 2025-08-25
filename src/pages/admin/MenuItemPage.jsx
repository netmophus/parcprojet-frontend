import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Typography, TextField, Button, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../services/api';

// -------- Helpers pour les URLs d’images --------
const FALLBACK_IMG = 'https://via.placeholder.com/60?text=N/A';
// Si baseURL = "http://192.168.1.221:5000/api" => on retire "/api" pour obtenir l’origine
const BASE_ORIGIN = (API.defaults?.baseURL || '').replace(/\/api\/?$/, '');
const toPublicUrl = (p) => {
  if (!p) return FALLBACK_IMG;
  if (p.startsWith('http://') || p.startsWith('https://')) return p;
  if (p.startsWith('/')) return `${BASE_ORIGIN}${p}`;
  return `${BASE_ORIGIN}/${p}`;
};

const MenuItemPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [salePoints, setSalePoints] = useState([]);
  const [form, setForm] = useState({
    salePoint: '',
    name: '',
    description: '',
    price: '',
    photo: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

// après fetchSalePoints()

  const fetchSalePoints = async () => {
    try {
      const res = await API.get('/salepoints');
      const list = res.data || [];
      setSalePoints(list);

      // 👉 si rien de sélectionné, on met le 1er par défaut (optionnel)
      if (!form.salePoint && list.length === 1) {
        setForm((f) => ({ ...f, salePoint: list[0]._id }));
      }
    } catch (err) {
      console.error('Erreur chargement espaces', err);
    }
  };


  const fetchMenuItems = async () => {
    if (!form.salePoint) {
      // aucun espace sélectionné
      setMenuItems([]);
      return;
    }
    try {
      // ✅ bon endpoint: /menuitems/salepoint/:salePointId
      const res = await API.get(`/menuitems/salepoint/${form.salePoint}`);
      setMenuItems(res.data);
    } catch (err) {
      console.error('❌ Erreur chargement menus', err);
      setMenuItems([]);
    }
  };

  useEffect(() => {
    fetchSalePoints();
  }, []);

  useEffect(() => {
    fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.salePoint]); // recharge quand on choisit un stand

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files?.[0] || null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

const handleSubmit = async () => {
  try {
    setLoading(true);

    const fd = new FormData();

    // 👉 N'ajoute chaque champ que s'il est réellement rempli
    if (form.salePoint) fd.append('salePoint', form.salePoint);
    if (form.name && form.name.trim()) fd.append('name', form.name.trim());
    if (form.description !== undefined) fd.append('description', form.description);

    // price: n'envoyer que si non vide
    if (form.price !== '' && form.price !== undefined && form.price !== null) {
      // toString: évite le cast côté serveur si "", et gère 12,5 -> "12.5"
      fd.append('price', String(form.price).replace(',', '.'));
    }

    // photo: seulement si un fichier a été choisi
    if (form.photo instanceof File) {
      fd.append('photo', form.photo);
    }

    if (editingId) {
      // ✏️ UPDATE
      await API.put(`/menuitems/${editingId}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      // ➕ CREATE (petit contrôle minimal côté client)
      if (!form.salePoint || !form.name?.trim() || form.price === '' || form.price === undefined || form.price === null) {
        alert('Veuillez renseigner le stand, le nom et le prix.');
        setLoading(false);
        return;
      }

      await API.post('/menuitems', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    // Reset formulaire + refresh liste
    setForm({ salePoint: '', name: '', description: '', price: '', photo: null });
    setEditingId(null);
    fetchMenuItems();
  } catch (err) {
    console.error('Erreur soumission menu', err);
    const msg = err?.response?.data?.message || 'Erreur lors de l’enregistrement du menu.';
    alert(`❌ ${msg}`);
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (item) => {
    setForm({
      salePoint: item.salePoint?._id || '',
      name: item.name || '',
      description: item.description || '',
      price: item.price || '',
      photo: null, // on ne précharge pas un fichier
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce menu ?')) {
      try {
        await API.delete(`/menuitems/${id}`);
        fetchMenuItems();
      } catch (err) {
        console.error('Erreur suppression menu', err);
      }
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🍽️ Gestion des Menus
      </Typography>

    <Grid item xs={12}>
  <TextField
    select
    label="Espace de vente"
    name="salePoint"
    value={form.salePoint || ''}
    onChange={handleChange}
    required
    // 👉 largeur plus “confort”
    sx={{ width: { xs: '100%', sm: 480, md: 560 } }}
    helperText={`${salePoints.length} espace(s) disponible(s)`}
    SelectProps={{
      displayEmpty: true,
      MenuProps: {
        PaperProps: { sx: { maxHeight: 48 * 6, width: 520 } }, // menu plus large/haut
      },
    }}
  >
    {/* placeholder */}
    <MenuItem value="" disabled>
      — Sélectionner un espace de vente —
    </MenuItem>

    {salePoints.map((sp) => (
      <MenuItem key={sp._id} value={sp._id}>
        <Box display="flex" flexDirection="column">
          <Typography fontWeight={700}>{sp.name}</Typography>
          {sp.type && (
            <Typography variant="caption" color="text.secondary">
              {sp.type}
            </Typography>
          )}
        </Box>
      </MenuItem>
    ))}
  </TextField>
</Grid>


      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📋 Liste des menus
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Espace</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
               <Avatar
  src={toPublicUrl(item.photo)}
  alt={item.name}
  variant="square"
  sx={{ width: 60, height: 60, objectFit: 'cover' }}
  imgProps={{
    crossOrigin: 'anonymous',       // <img crossOrigin="anonymous">
    referrerPolicy: 'no-referrer',  // évite certains blocages navigateurs
    loading: 'lazy',                // perf
    onError: (e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = FALLBACK_IMG;
    },
  }}
/>

                </TableCell>

                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price} FCFA</TableCell>
                <TableCell>{item.salePoint?.name || '-'}</TableCell>
                <TableCell>{item.description}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(item)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {menuItems.length === 0 && form.salePoint && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary">Aucun menu pour cet espace.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default MenuItemPage;
