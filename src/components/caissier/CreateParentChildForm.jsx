


// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Divider,
//   Stack,
//   InputAdornment,
//   IconButton,
//   Alert,
//   CircularProgress,
//   ToggleButtonGroup,
//   ToggleButton,
//   Avatar,
//   Chip,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Pagination,
//   Autocomplete,
//   Paper,
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
// import LockRoundedIcon from '@mui/icons-material/LockRounded';
// import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
// import WcRoundedIcon from '@mui/icons-material/WcRounded';
// import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
// import API from '../../services/api';
// import ChildCardModal from '../../components/ChildCardModal';

// const brand = { green: '#11693A', orange: '#F26B21', cream: '#F7F5F0' };
// const formatFCFA = (n) =>
//   `${Number(n || 0).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA`;

// const PARENTS_PER_PAGE = 5;
// const PARENTS_PER_CHILD_PAGE = 5;

// const CreateParentChildForm = () => {
//   // ====== Parent form ======
//   const [parentForm, setParentForm] = useState({ name: '' });
//   const [phoneDigits, setPhoneDigits] = useState(''); // 8 chiffres locaux
//   const [parentPass, setParentPass] = useState('');
//   const [showParentPass, setShowParentPass] = useState(false);

//   // ====== Child form ======
//   const [childForm, setChildForm] = useState({
//     name: '',
//     birthDate: '',
//     gender: 'masculin',
//     parent: '',    // parent _id
//     balance: '',
//     photoFile: null,
//   });
//   const [preview, setPreview] = useState(null);

//   // ====== Data ======
//   const [parents, setParents] = useState([]);   // /users/parents => data.data
//   const [children, setChildren] = useState([]); // /users/children => array

//   // ====== UI ======
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // ====== Lists & filters ======
//   const [parentPage, setParentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [childPage, setChildPage] = useState(1);

//   // ====== Modal ======
//   const [openCard, setOpenCard] = useState(false);
//   const [selectedChild, setSelectedChild] = useState(null);

//   const sanitizeDigits = (v) => v.replace(/\D/g, '');
//   const handleParentPhoneChange = (e) =>
//     setPhoneDigits(sanitizeDigits(e.target.value).slice(0, 8));
//   const handleParentChange = (e) =>
//     setParentForm((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const handleChildChange = (e) =>
//     setChildForm((p) => ({ ...p, [e.target.name]: e.target.value }));
//   const handleFileChange = (e) =>
//     setChildForm((p) => ({ ...p, photoFile: e.target.files?.[0] || null }));

//   useEffect(() => {
//     if (!childForm.photoFile) {
//       setPreview(null);
//       return;
//     }
//     const url = URL.createObjectURL(childForm.photoFile);
//     setPreview(url);
//     return () => URL.revokeObjectURL(url);
//   }, [childForm.photoFile]);

//   const handleViewChild = (child) => {
//     setSelectedChild(child);
//     setOpenCard(true);
//   };

//   // ====== Load data ======
//   const loadParents = async () => {
//     try {
//       const res = await API.get('/users/parents');
//       setParents(res.data?.data || []);
//     } catch (err) {
//       console.error('Erreur chargement des parents', err);
//     }
//   };
//   const loadChildren = async () => {
//     try {
//       const res = await API.get('/users/children');
//       setChildren(res.data || []);
//     } catch (err) {
//       console.error('Erreur chargement des enfants', err);
//     }
//   };

//   useEffect(() => {
//     loadParents();
//     loadChildren();
//   }, []);

//   // ====== Create parent ======
//   const canCreateParent =
//     parentForm.name.trim().length > 1 &&
//     phoneDigits.length === 8 &&
//     parentPass.length >= 4;

//   const handleCreateParent = async () => {
//     if (!canCreateParent) return;
//     try {
//       setLoading(true);
//       await API.post('/auth/register', {
//         name: parentForm.name.trim(),
//         phone: `+227${phoneDigits}`,
//         password: parentPass,
//         role: 'parent',
//       });

