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
//   IconButton,
//   MenuItem,
//   Chip
// } from '@mui/material';
// import { Edit, Delete, ToggleOn, ToggleOff } from '@mui/icons-material';
// import { Dialog, DialogTitle, DialogContent } from '@mui/material';
// import QrCodeIcon from '@mui/icons-material/QrCode';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';

// import API from '../services/api';



// const ChildManagementPage = () => {
//   const [children, setChildren] = useState([]);

//   const [parents, setParents] = useState([]);
//   const [form, setForm] = useState({ name: '', birthDate: '', gender: '',  parent: '',  photo: '', });

//   const [editingId, setEditingId] = useState(null);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
// const [qrCode, setQrCode] = useState('');

// const [selectedChild, setSelectedChild] = useState(null);


// const [openRechargeModal, setOpenRechargeModal] = useState(false); // contrôle de la modale
// const [rechargeAmount, setRechargeAmount] = useState(''); // montant à recharger

// const [loadingParents, setLoadingParents] = useState(false);

// const [openQrModal, setOpenQrModal] = useState(false);

//   const token = localStorage.getItem('token');

//   const loadChildren = async () => {
//     const data = await API.get('/children').then(res => res.data);
//     setChildren(data);    
//   };



// const loadParents = async () => {
//   try {
//    const data = await API.get('/users?role=parent').then(res => res.data);
//     setParents(data);
//   } catch (err) {
//     console.error('Erreur chargement parents:', err);
//   }
// };

// useEffect(() => {
//   loadChildren();
//   loadParents(); // ← toujours appelée
// }, []);



// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setForm({ ...form, [name]: value });
// };


//   const handlePhotoUpload = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onloadend = () => {
//     setForm((prev) => ({
//       ...prev,
//       photo: reader.result, // image encodée en base64
//     }));
//   };
//   reader.readAsDataURL(file);
// };


 






// const fetchMatchingParents = async (query) => {
//   if (!query || query.length < 2) return; // attendre au moins 2 lettres
//   setLoadingParents(true);
//   try {

//     const data = await API.get(`/users?role=parent&search=${encodeURIComponent(query)}`).then(res => res.data);

//     setParents(data);
//   } catch (err) {
//     console.error('Erreur chargement parents', err);
//   } finally {
//     setLoadingParents(false);
//   }
// };



// const handleSubmit = async () => {
//   try {
//     setLoading(true);

//     if (editingId) {
//       const updated = await API.put(`/children/${editingId}`, form).then(res => res.data);

//       // Peupler le parent après modification
//       if (form.parent) {
//         const parentObj = parents.find(p => p._id === form.parent);
//         updated.parent = parentObj;
//       }

//       setChildren(children.map(c => c._id === editingId ? updated : c));
//       setMessage('✅ Enfant modifié avec succès');
//     } else {
//       const created = await API.post('/children', form).then(res => res.data);

//       // Peupler le parent après création
//       if (form.parent) {
//         const parentObj = parents.find(p => p._id === form.parent);
//         created.parent = parentObj;
//       }

//       setChildren([created, ...children]);
//       setMessage('✅ Enfant créé avec succès');
//     }

//     // Réinitialiser le formulaire
//     setForm({
//       name: '',
//       birthDate: '',
//       gender: '',
//       parent: '',
//       photo: ''
//     });

//     setEditingId(null);
//   } catch (err) {
//     setMessage(err.response?.data?.message || 'Erreur');
//   } finally {
//     setLoading(false);
//   }
// };



// const onEdit = (child) => {
//   setForm({
//     name: child.name,
//     birthDate: child.birthDate?.split('T')[0],
//     gender: child.gender,
  
//     parent: child.parent?._id || '', // ✅ ici
//     photo: child.photo || ''
//   });

//   setEditingId(child._id);
// };







//   const onDelete = async (id) => {
//     // await deleteChild(id, token);
//     await API.delete(`/children/${id}`);
//     setChildren(children.filter(c => c._id !== id));
//   };

