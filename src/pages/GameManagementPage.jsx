// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   MenuItem,
//   IconButton,
//   Chip,
// } from '@mui/material';
// import { Edit, Delete, ToggleOn, ToggleOff } from '@mui/icons-material';
// import API from '../services/api';


// const GameManagementPage = () => {
//  const [form, setForm] = useState({ name: '', price: '', maxPlayers: '', operator: '' });

//   const [games, setGames] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   const [operators, setOperators] = useState([]);


//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//  const loadGames = async () => {
//   try {
//     const res = await API.get('/games');
//     setGames(res.data);
//   } catch (err) {
//     console.error('Erreur chargement jeux', err);
//   }
// };



// const handleSubmit = async () => {
//   try {
//     setLoading(true);
//     if (editingId) {
//       const updated = await API.put(`/games/${editingId}`, form);
//       // Recharge les jeux depuis l'API pour bénéficier du .populate
//       loadGames();
//       setMessage('✅ Jeu modifié avec succès');
//     } else {
//       await API.post('/games', form);
//       // Recharge les jeux pour que l'opérateur soit bien peuplé
//       loadGames();
//       setMessage('✅ Jeu créé avec succès');
//     }

//     setForm({ name: '', price: '', maxPlayers: '', operator: '' });
//     setEditingId(null);
//   } catch (err) {
//     setMessage(err.response?.data?.message || 'Erreur');
//   } finally {
//     setLoading(false);
//   }
// };


//   const onEdit = (game) => {
//     setForm({ name: game.name, price: game.price, maxPlayers: game.maxPlayers || '' });
//     setEditingId(game._id);
//   };

//  const onToggle = async (id) => {
//   try {
//     await API.put(`/games/toggle/${id}`);
//     loadGames();
//   } catch (err) {
//     console.error(err);
//   }
// };


// const onDelete = async (id) => {
//   try {
//     await API.delete(`/games/${id}`);
//     setGames(games.filter(g => g._id !== id));
//   } catch (err) {
//     console.error(err);
//   }
// };


//   useEffect(() => {
//     loadGames();
//   }, []);



//  useEffect(() => {
//  const loadOperators = async () => {
//   try {
//     const allUsers = await API.get('/users?role=operator');
//     setOperators(allUsers.data.filter((u) => u.role === 'operator'));
//   } catch (err) {
//     console.error('Erreur chargement opérateurs', err);
//   }
// };


//   loadOperators();
// }, []);



//   return (
//     <Box p={4}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         🎮 Gestion des jeux
//       </Typography>

//       <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           {editingId ? '✏️ Modifier le jeu' : '➕ Créer un jeu'}
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={4}>
//             <TextField label="Nom du jeu" name="name" value={form.name} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField label="Prix (FCFA)" name="price" type="number" value={form.price} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField label="Max joueurs" name="maxPlayers" type="number" value={form.maxPlayers} onChange={handleChange} fullWidth />
//           </Grid>


//           <Grid item xs={12} sm={4}>
//             <TextField
//                 select
//                 label="Opérateur"
//                 name="operator"
//                 value={form.operator}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//             >
//                 {operators.map((op) => (
//                 <MenuItem key={op._id} value={op._id}>
//                     {op.name} ({op.phone})
//                 </MenuItem>
//                 ))}
//             </TextField>
//             </Grid>

//           <Grid item xs={12}>
//             <Button variant="contained" fullWidth onClick={handleSubmit} disabled={loading} sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}>
//               {loading ? 'Traitement...' : editingId ? 'Mettre à jour' : 'Créer le jeu'}
//             </Button>
//             {message && (
//               <Typography mt={2} textAlign="center" color={message.startsWith('✅') ? 'green' : 'error'}>
//                 {message}
//               </Typography>
//             )}
//           </Grid>
//         </Grid>
//       </Paper>

//       <Paper sx={{ p: 3, borderRadius: 3 }}>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           📋 Liste des jeux
//         </Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Nom</TableCell>
//               <TableCell>Prix</TableCell>
//               <TableCell>Max joueurs</TableCell>
//               <TableCell>Opérateur</TableCell>

//               <TableCell>Statut</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
         

//          <TableBody>
//   {games.map((g) => (
//     <TableRow key={g._id}>
//       <TableCell>{g.name}</TableCell>
//       <TableCell>{g.price} FCFA</TableCell>
//       <TableCell>{g.maxPlayers || '-'}</TableCell>
//       <TableCell>
//         {g.operator ? `${g.operator.name} (${g.operator.phone})` : '-'}
//       </TableCell>
//       <TableCell>
//         <Chip label={g.isActive ? 'Actif' : 'Inactif'} color={g.isActive ? 'success' : 'default'} />
//       </TableCell>
//       <TableCell align="right">
//         <IconButton onClick={() => onEdit(g)}><Edit /></IconButton>
//         <IconButton onClick={() => onToggle(g._id)}>{g.isActive ? <ToggleOff color="warning" /> : <ToggleOn color="success" />}</IconButton>
//         <IconButton onClick={() => onDelete(g._id)}><Delete color="error" /></IconButton>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>