//       setMessage('✅ Parent créé avec succès');
//       setParentForm({ name: '' });
//       setPhoneDigits('');
//       setParentPass('');
//       setShowParentPass(false);
//       await loadParents();
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Erreur lors de la création du parent');
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage(''), 4000);
//     }
//   };

//   // ====== Create child ======
//   const canCreateChild =
//     childForm.name.trim().length > 0 &&
//     childForm.birthDate &&
//     childForm.gender &&
//     childForm.parent;

//   const handleCreateChild = async () => {
//     if (!canCreateChild) return;
//     try {
//       setLoading(true);

//       const fd = new FormData();
//       fd.append('name', childForm.name.trim());
//       fd.append('birthDate', childForm.birthDate);
//       fd.append('gender', childForm.gender);
//       fd.append('parent', childForm.parent);
//       fd.append('balance', childForm.balance || 0);
//       if (childForm.photoFile) fd.append('photo', childForm.photoFile);

//       await API.post('/users/children', fd, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setMessage('✅ Enfant créé avec succès');
//       setChildForm({
//         name: '',
//         birthDate: '',
//         gender: 'masculin',
//         parent: '',
//         balance: '',
//         photoFile: null,
//       });
//       setPreview(null);
//       await loadChildren();
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Erreur lors de la création de l’enfant');
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage(''), 4000);
//     }
//   };

//   // ====== Derived lists ======
//   const parentsSorted = useMemo(
//     () => [...parents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
//     [parents]
//   );

//   // Table des parents (pagination simple)
//   const parentTotalPages = Math.max(1, Math.ceil(parentsSorted.length / PARENTS_PER_PAGE));
//   const parentSlice = parentsSorted.slice(
//     (parentPage - 1) * PARENTS_PER_PAGE,
//     parentPage * PARENTS_PER_PAGE
//   );

//   // Liste des parents filtrés pour “Enfants par parent”
//   const filteredParents = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     if (!q) return parentsSorted.slice(0, 20); // derniers 20 par défaut
//     return parentsSorted.filter(
//       (p) =>
//         (p.name || '').toLowerCase().includes(q) ||
//         (p.phone || '').toLowerCase().includes(q)
//     );
//   }, [searchTerm, parentsSorted]);

//   const filteredTotalPages = Math.max(
//     1,
//     Math.ceil(filteredParents.length / PARENTS_PER_CHILD_PAGE)
//   );
//   const filteredSlice = filteredParents.slice(
//     (childPage - 1) * PARENTS_PER_CHILD_PAGE,
//     childPage * PARENTS_PER_CHILD_PAGE
//   );

//   // ====== UI ======
//   return (
//     <Box>
//       {/* ===== Section: Créer un parent ===== */}
//       <Stack spacing={0.5} sx={{ mb: 2 }}>
//         <Typography variant="h6" fontWeight={900}>👨‍👩‍👧 Créer un parent</Typography>
//         <Typography variant="body2" color="text.secondary">
//           Le téléphone est saisi au format <b>+227XXXXXXXX</b> (8 chiffres).
//         </Typography>
//       </Stack>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <TextField
//             label="Nom"
//             name="name"
//             value={parentForm.name}
//             onChange={handleParentChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField
//             label="Téléphone (+227)"
//             value={phoneDigits}
//             onChange={handleParentPhoneChange}
//             placeholder="96648383"
//             fullWidth
//             required
//             inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 8 }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Typography sx={{ fontWeight: 700, color: brand.green }}>+227</Typography>
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <PhoneIphoneRoundedIcon sx={{ color: brand.green }} />
//                 </InputAdornment>
//               ),
//             }}
//             helperText="Entrez uniquement les 8 chiffres."
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField
//             label="Mot de passe"
//             type={showParentPass ? 'text' : 'password'}
//             value={parentPass}
//             onChange={(e) => setParentPass(e.target.value)}
//             fullWidth
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockRoundedIcon sx={{ color: brand.green }} />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowParentPass((v) => !v)} edge="end">
//                     {showParentPass ? <VisibilityIcon /> : <LockRoundedIcon sx={{ opacity: 0.6 }} />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           {message && (
//             <Alert severity={message.startsWith('✅') ? 'success' : 'error'} sx={{ mb: 1 }}>
//               {message}
//             </Alert>
//           )}
//           <Button
//             variant="contained"
//             onClick={handleCreateParent}
//             disabled={!canCreateParent || loading}
//             fullWidth
//             sx={{
//               py: 1.4,
//               fontWeight: 800,
//               borderRadius: 2,
//               textTransform: 'none',
//               bgcolor: brand.orange,
//               '&:hover': { bgcolor: '#E4601F' },
//             }}
//           >
//             {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Créer le parent'}
//           </Button>
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 3 }} />