//   const onToggle = async (id) => {
//     // await toggleChildStatus(id, token);
//     await API.patch(`/children/${id}/status`);

//     loadChildren();
//   };



// const calculateAge = (birthDate) => {
//   if (!birthDate) return '-';
//   const diff = Date.now() - new Date(birthDate).getTime();
//   return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // âge en années
// };








// const handleOpenQrModal = async (child) => {
//   setSelectedChild(child);
//   try {
//     // const qr = await fetchChildQrCode(child._id, token);
//     const qr = await API.get(`/children/${child._id}/qrcode`).then(res => res.data.qrCode);

//     setQrCode(qr);
//     setOpenQrModal(true);
//   } catch (error) {
//     console.error('Erreur QR Code:', error);
//   }
// };


// const handleOpenRechargeModal = (child) => {
//   setSelectedChild(child); // enfant sélectionné
//   setRechargeAmount(''); // réinitialiser le champ montant
//   setOpenRechargeModal(true); // ouvrir la modale
// };



// const handleRecharge = async () => {
//   try {
//     // await rechargeChild(selectedChild._id, Number(rechargeAmount), token);
//     await API.post(`/children/${selectedChild._id}/recharge`, { amount: Number(rechargeAmount) });

//     await loadChildren();
//     setMessage('✅ Solde rechargé');
//     setOpenRechargeModal(false);
//   } catch (err) {
//     setMessage(err.response?.data?.message || 'Erreur lors du rechargement');
//   }
// };





//   return (
//     <Box p={4}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         👶 Gestion des enfants
//       </Typography>

//       <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           {editingId ? 'Modifier un enfant' : 'Ajouter un enfant'}
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={3}>
//             <TextField name="name" label="Nom" fullWidth value={form.name} onChange={handleChange} />
//           </Grid>


//           <Grid item xs={12} sm={3}>
//         <TextField
//           name="birthDate"
//           label="Date de naissance"
//           type="date"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           value={form.birthDate}
//           onChange={handleChange}
//         />
//       </Grid>



//           <Grid item xs={12} sm={3}>
//             <TextField select name="gender" label="Genre" fullWidth value={form.gender} onChange={handleChange}>
//              <MenuItem value="masculin">Garçon</MenuItem>
//               <MenuItem value="féminin">Fille</MenuItem>

//             </TextField>
//           </Grid>

//         <Grid item xs={12} sm={4}>
//   <Autocomplete
//     freeSolo
//     value={form.parentObj || null}
//     inputValue={form.parentInput || ''}
//     onInputChange={(e, newInputValue) => {
//       setForm((prev) => ({ ...prev, parentInput: newInputValue }));
//       fetchMatchingParents(newInputValue);
//     }}
//     onChange={(e, newValue) => {
//       setForm((prev) => ({
//         ...prev,
//         parent: newValue?._id || '',
//         parentObj: newValue || null,
//       }));
//     }}
//     options={parents}
//     getOptionLabel={(option) => option.name + ' - ' + option.phone}
//     loading={loadingParents}
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         label="Chercher un parent"
//         InputProps={{
//           ...params.InputProps,
//           endAdornment: (
//             <>
//               {loadingParents ? <CircularProgress color="inherit" size={20} /> : null}
//               {params.InputProps.endAdornment}
//             </>
//           ),
//         }}
//       />
//     )}
//   />
// </Grid>



      


//  {/* ➕ Ajoute juste après ces champs : */}
//     <Grid item xs={12} sm={4}>
//       <Button
//         variant="contained"
//         component="label"
//         fullWidth
//       >
//         Upload Photo
//         <input
//           type="file"
//           hidden
//           accept="image/*"
//           onChange={(e) => handlePhotoUpload(e)}
//         />
//       </Button>



//       {form.photo && (
//   <Box mt={2}>
//     <img
//       src={form.photo}
//       alt="Preview"
//       style={{ width: 100, height: 100, borderRadius: '50%' }}
//     />
//   </Box>
// )}

//     </Grid>





          
//           <Grid item xs={12}>





