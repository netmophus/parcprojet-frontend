// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import API from '../../services/api';

// const SalePointPage = () => {
//   const [salePoints, setSalePoints] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     type: '',
//     photo: null,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchSalePoints = async () => {
//     try {
//       const res = await API.get('/salepoints');
//       setSalePoints(res.data);
//     } catch (err) {
//       console.error('Erreur chargement espaces de vente', err);
//     }
//   };

//   useEffect(() => {
//     fetchSalePoints();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'photo') {
//       setForm({ ...form, photo: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('name', form.name);
//       formData.append('description', form.description);
//       formData.append('type', form.type);
//       if (form.photo) formData.append('photo', form.photo);

//       if (editingId) {
//         await API.put(`/salepoints/${editingId}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       } else {
//         await API.post('/salepoints', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       }

//       setForm({ name: '', description: '', type: '', photo: null });
//       setEditingId(null);
//       fetchSalePoints();
//     } catch (err) {
//       console.error('Erreur soumission', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (point) => {
//     setForm({
//       name: point.name,
//       description: point.description,
//       type: point.type,
//       photo: null,
//     });
//     setEditingId(point._id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Supprimer cet espace ?')) {
//       try {
//         await API.delete(`/salepoints/${id}`);
//         fetchSalePoints();
//       } catch (err) {
//         console.error('Erreur suppression', err);
//       }
//     }
//   };

//   return (
//     <Paper sx={{ p: 4, borderRadius: 3 }}>
//       <Typography variant="h6" fontWeight="bold" gutterBottom>
//         🏪 Gestion des Espaces de Vente
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Nom de l'espace"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             select
//             label="Type d'espace"
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             fullWidth
//             required
//           >
//             <MenuItem value="restaurant">Restaurant</MenuItem>
//             <MenuItem value="cafeteria">Cafétéria</MenuItem>
//             <MenuItem value="snack">Snack</MenuItem>
//             <MenuItem value="patisserie">Pâtisserie</MenuItem>
//             <MenuItem value="boutique">Boutique</MenuItem>
//             <MenuItem value="autre">Autre</MenuItem>
//           </TextField>
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             label="Description"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             multiline
//             rows={2}
//             fullWidth
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button
//             variant="outlined"
//             component="label"
//             fullWidth
//           >
//             {form.photo ? '📸 Photo sélectionnée' : 'Téléverser une photo'}
//             <input
//               type="file"
//               name="photo"
//               accept="image/*"
//               hidden
//               onChange={handleChange}
//             />
//           </Button>

//           {form.photo && (
//   <Grid item xs={12}>
//     <Box mt={1} display="flex" justifyContent="center">
//       <img
//         src={URL.createObjectURL(form.photo)}
//         alt="Aperçu"
//         style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
//       />
//     </Box>
//   </Grid>
// )}

//         </Grid>

//         <Grid item xs={12}>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {editingId ? 'Modifier' : 'Créer'} l’espace
//           </Button>
//         </Grid>
//       </Grid>

//       <Box mt={4}>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           📋 Liste des espaces existants
//         </Typography>
//         <Table>
//         <TableHead>
//   <TableRow>
//     <TableCell>Photo</TableCell>
//     <TableCell>Nom</TableCell>
//     <TableCell>Type</TableCell>
//     <TableCell>Description</TableCell>
//     <TableCell align="right">Actions</TableCell>
//   </TableRow>
// </TableHead>

//          <TableBody>
//   {salePoints.map((point) => (
//     <TableRow key={point._id}>
//       <TableCell>
//         {point.photo ? (
//           <img
//             src={`http://localhost:5000${point.photo}`}
//             alt={point.name}
//             style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
//           />
//         ) : (
//           '—'
//         )}
//       </TableCell>
//       <TableCell>{point.name}</TableCell>
//       <TableCell>{point.type}</TableCell>
//       <TableCell>{point.description}</TableCell>
//       <TableCell align="right">
//         <IconButton color="primary" onClick={() => handleEdit(point)}>
//           <EditIcon />
//         </IconButton>
//         <IconButton color="error" onClick={() => handleDelete(point._id)}>
//           <DeleteIcon />
//         </IconButton>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>

//         </Table>
//       </Box>
//     </Paper>
//   );
// };

// export default SalePointPage;






















import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../services/api';

const TYPES = [
  { value: 'restaurant',  label: 'Restaurant' },
  { value: 'cafeteria',   label: 'Cafétéria' },
  { value: 'snack',       label: 'Snack' },
  { value: 'patisserie',  label: 'Pâtisserie' },
  { value: 'boutique',    label: 'Boutique' },
  { value: 'autre',       label: 'Autre' },
];

const SalePointPage = () => {
  const [salePoints, setSalePoints] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: '',
    photo: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSalePoints = async () => {
    try {
      const res = await API.get('/salepoints');
      setSalePoints(res.data);
    } catch (err) {
      console.error('Erreur chargement espaces de vente', err);
    }
  };

  useEffect(() => { fetchSalePoints(); }, []);

  // ➜ valeur par défaut du type quand on n’édite pas
  useEffect(() => {
    if (!editingId && !form.type && TYPES.length > 0) {
      setForm(prev => ({ ...prev, type: TYPES[0].value }));
    }
  }, [editingId, form.type]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] || null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('type', form.type);
      if (form.photo) formData.append('photo', form.photo);

      if (editingId) {
        await API.put(`/salepoints/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await API.post('/salepoints', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setForm({ name: '', description: '', type: TYPES[0]?.value || '', photo: null });
      setEditingId(null);
      fetchSalePoints();
    } catch (err) {
      console.error('Erreur soumission', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (point) => {
    setForm({
      name: point.name || '',
      description: point.description || '',
      type: point.type || TYPES[0]?.value || '',
      photo: null,
    });
    setEditingId(point._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cet espace ?')) {
      try {
        await API.delete(`/salepoints/${id}`);
        fetchSalePoints();
      } catch (err) {
        console.error('Erreur suppression', err);
      }
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🏪 Gestion des Espaces de Vente
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nom de l'espace"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        {/* Champ TYPE élargi + options centralisées */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Type d'espace"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              minWidth: { xs: '100%', sm: 360, md: 480 },
              '& .MuiSelect-select': { py: 1.2 },
            }}
          >
            {TYPES.map(t => (
              <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={2}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" component="label" fullWidth>
            {form.photo ? '📸 Photo sélectionnée' : 'Téléverser une photo'}
            <input
              type="file"
              name="photo"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </Button>

          {form.photo && (
            <Box mt={1} display="flex" justifyContent="center">
              <img
                src={URL.createObjectURL(form.photo)}
                alt="Aperçu"
                style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
              />
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {editingId ? 'Modifier' : 'Créer'} l’espace
          </Button>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📋 Liste des espaces existants
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {salePoints.map((point) => (
              <TableRow key={point._id}>
                <TableCell>
                  {point.photo ? (
                    <img
                      src={`http://localhost:5000${point.photo}`}
                      alt={point.name}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                    />
                  ) : '—'}
                </TableCell>
                <TableCell>{point.name}</TableCell>
                <TableCell>{point.type}</TableCell>
                <TableCell>{point.description}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(point)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(point._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default SalePointPage;