//       {/* ===== Section: Créer un enfant ===== */}
//       <Stack spacing={0.5} sx={{ mb: 2 }}>
//         <Typography variant="h6" fontWeight={900}>👶 Créer un enfant et l’associer à un parent</Typography>
//         <Typography variant="body2" color="text.secondary">
//           Associez un parent existant et définissez un solde initial si nécessaire.
//         </Typography>
//       </Stack>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <TextField
//             label="Nom de l’enfant"
//             name="name"
//             value={childForm.name}
//             onChange={handleChildChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             label="Date de naissance"
//             name="birthDate"
//             type="date"
//             value={childForm.birthDate}
//             onChange={handleChildChange}
//             fullWidth
//             required
//             InputLabelProps={{ shrink: true }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <TodayRoundedIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Stack spacing={0.5}>
//             <ToggleButtonGroup
//               exclusive
//               size="small"
//               value={childForm.gender}
//               onChange={(_e, v) => v && setChildForm((p) => ({ ...p, gender: v }))}
//             >
//               <ToggleButton value="masculin"><WcRoundedIcon sx={{ mr: 0.5 }} />Masculin</ToggleButton>
//               <ToggleButton value="féminin"><WcRoundedIcon sx={{ mr: 0.5 }} />Féminin</ToggleButton>
//             </ToggleButtonGroup>
//           </Stack>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             label="Solde initial (FCFA)"
//             name="balance"
//             type="number"
//             value={childForm.balance}
//             onChange={handleChildChange}
//             fullWidth
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Stack direction="row" spacing={2} alignItems="center">
//             <Button
//               variant="outlined"
//               component="label"
//               startIcon={<CloudUploadRoundedIcon />}
//               sx={{ textTransform: 'none', flexShrink: 0 }}
//             >
//               Choisir une photo
//               <input hidden type="file" accept="image/*" onChange={handleFileChange} />
//             </Button>
//             {preview ? (
//               <Avatar src={preview} alt="Photo" sx={{ width: 48, height: 48 }} />
//             ) : (
//               <Avatar sx={{ width: 48, height: 48, bgcolor: brand.green, color: '#fff' }}>
//                 {childForm.name?.[0]?.toUpperCase() || '🙂'}
//               </Avatar>
//             )}
//           </Stack>
//           {childForm.photoFile && (
//             <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
//               Fichier sélectionné : {childForm.photoFile.name}
//             </Typography>
//           )}
//         </Grid>

//         <Grid item xs={12} md={6}>
//           {/* Autocomplete parent */}
//           <Autocomplete
//             options={parents}
//             getOptionLabel={(p) => `${p.name || ''} — ${p.phone || ''}`}
//             value={parents.find((p) => p._id === childForm.parent) || null}
//             onChange={(_e, val) => setChildForm((prev) => ({ ...prev, parent: val?._id || '' }))}
//             renderInput={(params) => (
//               <TextField {...params} label="Parent associé" fullWidth required />
//             )}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             onClick={handleCreateChild}
//             disabled={!canCreateChild || loading}
//             fullWidth
//             sx={{
//               py: 1.4,
//               fontWeight: 800,
//               borderRadius: 2,
//               textTransform: 'none',
//               bgcolor: brand.orange,
//               '&:hover': { bgcolor: '#E4601F' },
//             }}
//           >
//             {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Créer l’enfant'}
//           </Button>
//         </Grid>
//       </Grid>