//             <Button variant="contained" onClick={handleSubmit} disabled={loading}>
//               {editingId ? 'Mettre à jour' : 'Ajouter'}
//             </Button>
//             {message && (
//               <Typography mt={2} color={message.startsWith('✅') ? 'green' : 'error'}>
//                 {message}
//               </Typography>
//             )}
//           </Grid>          
//         </Grid>
//       </Paper>

//       <Paper sx={{ p: 3, borderRadius: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           📋 Liste des enfants
//         </Typography>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Nom</TableCell>
//               <TableCell>Âge</TableCell>
//               <TableCell>Genre</TableCell>
          
//               <TableCell>Parent</TableCell>
//                <TableCell>Solde</TableCell>
//               <TableCell>Statut</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {children.map((child) => (
//               <TableRow key={child._id}>
//                 <TableCell>{child.name}</TableCell>
//                <TableCell>{calculateAge(child.birthDate)} ans</TableCell>

//                 <TableCell>{child.gender}</TableCell>



//                 <TableCell>{child.parent?.name || '-'}</TableCell>

//                 <TableCell>{child.balance != null ? `${child.balance.toLocaleString()} F` : '0 F'}</TableCell>

//                 <TableCell>                
//                   <Chip label={child.isActive ? 'Actif' : 'Inactif'} color={child.isActive ? 'success' : 'default'} />
//                 </TableCell>
                
//                 <TableCell align="right">
//                   <IconButton onClick={() => onEdit(child)}><Edit /></IconButton>
//                   <IconButton onClick={() => onToggle(child._id)}>{child.isActive ? <ToggleOff /> : <ToggleOn />}</IconButton>
//                   <IconButton onClick={() => onDelete(child._id)}><Delete color="error" /></IconButton>
//                   <IconButton onClick={() => handleOpenRechargeModal(child)}><MonetizationOnIcon /></IconButton>

//               <IconButton onClick={() => handleOpenQrModal(child)}>
//   <QrCodeIcon />
// </IconButton>


                
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

// <>
//   {/* Style d’impression : afficher uniquement la modale */}
//   <style>
//     {`
//       @media print {
//         body * {
//           visibility: hidden;
//         }
//         .MuiDialog-root, .MuiDialog-root * {
//           visibility: visible !important;
//         }
//         .MuiDialog-paper {
//           box-shadow: none !important;
//         }
//       }
//     `}
//   </style>

//   <Dialog open={openQrModal} onClose={() => setOpenQrModal(false)} maxWidth="xs" fullWidth>
//   <DialogTitle>Carte de Jeux </DialogTitle>
//   <DialogContent>
//     {selectedChild && (
//       <Box
//         sx={{
//           border: '2px solid #ccc',
//           borderRadius: 2,
//           padding: 2,
//           backgroundColor: '#fafafa',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         {/* Zone principale : photo + infos */}
//         <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
//           {/* Photo */}
//           <Box sx={{ flex: 1 }}>
//             <img
//               src={
//                 selectedChild.photo && selectedChild.photo !== ''
//                   ? selectedChild.photo
//                   : 'https://via.placeholder.com/100'
//               }
//               alt="Photo de l'enfant"
//               style={{
//                 width: '100px',
//                 height: '100px',
//                 borderRadius: '8px',
//                 objectFit: 'cover',
//                 border: '2px solid #999'
//               }}
//             />
//           </Box>

//           {/* Infos texte */}
//           <Box sx={{ flex: 2, pl: 2 }}>
//             <Typography variant="subtitle1" fontWeight="bold">{selectedChild.name}</Typography>
//             <Typography variant="body2">
//               Âge : {
//                 selectedChild.birthDate
//                   ? Math.floor((new Date() - new Date(selectedChild.birthDate)) / (1000 * 60 * 60 * 24 * 365.25))
//                   : 'Non défini'
//               } ans
//             </Typography>
//             <Typography variant="body2">
//               Parent : {selectedChild.parent?.name || 'Non défini'}
//             </Typography>
//             <Typography variant="body2">
//               Solde initial: {selectedChild.balance != null ? `${selectedChild.balance.toLocaleString()} F` : '0 F'}
//             </Typography>
//           </Box>
//         </Box>

