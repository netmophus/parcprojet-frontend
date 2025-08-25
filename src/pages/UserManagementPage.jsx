
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   TextField,
//   Button,
//   MenuItem,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   Chip,
//   Pagination,
// } from '@mui/material';
// import { Edit, ToggleOn, ToggleOff } from '@mui/icons-material';
// import API from '../services/api';


// const roles = [
//   { value: 'admin', label: 'Administrateur' },
//   { value: 'caissier', label: 'Caissier' },
//     { value: 'client', label: 'Client' },
//   { value: 'agent', label: 'Agent Commercial' },
//   { value: 'operator', label: 'Opérateur' },
//   { value: 'parent', label: 'Parent' },
//   { value: 'child', label: 'Enfant' },
// ];


// const USERS_PER_PAGE = 5;

// const UserManagementPage = () => {
//   const [form, setForm] = useState({ name: '', phone: '', password: '', role: '' });
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//      const res = await API.post('/auth/register', form);

//       setUsers((prev) => [res, ...prev]);
//       setMessage('✅ Utilisateur créé avec succès');
//       setForm({ name: '', phone: '', password: '', role: '' });
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Erreur');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleStatus = (index) => {
//     const updated = [...users];
//     const realIndex = (currentPage - 1) * USERS_PER_PAGE + index;
//     updated[realIndex].isActive = !updated[realIndex].isActive;
//     setUsers(updated);
//   };

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//       const res = await API.get('/users', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = res.data;

//         setUsers(data);
//       } catch (err) {
//         console.error('Erreur chargement utilisateurs', err);
//       }
//     };
//     loadUsers();
//   }, []);

//  const filteredUsers = users.filter((u) => u.phone && u.phone.includes(search));

//   const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * USERS_PER_PAGE,
//     currentPage * USERS_PER_PAGE
//   );

//   return (
//     <Box p={4}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         👤 Gestion des utilisateurs
//       </Typography>

//       <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           ➕ Créer un utilisateur
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Nom complet"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//        {form.role !== 'child' && (
//   <Grid item xs={12} sm={6}>
//     <TextField
//       label="Téléphone"
//       name="phone"
//       value={form.phone}
//       onChange={handleChange}
//       fullWidth
//       required
//       placeholder="+227..."
//     />
//   </Grid>
// )}

// {form.role !== 'child' && (
//   <Grid item xs={12} sm={6}>
//     <TextField
//       label="Mot de passe"
//       name="password"
//       value={form.password}
//       onChange={handleChange}
//       fullWidth
//       required
//       type="password"
//     />
//   </Grid>
// )}

//           <Grid item xs={12} sm={6}>
//             <TextField
//               select
//               label="Rôle"
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               fullWidth
//               required
//             >
//               {roles.map((r) => (
//                 <MenuItem key={r.value} value={r.value}>
//                   {r.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleSubmit}
//               disabled={loading}
//               sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
//             >
//               {loading ? 'Création en cours...' : 'Créer l’utilisateur'}
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
//           📋 Liste des utilisateurs
//         </Typography>

//         <TextField
//           label="Recherche par téléphone"
//           fullWidth
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{ mb: 2 }}
//         />

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Nom</TableCell>
//               <TableCell>Téléphone</TableCell>
//               <TableCell>Rôle</TableCell>
//               <TableCell>Statut</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedUsers.map((u, i) => (
//               <TableRow key={u._id}>
//                 <TableCell>{u.name}</TableCell>
//                 <TableCell>{u.phone}</TableCell>
//                 <TableCell>{u.role}</TableCell>
//                 <TableCell>
//                   <Chip
//                     label={u.isActive ? 'Actif' : 'Inactif'}
//                     color={u.isActive ? 'success' : 'default'}
//                   />
//                 </TableCell>
//                 <TableCell align="right">
//                   <IconButton onClick={() => console.log('Modifier', u)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton onClick={() => toggleStatus(i)}>
//                     {u.isActive ? <ToggleOff color="warning" /> : <ToggleOn color="success" />}
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <Box mt={2} display="flex" justifyContent="center">
//           <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={(e, val) => setCurrentPage(val)}
//             color="primary"
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default UserManagementPage;




