//       {message && (
//         <Alert severity={message.startsWith('✅') ? 'success' : 'error'} sx={{ mt: 2 }}>
//           {message}
//         </Alert>
//       )}

//       {/* ===== Liste des parents (table) ===== */}
//       <Divider sx={{ my: 3 }} />
//       <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
//         📋 Liste des parents
//       </Typography>

//       {parentsSorted.length === 0 ? (
//         <Typography>Aucun parent trouvé</Typography>
//       ) : (
//         <Box>
//           <Box sx={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: 2 }}>
//             <Table sx={{ minWidth: 720 }}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#F7F9FC' }}>
//                   <TableCell>#</TableCell>
//                   <TableCell>Nom</TableCell>
//                   <TableCell>Téléphone</TableCell>
//                   <TableCell>Date de création</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {parentSlice.map((parent, idx) => (
//                   <TableRow key={parent._id} hover>
//                     <TableCell>{(parentPage - 1) * PARENTS_PER_PAGE + idx + 1}</TableCell>
//                     <TableCell>
//                       <Stack direction="row" spacing={1} alignItems="center">
//                         <Avatar sx={{ width: 28, height: 28, bgcolor: brand.green, color: '#fff' }}>
//                           {parent.name?.[0]?.toUpperCase() || '🙂'}
//                         </Avatar>
//                         <Typography fontWeight={700}>{parent.name}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
//                       {parent.phone}
//                     </TableCell>
//                     <TableCell>
//                       {parent.createdAt ? new Date(parent.createdAt).toLocaleDateString() : '—'}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>

//           <Box mt={2} display="flex" justifyContent="center">
//             <Pagination
//               count={parentTotalPages}
//               page={parentPage}
//               onChange={(_e, val) => setParentPage(val)}
//               color="primary"
//             />
//           </Box>
//         </Box>
//       )}

//       {/* ===== Enfants par parent ===== */}
//       <Divider sx={{ my: 3 }} />
//       <Typography variant="h6" fontWeight={900}>🧒 Liste des enfants et leur parent</Typography>

//       <TextField
//         placeholder="🔍 Rechercher un parent (nom ou téléphone)…"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         fullWidth
//         sx={{ my: 1.5 }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchRoundedIcon />
//             </InputAdornment>
//           ),
//         }}
//       />

//       {filteredParents.length === 0 ? (
//         <Typography>Aucun parent trouvé</Typography>
//       ) : (
//         <Stack spacing={2}>
//           {filteredSlice.map((parent) => {
//             const parentChildren = children.filter((c) => c.parent?._id === parent._id);
//             return (
//               <Paper key={parent._id} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
//                 <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
//                   <ExpandMoreRoundedIcon sx={{ color: brand.green }} />
//                   <Typography variant="subtitle1" fontWeight={800}>
//                     {parent.name} — {parent.phone}
//                   </Typography>
//                   <Chip
//                     size="small"
//                     label={`${parentChildren.length} enfant${parentChildren.length > 1 ? 's' : ''}`}
//                     sx={{ ml: 'auto' }}
//                   />
//                 </Stack>