//         {/* QR Code */}
//         {qrCode && (
//           <Box sx={{ mt: 1, mb: 1 }}>
//             <img src={qrCode} alt="QR Code" style={{ width: '160px' }} />
//           </Box>
//         )}

//         {/* Code visible */}
//         {selectedChild.codeVisible && (
//           <Box sx={{
//             mt: 1,
//             px: 2,
//             py: 1,
//             backgroundColor: '#eee',
//             borderRadius: 1,
//             fontWeight: 'bold',
//             color: '#333',
//           }}>
//             Code visible : {selectedChild.codeVisible}
//           </Box>
//         )}
//       </Box>
//     )}

//     {/* Bouton imprimer (non affiché à l'impression) */}
//     <Box sx={{ mt: 2, textAlign: 'center', '@media print': { display: 'none' } }}>
//       <Button variant="contained" onClick={() => window.print()}>
//         Imprimer
//       </Button>
//     </Box>
//   </DialogContent>
// </Dialog>

// </>



// <Dialog open={openRechargeModal} onClose={() => setOpenRechargeModal(false)}>
//   <DialogTitle>Recharger le solde</DialogTitle>
//   <DialogContent>
//     <TextField
//       label="Montant"
//       type="number"
//       fullWidth
//       value={rechargeAmount}
//       onChange={(e) => setRechargeAmount(e.target.value)}
//     />
//     <Button variant="contained" onClick={handleRecharge}>Valider</Button>
//   </DialogContent>
// </Dialog>




//     </Box>
//   );
// };

// export default ChildManagementPage;




import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  MenuItem,
  Chip
} from '@mui/material';
import { Edit, Delete, ToggleOn, ToggleOff } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import API from '../services/api';