import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Chip,
  Pagination,
  Stack,
  InputAdornment,
  Tooltip,
  Alert,
  Divider,
  Switch,
} from '@mui/material';
import {
  Edit as EditIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  SearchRounded,
  PhoneIphoneRounded,
  LockRounded,
  PersonAddAltRounded,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import API from '../services/api';

const roles = [
  { value: 'admin',    label: 'Administrateur' },
  { value: 'caissier', label: 'Caissier' },
  { value: 'client',   label: 'Client' },
  { value: 'agent',    label: 'Agent Commercial' },
  { value: 'operator', label: 'Opérateur' },
  { value: 'parent',   label: 'Parent' },
  { value: 'child',    label: 'Enfant' },
];

const roleChipColor = (role) => ({
  admin: 'default',
  caissier: 'info',
  client: 'default',
  agent: 'secondary',
  operator: 'warning',
  parent: 'success',
  child: 'default',
}[role] || 'default');

const USERS_PER_PAGE = 5;

const UserManagementPage = () => {
  // ---- Formulaire Création ----
  const [form, setForm] = useState({ name: '', role: '' });
  const [phoneDigits, setPhoneDigits] = useState('');     // uniquement 8 chiffres visibles
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // ---- Données & UI ----
  const [users, setUsers] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // ---- Helpers ----
  const sanitizeDigits = (v) => v.replace(/\D/g, '');
  const handlePhoneChange = (e) => {
    setPhoneDigits(sanitizeDigits(e.target.value).slice(0, 8)); // Niger = 8 chiffres
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ---- Charger les utilisateurs ----
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/users', { headers: { Authorization: `Bearer ${token}` } });
        setUsers(res.data || []);
      } catch (err) {
        console.error('Erreur chargement utilisateurs', err);
      }
    };
    loadUsers();
  }, []);

  // ---- Création utilisateur ----
  const canSubmit =
    form.name.trim().length > 1 &&
    form.role &&
    (form.role === 'child' || phoneDigits.length === 8) &&
    (form.role === 'child' || password.length >= 4);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      setLoadingCreate(true);

      const payload = {
        name: form.name.trim(),
        role: form.role,
        ...(form.role !== 'child' ? { phone: `+227${phoneDigits}`, password } : {}), // +227XXXXXXXX
      };

      const created = await API.post('/auth/register', payload).then(r => r.data);
      setUsers((prev) => [created, ...prev]);

      setMessage('✅ Utilisateur créé avec succès');
      setForm({ name: '', role: '' });
      setPhoneDigits('');
      setPassword('');
      setShowPass(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoadingCreate(false);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  // ---- Filtrage + recherche ----
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users
      .filter((u) => (roleFilter === 'all' ? true : u.role === roleFilter))
      .filter((u) => {
        const inPhone = (u.phone || '').toLowerCase().includes(q);
        const inName = (u.name || '').toLowerCase().includes(q);
        return !q || inPhone || inName;
      });
  }, [users, search, roleFilter]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  useEffect(() => {
    // si on change de filtre/recherche, on revient page 1
    setCurrentPage(1);
  }, [search, roleFilter]);

  // ---- Toggle statut local (démo UI) ----
  const toggleStatus = (index) => {
    const realIndex = (currentPage - 1) * USERS_PER_PAGE + index;
    setUsers((prev) => {
      const updated = [...prev];
      if (updated[realIndex]) {
        updated[realIndex] = { ...updated[realIndex], isActive: !updated[realIndex].isActive };
      }
      return updated;
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F7F5F0', minHeight: '100vh' }}>
      {/* Titre + sous-titre */}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={1} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={900}>👤 Gestion des utilisateurs</Typography>
          <Typography variant="body2" color="text.secondary">
            Créez des comptes et gérez les accès au parc.
          </Typography>
        </Box>
      </Stack>

      {/* Carte création utilisateur (glass + gradient header) */}
      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 3, border: '1px solid #EAEAEA' }}>
        <Box sx={{
          p: 2.5,
          color: '#fff',
          background: 'linear-gradient(135deg, #11693A 0%, #0D5330 100%)'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={800}>➕ Créer un utilisateur</Typography>
            <Chip icon={<PersonAddAltRounded />} label="Nouveau" size="small" sx={{ bgcolor: '#ffffff2a', color: '#fff' }} />
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nom complet"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Rôle"
                name="role"
                value={form.role}
                onChange={handleChange}
                fullWidth
                required
              >
                {roles.map((r) => (
                  <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {form.role !== 'child' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Téléphone (+227)"
                  value={phoneDigits}
                  onChange={handlePhoneChange}
                  fullWidth
                  required
                  placeholder="96648383"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 8 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ fontWeight: 700, color: '#11693A' }}>+227</Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneIphoneRounded sx={{ color: '#11693A' }} />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Saisir uniquement les 8 chiffres. Exemple : 96648383"
                />
              </Grid>
            )}

            {form.role !== 'child' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mot de passe"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRounded sx={{ color: '#11693A' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(v => !v)} edge="end">
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              {message && (
                <Alert severity={message.startsWith('✅') ? 'success' : 'error'} sx={{ mb: 1 }}>
                  {message}
                </Alert>
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={!canSubmit || loadingCreate}
                sx={{ py: 1.5, fontWeight: 800, borderRadius: 2, textTransform: 'none', bgcolor: '#F26B21', '&:hover': { bgcolor: '#E4601F' } }}
              >
                {loadingCreate ? 'Création en cours...' : 'Créer l’utilisateur'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Liste + recherche + filtres */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: '1px solid #EAEAEA' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={800}>📋 Liste des utilisateurs</Typography>

          <TextField
            placeholder="Rechercher par nom ou téléphone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', md: 360 } }}
          />
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip
            label="Tous"
            color={roleFilter === 'all' ? 'primary' : 'default'}
            onClick={() => setRoleFilter('all')}
          />
          {roles.map(r => (
            <Chip
              key={r.value}
              label={r.label}
              color={roleFilter === r.value ? 'primary' : 'default'}
              onClick={() => setRoleFilter(r.value)}
              variant={roleFilter === r.value ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Table responsive (stack cards sur mobile) */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ overflowX: 'auto' }}>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <Box component="thead" sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <Box component="tr" sx={{ bgcolor: '#F5F5F7' }}>
                  <Box component="th" sx={{ textAlign: 'left', p: 1.5 }}>Nom</Box>
                  <Box component="th" sx={{ textAlign: 'left', p: 1.5 }}>Téléphone</Box>
                  <Box component="th" sx={{ textAlign: 'left', p: 1.5 }}>Rôle</Box>
                  <Box component="th" sx={{ textAlign: 'left', p: 1.5 }}>Statut</Box>
                  <Box component="th" sx={{ textAlign: 'right', p: 1.5 }}>Actions</Box>
                </Box>
              </Box>
              <Box component="tbody">
                {paginatedUsers.map((u, i) => (
                  <Box
                    component="tr"
                    key={u._id || `${u.phone}-${i}`}
                    sx={{
                      '&:nth-of-type(even)': { bgcolor: '#FAFAFD' },
                      '&:hover': { bgcolor: '#F7F9FC' },
                    }}
                  >
                    <Box component="td" sx={{ p: 1.25, borderTop: '1px solid #F0F0F0' }}>
                      <Typography fontWeight={700}>{u.name || '—'}</Typography>
                    </Box>
                    <Box component="td" sx={{ p: 1.25, borderTop: '1px solid #F0F0F0' }}>
                      <Typography>{u.phone || '—'}</Typography>
                    </Box>
                    <Box component="td" sx={{ p: 1.25, borderTop: '1px solid #F0F0F0' }}>
                      <Chip
                        size="small"
                        label={u.role}
                        color={roleChipColor(u.role)}
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                    <Box component="td" sx={{ p: 1.25, borderTop: '1px solid #F0F0F0' }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Switch
                          checked={!!u.isActive}
                          onChange={() => toggleStatus(i)}
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {u.isActive ? 'Actif' : 'Inactif'}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box component="td" sx={{ p: 1.25, borderTop: '1px solid #F0F0F0', textAlign: 'right' }}>
                      <Tooltip title="Modifier">
                        <IconButton size="small" onClick={() => console.log('Modifier', u)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={u.isActive ? 'Désactiver' : 'Activer'}>
                        <IconButton size="small" onClick={() => toggleStatus(i)}>
                          {u.isActive ? <ToggleOffIcon color="warning" /> : <ToggleOnIcon color="success" />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Version mobile: cartes empilées */}
        <Box sx={{ display: { xs: 'grid', md: 'none' }, gap: 1.25 }}>
          {paginatedUsers.map((u, i) => (
            <Paper key={u._id || `${u.phone}-${i}`} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography fontWeight={800}>{u.name || '—'}</Typography>
                  <Typography variant="body2" color="text.secondary">{u.phone || '—'}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Chip
                      size="small"
                      label={u.role}
                      color={roleChipColor(u.role)}
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                    <Chip
                      size="small"
                      label={u.isActive ? 'Actif' : 'Inactif'}
                      color={u.isActive ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </Stack>
                </Box>
                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small" onClick={() => console.log('Modifier', u)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => toggleStatus(i)}>
                    {u.isActive ? <ToggleOffIcon color="warning" fontSize="small" /> : <ToggleOnIcon color="success" fontSize="small" />}
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Box>

        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, val) => setCurrentPage(val)}
            color="primary"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default UserManagementPage;