//                 {parentChildren.length === 0 ? (
//                   <Typography color="text.secondary" sx={{ pl: 4 }}>
//                     Aucun enfant associé.
//                   </Typography>
//                 ) : (
//                   <Box sx={{ pl: { xs: 0, md: 1 } }}>
//                     <Table size="small" sx={{ mt: 1 }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>#</TableCell>
//                           <TableCell>Nom</TableCell>
//                           <TableCell>Date de naissance</TableCell>
//                           <TableCell>Sexe</TableCell>
//                           <TableCell align="center">Fiche</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {parentChildren.map((child, index) => (
//                           <TableRow key={child._id} hover>
//                             <TableCell>{index + 1}</TableCell>
//                             <TableCell>
//                               <Stack direction="row" spacing={1} alignItems="center">
//                                 <Avatar
//                                   src={child.photo || undefined}
//                                   sx={{ width: 28, height: 28, bgcolor: brand.green, color: '#fff' }}
//                                 >
//                                   {child.name?.[0]?.toUpperCase() || '🙂'}
//                                 </Avatar>
//                                 <Typography fontWeight={700}>{child.name}</Typography>
//                               </Stack>
//                             </TableCell>
//                             <TableCell>{child.birthDate ? new Date(child.birthDate).toLocaleDateString() : '—'}</TableCell>
//                             <TableCell>
//                               <Chip
//                                 size="small"
//                                 label={child.gender || '—'}
//                                 color={child.gender === 'féminin' ? 'secondary' : 'default'}
//                                 variant="outlined"
//                               />
//                             </TableCell>
//                             <TableCell align="center">
//                               <IconButton color="primary" size="small" onClick={() => handleViewChild(child)}>
//                                 <VisibilityIcon />
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </Box>
//                 )}
//               </Paper>
//             );
//           })}
//         </Stack>
//       )}

//       <Box mt={2} display="flex" justifyContent="center">
//         <Pagination
//           count={filteredTotalPages}
//           page={childPage}
//           onChange={(_e, val) => setChildPage(val)}
//           color="primary"
//         />
//       </Box>

//       {/* Modal fiche enfant */}
//       <ChildCardModal open={openCard} onClose={() => setOpenCard(false)} child={selectedChild} />
//     </Box>
//   );
// };

// export default CreateParentChildForm;