const ChildManagementPage = () => {
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [form, setForm] = useState({ name: '', birthDate: '', gender: '', parent: '', photo: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [openRechargeModal, setOpenRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [loadingParents, setLoadingParents] = useState(false);
  const [openQrModal, setOpenQrModal] = useState(false);

  // 👉 qui suis-je ?
  const me = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdminUser = me?.role === 'admin';

  // --------- LOADERS ----------
  const loadChildren = async () => {
    // admin → /children ; parent → /children/mine
    const url = isAdminUser ? '/children' : '/children/mine';
    const data = await API.get(url).then(res => res.data);
    setChildren(data);
  };

  const loadParents = async () => {
    if (!isAdminUser) return; // ← parent n'appelle pas cette route (souvent admin-only)
    try {
      const data = await API.get('/users', { params: { role: 'parent' } }).then(res => res.data);
      setParents(data);
    } catch (err) {
      console.error('Erreur chargement parents:', err);
    }
  };

  useEffect(() => {
    loadChildren();
    loadParents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminUser]);

  // --------- FORM ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const fetchMatchingParents = async (query) => {
    if (!isAdminUser) return;
    if (!query || query.length < 2) return;
    setLoadingParents(true);
    try {
      const data = await API.get('/users', { params: { role: 'parent', search: query } }).then(res => res.data);
      setParents(data);
    } catch (err) {
      console.error('Erreur chargement parents', err);
    } finally {
      setLoadingParents(false);
    }
  };

  const handleSubmit = async () => {
    if (!isAdminUser) return; // sécurité UI
    try {
      setLoading(true);
      if (editingId) {
        const updated = await API.put(`/children/${editingId}`, form).then(res => res.data);
        if (form.parent) {
          const parentObj = parents.find(p => p._id === form.parent);
          updated.parent = parentObj;
        }
        setChildren(children.map(c => (c._id === editingId ? updated : c)));
        setMessage('✅ Enfant modifié avec succès');
      } else {
        const created = await API.post('/children', form).then(res => res.data);
        if (form.parent) {
          const parentObj = parents.find(p => p._id === form.parent);
          created.parent = parentObj;
        }
        setChildren([created, ...children]);
        setMessage('✅ Enfant créé avec succès');
      }
      setForm({ name: '', birthDate: '', gender: '', parent: '', photo: '' });
      setEditingId(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (child) => {
    if (!isAdminUser) return;
    setForm({
      name: child.name,
      birthDate: child.birthDate?.split('T')[0] || '',
      gender: child.gender || '',
      parent: child.parent?._id || '',
      photo: child.photo || ''
    });
    setEditingId(child._id);
  };

  const onDelete = async (id) => {
    if (!isAdminUser) return;
    await API.delete(`/children/${id}`);
    setChildren(children.filter(c => c._id !== id));
  };

  const onToggle = async (id) => {
    if (!isAdminUser) return;
    await API.patch(`/children/${id}/status`);
    loadChildren();
  };

  // --------- ACTIONS ENFANT ----------
  const calculateAge = (birthDate) => {
    if (!birthDate) return '-';
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const handleOpenQrModal = async (child) => {
    setSelectedChild(child);
    try {
      // backend doit autoriser: admin OU parent propriétaire
      const qr = await API.get(`/children/${child._id}/qrcode`).then(res => res.data.qrCode);
      setQrCode(qr);
      setOpenQrModal(true);
    } catch (error) {
      console.error('Erreur QR Code:', error);
      setMessage(error.response?.data?.message || 'Accès refusé');
    }
  };

  const handleOpenRechargeModal = (child) => {
    if (!isAdminUser) return;
    setSelectedChild(child);
    setRechargeAmount('');
    setOpenRechargeModal(true);
  };

  const handleRecharge = async () => {
    if (!isAdminUser) return;
    try {
      await API.post(`/children/${selectedChild._id}/recharge`, { amount: Number(rechargeAmount) });
      await loadChildren();
      setMessage('✅ Solde rechargé');
      setOpenRechargeModal(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors du rechargement');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        👶 Gestion des enfants {isAdminUser ? '(Admin)' : '(Parent)'}
      </Typography>

      {/* --- Stats simples --- */}
      <Box display="flex" justifyContent="flex-start" mb={3} gap={2} flexWrap="wrap">
        <Paper elevation={3} sx={{ p: 2, minWidth: 220 }}>
          <Typography variant="body1">👶 Nombre d’enfants</Typography>
          <Typography variant="h6" fontWeight="bold">{children.length}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, minWidth: 220 }}>
          <Typography variant="body1">💰 Solde total</Typography>
          <Typography variant="h6" fontWeight="bold">
            {children.reduce((acc, c) => acc + (c.balance || 0), 0).toLocaleString()} F
          </Typography>
        </Paper>
      </Box>

      {/* --- Formulaire (ADMIN SEULEMENT) --- */}
      {isAdminUser && (
        <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {editingId ? 'Modifier un enfant' : 'Ajouter un enfant'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField name="name" label="Nom" fullWidth value={form.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="birthDate"
                label="Date de naissance"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.birthDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField select name="gender" label="Genre" fullWidth value={form.gender} onChange={handleChange}>
                <MenuItem value="masculin">Garçon</MenuItem>
                <MenuItem value="féminin">Fille</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                freeSolo
                value={form.parentObj || null}
                inputValue={form.parentInput || ''}
                onInputChange={(e, newInputValue) => {
                  setForm(prev => ({ ...prev, parentInput: newInputValue }));
                  fetchMatchingParents(newInputValue);
                }}
                onChange={(e, newValue) => {
                  setForm(prev => ({
                    ...prev,
                    parent: newValue?._id || '',
                    parentObj: newValue || null,
                  }));
                }}
                options={parents}
                getOptionLabel={(option) => `${option.name} - ${option.phone}`}
                loading={loadingParents}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chercher un parent"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingParents ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button variant="contained" component="label" fullWidth>
                Upload Photo
                <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
              </Button>
              {form.photo && (
                <Box mt={2}>
                  <img src={form.photo} alt="Preview" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </Button>
              {message && (
                <Typography mt={2} color={message.startsWith('✅') ? 'green' : 'error'}>
                  {message}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* --- Liste --- */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>📋 Liste des enfants</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Âge</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Solde</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {children.map((child) => (
              <TableRow key={child._id}>
                <TableCell>{child.name}</TableCell>
                <TableCell>{calculateAge(child.birthDate)} ans</TableCell>
                <TableCell>{child.gender}</TableCell>
                <TableCell>{child.parent?.name || '-'}</TableCell>
                <TableCell>{child.balance != null ? `${child.balance.toLocaleString()} F` : '0 F'}</TableCell>
                <TableCell>
                  <Chip label={child.isActive ? 'Actif' : 'Inactif'} color={child.isActive ? 'success' : 'default'} />
                </TableCell>
                <TableCell align="right">
                  {/* Admin-only actions */}
                  {isAdminUser && (
                    <>
                      <IconButton onClick={() => onEdit(child)}><Edit /></IconButton>
                      <IconButton onClick={() => onToggle(child._id)}>{child.isActive ? <ToggleOff /> : <ToggleOn />}</IconButton>
                      <IconButton onClick={() => onDelete(child._id)}><Delete color="error" /></IconButton>
                      <IconButton onClick={() => handleOpenRechargeModal(child)}><MonetizationOnIcon /></IconButton>
                    </>
                  )}
                  {/* QR Code accessible (admin, et parent pour ses enfants) */}
                  <IconButton onClick={() => handleOpenQrModal(child)}><QrCodeIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Impression: afficher la modale seulement */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .MuiDialog-root, .MuiDialog-root * { visibility: visible !important; }
          .MuiDialog-paper { box-shadow: none !important; }
        }
      `}</style>

      {/* Modale QR */}
      <Dialog open={openQrModal} onClose={() => setOpenQrModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Carte de Jeux</DialogTitle>
        <DialogContent>
          {selectedChild && (
            <Box sx={{ border: '2px solid #ccc', borderRadius: 2, p: 2, bgcolor: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <img
                    src={selectedChild.photo || 'https://via.placeholder.com/100'}
                    alt="Photo de l'enfant"
                    style={{ width: 100, height: 100, borderRadius: 8, objectFit: 'cover', border: '2px solid #999' }}
                  />
                </Box>
                <Box sx={{ flex: 2, pl: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">{selectedChild.name}</Typography>
                  <Typography variant="body2">
                    Âge : {selectedChild.birthDate ? Math.floor((new Date() - new Date(selectedChild.birthDate)) / (1000 * 60 * 60 * 24 * 365.25)) : 'Non défini'} ans
                  </Typography>
                  <Typography variant="body2">Parent : {selectedChild.parent?.name || 'Non défini'}</Typography>
                  <Typography variant="body2">Solde initial : {selectedChild.balance != null ? `${selectedChild.balance.toLocaleString()} F` : '0 F'}</Typography>
                </Box>
              </Box>

              {qrCode && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <img src={qrCode} alt="QR Code" style={{ width: 160 }} />
                </Box>
              )}

              {selectedChild.codeVisible && (
                <Box sx={{ mt: 1, px: 2, py: 1, bgcolor: '#eee', borderRadius: 1, fontWeight: 'bold', color: '#333' }}>
                  Code visible : {selectedChild.codeVisible}
                </Box>
              )}
            </Box>
          )}

          <Box sx={{ mt: 2, textAlign: 'center', '@media print': { display: 'none' } }}>
            <Button variant="contained" onClick={() => window.print()}>Imprimer</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Modale Recharge (ADMIN) */}
      <Dialog open={openRechargeModal} onClose={() => setOpenRechargeModal(false)}>
        <DialogTitle>Recharger le solde</DialogTitle>
        <DialogContent>
          <TextField
            label="Montant"
            type="number"
            fullWidth
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleRecharge}>Valider</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ChildManagementPage;