//         </Table>
//       </Paper>
//     </Box>
//   );
// };

// export default GameManagementPage;












import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Grid, TextField, Button,
  Table, TableHead, TableRow, TableCell, TableBody,
  MenuItem, IconButton, Chip,
} from '@mui/material';
import { Edit, Delete, ToggleOn, ToggleOff } from '@mui/icons-material';
import API from '../services/api';

const GameManagementPage = () => {
  const [form, setForm] = useState({ name: '', price: '', maxPlayers: '', operator: '' });
  const [games, setGames] = useState([]);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const loadGames = async () => {
    try {
      const res = await API.get('/games');
      setGames(res.data);
    } catch (err) {
      console.error('Erreur chargement jeux', err);
    }
  };

  const loadOperators = async () => {
    try {
      const res = await API.get('/users?role=operator');
      const ops = (res.data || []).filter(u => u.role === 'operator');
      setOperators(ops);

      // 👉 valeur par défaut : 1er opérateur si pas en édition et rien de choisi
      if (!editingId && !form.operator && ops.length > 0) {
        setForm(prev => ({ ...prev, operator: ops[0]._id }));
      }
    } catch (err) {
      console.error('Erreur chargement opérateurs', err);
    }
  };

  useEffect(() => { loadGames(); }, []);
  useEffect(() => { loadOperators(); /* après chaque passage en édition, on ne change pas la valeur */ }, [editingId]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // (optionnel) cast en nombre
      const payload = {
        ...form,
        price: form.price !== '' ? Number(form.price) : '',
        maxPlayers: form.maxPlayers !== '' ? Number(form.maxPlayers) : '',
      };

      if (editingId) {
        await API.put(`/games/${editingId}`, payload);
        setMessage('✅ Jeu modifié avec succès');
      } else {
        await API.post('/games', payload);
        setMessage('✅ Jeu créé avec succès');
      }

      await loadGames();
      setForm({ name: '', price: '', maxPlayers: '', operator: operators[0]?._id || '' });
      setEditingId(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (game) => {
    setForm({
      name: game.name,
      price: game.price,
      maxPlayers: game.maxPlayers || '',
      operator: game.operator?._id || game.operator || '', // sécure
    });
    setEditingId(game._id);
  };

  const onToggle = async (id) => {
    try {
      await API.put(`/games/toggle/${id}`);
      loadGames();
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async (id) => {
    try {
      await API.delete(`/games/${id}`);
      setGames(games.filter(g => g._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🎮 Gestion des jeux
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {editingId ? '✏️ Modifier le jeu' : '➕ Créer un jeu'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Nom du jeu *"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Prix (FCFA) *"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Max joueurs"
              name="maxPlayers"
              type="number"
              value={form.maxPlayers}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* 👉 Champ opérateur élargi */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Opérateur *"
              name="operator"
              value={form.operator}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                minWidth: { xs: '100%', sm: 360, md: 480 },   // largeur confortable
                '& .MuiSelect-select': { py: 1.2 },            // un peu plus haut
              }}
            >
              {operators.length === 0 ? (
                <MenuItem value="" disabled>Aucun opérateur disponible</MenuItem>
              ) : (
                operators.map(op => (
                  <MenuItem key={op._id} value={op._id}>
                    {op.name} ({op.phone})
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.price || !form.operator}
              sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            >
              {loading ? 'Traitement…' : editingId ? 'Mettre à jour' : 'Créer le jeu'}
            </Button>
            {message && (
              <Typography mt={2} textAlign="center" color={message.startsWith('✅') ? 'green' : 'error'}>
                {message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📋 Liste des jeux
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Max joueurs</TableCell>
              <TableCell>Opérateur</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {games.map((g) => (
              <TableRow key={g._id}>
                <TableCell>{g.name}</TableCell>
                <TableCell>{g.price} FCFA</TableCell>
                <TableCell>{g.maxPlayers || '-'}</TableCell>
                <TableCell>{g.operator ? `${g.operator.name} (${g.operator.phone})` : '-'}</TableCell>
                <TableCell>
                  <Chip label={g.isActive ? 'Actif' : 'Inactif'} color={g.isActive ? 'success' : 'default'} />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(g)}><Edit /></IconButton>
                  <IconButton onClick={() => onToggle(g._id)}>
                    {g.isActive ? <ToggleOff color="warning" /> : <ToggleOn color="success" />}
                  </IconButton>
                  <IconButton onClick={() => onDelete(g._id)}><Delete color="error" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default GameManagementPage;