import React, { useEffect, useMemo, useState } from 'react';
import {
  Box, Grid, TextField, Button, Typography, Divider, Stack, InputAdornment,
  IconButton, Alert, CircularProgress, ToggleButtonGroup, ToggleButton, Avatar,
  Chip, Table, TableHead, TableBody, TableRow, TableCell, Pagination,
  Autocomplete, Paper,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import API from '../../services/api';
import ChildCardModal from '../../components/ChildCardModal';

const brand = { green: '#11693A', orange: '#F26B21', cream: '#F7F5F0' };
const formatFCFA = (n) =>
  `${Number(n || 0).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA`;

const PARENTS_PER_PAGE = 5;
const PARENTS_PER_CHILD_PAGE = 5;

// 🔹 Helpers image (gère absolu/relatif + fallback)
const FALLBACK_IMG = 'https://via.placeholder.com/48?text=?';
const BASE_ORIGIN = (API.defaults?.baseURL || '').replace(/\/api\/?$/, '');
const toPublicUrl = (p) => {
  if (!p) return FALLBACK_IMG;
  if (/^https?:\/\//i.test(p)) return p;         // Cloudinary
  if (p.startsWith('/')) return `${BASE_ORIGIN}${p}`; // Chemin relatif serveur
  return `${BASE_ORIGIN}/${p}`;
};

const CreateParentChildForm = () => {
  // ====== Parent form ======
  const [parentForm, setParentForm] = useState({ name: '' });
  const [phoneDigits, setPhoneDigits] = useState(''); // 8 chiffres locaux
  const [parentPass, setParentPass] = useState('');
  const [showParentPass, setShowParentPass] = useState(false);

  // ====== Child form ======
  const [childForm, setChildForm] = useState({
    name: '',
    birthDate: '',
    gender: 'masculin',
    parent: '',    // parent _id
    balance: '',
    photoFile: null,
  });
  const [preview, setPreview] = useState(null);

  // ====== Data ======
  const [parents, setParents] = useState([]);   // /users/parents => data.data
  const [children, setChildren] = useState([]); // /users/children => array

  // ====== UI ======
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ====== Lists & filters ======
  const [parentPage, setParentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [childPage, setChildPage] = useState(1);

  // ====== Modal ======
  const [openCard, setOpenCard] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);

  const sanitizeDigits = (v) => v.replace(/\D/g, '');
  const handleParentPhoneChange = (e) =>
    setPhoneDigits(sanitizeDigits(e.target.value).slice(0, 8));
  const handleParentChange = (e) =>
    setParentForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleChildChange = (e) =>
    setChildForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleFileChange = (e) =>
    setChildForm((p) => ({ ...p, photoFile: e.target.files?.[0] || null }));

  useEffect(() => {
    if (!childForm.photoFile) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(childForm.photoFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [childForm.photoFile]);

  const handleViewChild = (child) => {
    setSelectedChild(child);
    setOpenCard(true);
  };

  // ====== Load data ======
  const loadParents = async () => {
    try {
      const res = await API.get('/users/parents'); // garde cette route si le caissier doit y accéder
      setParents(res.data?.data || []);
    } catch (err) {
      console.error('Erreur chargement des parents', err);
    }
  };
  const loadChildren = async () => {
    try {
      const res = await API.get('/users/children'); // idem : accessible au caissier
      setChildren(res.data || []);
    } catch (err) {
      console.error('Erreur chargement des enfants', err);
    }
  };

  useEffect(() => {
    loadParents();
    loadChildren();
  }, []);

  // ====== Create parent ======
  const canCreateParent =
    parentForm.name.trim().length > 1 &&
    phoneDigits.length === 8 &&
    parentPass.length >= 4;

  const handleCreateParent = async () => {
    if (!canCreateParent) return;
    try {
      setLoading(true);
      await API.post('/auth/register', {
        name: parentForm.name.trim(),
        phone: `+227${phoneDigits}`,
        password: parentPass,
        role: 'parent',
      });

      setMessage('✅ Parent créé avec succès');
      setParentForm({ name: '' });
      setPhoneDigits('');
      setParentPass('');
      setShowParentPass(false);
      await loadParents();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la création du parent');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  // ====== Create child ======
  const canCreateChild =
    childForm.name.trim().length > 0 &&
    childForm.birthDate &&
    childForm.gender &&
    childForm.parent;

  const handleCreateChild = async () => {
    if (!canCreateChild) return;
    try {
      setLoading(true);

      const fd = new FormData();
      fd.append('name', childForm.name.trim());
      fd.append('birthDate', childForm.birthDate);
      fd.append('gender', childForm.gender);
      fd.append('parent', childForm.parent);
      if (childForm.balance !== '') fd.append('balance', childForm.balance);
      if (childForm.photoFile) fd.append('photo', childForm.photoFile);

      // 🔹 Si tu passes aux routes /children, remplace ci-dessous :
      // await API.post('/children', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      await API.post('/users/children', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('✅ Enfant créé avec succès');
      setChildForm({
        name: '',
        birthDate: '',
        gender: 'masculin',
        parent: '',
        balance: '',
        photoFile: null,
      });
      setPreview(null);
      await loadChildren();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la création de l’enfant');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  // ====== Derived lists ======
  const parentsSorted = useMemo(
    () => [...parents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [parents]
  );

  // Table des parents (pagination simple)
  const parentTotalPages = Math.max(1, Math.ceil(parentsSorted.length / PARENTS_PER_PAGE));
  const parentSlice = parentsSorted.slice(
    (parentPage - 1) * PARENTS_PER_PAGE,
    parentPage * PARENTS_PER_PAGE
  );

  // Liste des parents filtrés pour “Enfants par parent”
  const filteredParents = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return parentsSorted.slice(0, 20);
    return parentsSorted.filter(
      (p) =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.phone || '').toLowerCase().includes(q)
    );
  }, [searchTerm, parentsSorted]);

  const filteredTotalPages = Math.max(
    1,
    Math.ceil(filteredParents.length / PARENTS_PER_CHILD_PAGE)
  );
  const filteredSlice = filteredParents.slice(
    (childPage - 1) * PARENTS_PER_CHILD_PAGE,
    childPage * PARENTS_PER_CHILD_PAGE
  );

  return (
    <Box>
      {/* ===== Créer un parent ===== */}
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={900}>👨‍👩‍👧 Créer un parent</Typography>
        <Typography variant="body2" color="text.secondary">
          Le téléphone est saisi au format <b>+227XXXXXXXX</b> (8 chiffres).
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {/* … (inchangé) */}
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* ===== Créer un enfant ===== */}
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={900}>👶 Créer un enfant et l’associer à un parent</Typography>
        <Typography variant="body2" color="text.secondary">
          Associez un parent existant et définissez un solde initial si nécessaire.
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {/* … (inchangé jusqu’à l’avatar) */}

        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadRoundedIcon />}
              sx={{ textTransform: 'none', flexShrink: 0 }}
            >
              Choisir une photo
              <input hidden type="file" accept="image/*" onChange={handleFileChange} />
            </Button>
            {preview ? (
              <Avatar src={preview} alt="Photo" sx={{ width: 48, height: 48 }} />
            ) : (
              <Avatar sx={{ width: 48, height: 48, bgcolor: brand.green, color: '#fff' }}>
                {childForm.name?.[0]?.toUpperCase() || '🙂'}
              </Avatar>
            )}
          </Stack>
          {childForm.photoFile && (
            <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
              Fichier sélectionné : {childForm.photoFile.name}
            </Typography>
          )}
        </Grid>

        {/* … (suite inchangée) */}
      </Grid>

      {message && (
        <Alert severity={message.startsWith('✅') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}

      {/* ===== Liste des parents ===== */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
        📋 Liste des parents
      </Typography>
      {/* … (inchangé) */}

      {/* ===== Enfants par parent ===== */}
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" fontWeight={900}>🧒 Liste des enfants et leur parent</Typography>

      {/* … (champ de recherche inchangé) */}

      <Stack spacing={2}>
        {filteredSlice.map((parent) => {
          const parentChildren = children.filter((c) => c.parent?._id === parent._id);
          return (
            <Paper key={parent._id} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
              {/* … */}
              <Table size="small" sx={{ mt: 1 }}>
                <TableHead>{/* … */}</TableHead>
                <TableBody>
                  {parentChildren.map((child, index) => (
                    <TableRow key={child._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {/* 🔹 ICI : toPublicUrl pour gérer Cloudinary + fallback */}
                          <Avatar
                            src={toPublicUrl(child.photo)}
                            sx={{ width: 28, height: 28, bgcolor: brand.green, color: '#fff' }}
                            imgProps={{
                              crossOrigin: 'anonymous',
                              referrerPolicy: 'no-referrer',
                              onError: (e) => { e.currentTarget.src = FALLBACK_IMG; },
                            }}
                          >
                            {(!child.photo && (child.name?.[0]?.toUpperCase())) || '🙂'}
                          </Avatar>
                          <Typography fontWeight={700}>{child.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{child.birthDate ? new Date(child.birthDate).toLocaleDateString() : '—'}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={child.gender || '—'}
                          color={child.gender === 'féminin' ? 'secondary' : 'default'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" size="small" onClick={() => handleViewChild(child)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          );
        })}
      </Stack>

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={filteredTotalPages}
          page={childPage}
          onChange={(_e, val) => setChildPage(val)}
          color="primary"
        />
      </Box>

      {/* Modal fiche enfant */}
      <ChildCardModal open={openCard} onClose={() => setOpenCard(false)} child={selectedChild} />
    </Box>
  );
};

export default CreateParentChildForm;
