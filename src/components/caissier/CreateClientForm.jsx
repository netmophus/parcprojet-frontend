// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TablePagination,
// } from '@mui/material';
// import API from '../../services/api';
// import ClientCardModal from '../ClientCardModal';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import IconButton from '@mui/material/IconButton';



// const CreateClientForm = () => {
// const [form, setForm] = useState({
//   name: '',
//   phone: '',
//   password: '',
//   birthDate: '',
//   gender: 'masculin',
//   photoFile: null
// });

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [clients, setClients] = useState([]);

//   // Pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage] = useState(10);

//   const [openCard, setOpenCard] = useState(false);
// const [selectedClient, setSelectedClient] = useState(null);


// const handleViewClient = (client) => {
//   setSelectedClient(client);
//   setOpenCard(true);
// };


//   // const handleChange = (e) => {
//   //   setForm({ ...form, [e.target.name]: e.target.value });
//   // };


//   const handleChange = (e) => {
//   setForm({ ...form, [e.target.name]: e.target.value });
// };

// const handleFileChange = (e) => {
//   setForm({ ...form, photoFile: e.target.files[0] });
// };


//   // const handleSubmit = async () => {
//   //   try {
//   //     setLoading(true);
//   //     console.log("📦 Données envoyées :", form);
//   //     await API.post('/clients/registerWithCard', form);
//   //     setMessage('✅ Client créé avec carte');
//   //     setForm({ name: '', phone: '', password: '' });
//   //     fetchClients();
//   //   } catch (err) {
//   //     console.error('❌ Erreur API :', err.response?.data);
//   //     setMessage(err.response?.data?.message || 'Erreur');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };





//   const handleSubmit = async () => {
//   try {
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('name', form.name);
//     formData.append('phone', form.phone);
//     formData.append('password', form.password);
//     formData.append('birthDate', form.birthDate);
//     formData.append('gender', form.gender);
//     if (form.photoFile) {
//       formData.append('photo', form.photoFile);
//     }

//     await API.post('/clients/registerWithCard', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });

//     setMessage('✅ Client créé avec carte');
//     setForm({ name: '', phone: '', password: '', birthDate: '', gender: 'masculin', photoFile: null });
//     fetchClients();
//   } catch (err) {
//     setMessage(err.response?.data?.message || 'Erreur');
//   } finally {
//     setLoading(false);
//   }
// };



//   const fetchClients = async () => {
//     try {
//       const res = await API.get('/clients');
//       setClients(res.data);
//     } catch (err) {
//       console.error('❌ Erreur chargement clients :', err);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <Paper sx={{ p: 3, borderRadius: 3 }}>
//       <Typography variant="h6" fontWeight="bold" gutterBottom>
//         ➕ Créer un client avec carte
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Nom complet"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//   <TextField
//     label="Date de naissance"
//     name="birthDate"
//     type="date"
//     value={form.birthDate}
//     onChange={handleChange}
//     fullWidth
//     InputLabelProps={{ shrink: true }}
//     required
//   />
// </Grid>

// <Grid item xs={12} sm={6}>
//   <TextField
//     label="Sexe"
//     name="gender"
//     select
//     value={form.gender}
//     onChange={handleChange}
//     SelectProps={{ native: true }}
//     fullWidth
//     required
//   >
//     <option value="masculin">Masculin</option>
//     <option value="féminin">Féminin</option>
//   </TextField>
// </Grid>

// <Grid item xs={12}>
//   <Button
//     variant="outlined"
//     component="label"
//     fullWidth
//   >
//     📸 Sélectionner une photo
//     <input type="file" hidden onChange={handleFileChange} accept="image/*" />
//   </Button>
//   {form.photoFile && (
//     <Typography mt={1} fontSize={14}>
//       Fichier : {form.photoFile.name}
//     </Typography>
//   )}
// </Grid>


//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Téléphone"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             fullWidth
//             required
//             placeholder="+227..."
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Mot de passe"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             fullWidth
//             required
//             type="password"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleSubmit}
//             disabled={loading}
//             sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
//           >
//             {loading ? 'Création en cours...' : 'Créer le client'}
//           </Button>
//           {message && (
//             <Typography mt={2} textAlign="center" color={message.startsWith('✅') ? 'green' : 'error'}>
//               {message}
//             </Typography>
//           )}
//         </Grid>
//       </Grid>

//       {clients.length > 0 && (
//         <Box mt={5}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             📋 Liste des clients avec carte
//           </Typography>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Nom</TableCell>
//                 <TableCell>Sexe</TableCell>
//               <TableCell>Naissance</TableCell>
//               <TableCell>Photo</TableCell>

//                 <TableCell>Téléphone</TableCell>
//                 <TableCell>Code Carte</TableCell>
//                 <TableCell>Solde</TableCell>
//                 <TableCell>Date de création</TableCell>
//                 <TableCell align="center">Fiche</TableCell>

//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {clients
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((client) => (
//                   <TableRow key={client._id}>
//                     <TableCell>{client.user?.name}</TableCell>



//                     <TableCell>{client.gender}</TableCell>
//                     <TableCell>{new Date(client.birthDate).toLocaleDateString()}</TableCell>
//                     <TableCell>
//                       {client.photo ? (
//                         <img
//                           src={client.photo}
//                           alt="Photo"
//                           width="40"
//                           height="40"
//                           style={{ borderRadius: '50%' }}
//                         />
//                       ) : '—'}
//                     </TableCell>

//                     <TableCell>{client.user?.phone}</TableCell>
//                     <TableCell>{client.codeVisible}</TableCell>
//                     <TableCell>{client.balance} FCFA</TableCell>
//                     <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                  
//                   <TableCell align="center">
//                   <IconButton color="primary" onClick={() => handleViewClient(client)}>
//                     <VisibilityIcon />
//                   </IconButton>
//                 </TableCell>

                  
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             component="div"
//             count={clients.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             rowsPerPageOptions={[10]}
//           />
//         </Box>
//       )}




//       <ClientCardModal
//   open={openCard}
//   onClose={() => setOpenCard(false)}
//   client={selectedClient}
// />


//     </Paper>
//   );
// };

// export default CreateClientForm;





import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import API from '../../services/api';
import ClientCardModal from '../ClientCardModal';

const brand = { green: '#11693A', orange: '#F26B21' };

const formatFCFA = (n) =>
  `${Number(n || 0).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA`;

const CreateClientForm = () => {
  // ------- Form state -------
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    gender: 'masculin',
    photoFile: null,
  });
  const [phoneDigits, setPhoneDigits] = useState(''); // 8 chiffres uniquement (ex: 96648383)
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  // ------- UI state -------
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ------- Photo preview -------
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!form.photoFile) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(form.photoFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [form.photoFile]);

  // ------- Clients & table -------
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [openCard, setOpenCard] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const handleViewClient = (client) => {
    setSelectedClient(client);
    setOpenCard(true);
  };

  // ------- Helpers -------
  const sanitizeDigits = (v) => v.replace(/\D/g, '');
  const handleDigitsChange = (e) => setPhoneDigits(sanitizeDigits(e.target.value).slice(0, 8));

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleFileChange = (e) => setForm((p) => ({ ...p, photoFile: e.target.files?.[0] || null }));

  const canSubmit =
    form.name.trim().length > 1 &&
    form.birthDate &&
    (phoneDigits.length === 8) &&
    password.length >= 4;

  // ------- API -------
  const fetchClients = async () => {
    try {
      const res = await API.get('/clients');
      setClients(res.data || []);
    } catch (err) {
      console.error('❌ Erreur chargement clients :', err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('name', form.name.trim());
      fd.append('phone', `+227${phoneDigits}`); // format DB: +227XXXXXXXX
      fd.append('password', password);
      fd.append('birthDate', form.birthDate);
      fd.append('gender', form.gender);
      if (form.photoFile) fd.append('photo', form.photoFile);

      await API.post('/clients/registerWithCard', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('✅ Client créé avec carte');
      setForm({ name: '', birthDate: '', gender: 'masculin', photoFile: null });
      setPhoneDigits('');
      setPassword('');
      setShowPass(false);
      await fetchClients();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  const handleChangePage = (_e, newPage) => setPage(newPage);

  // ------- UI -------
  return (
    <Box>
      {/* Titre section */}
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={900}>➕ Créer un client avec carte</Typography>
        <Typography variant="body2" color="text.secondary">
          Saisissez les informations du client. Le numéro est au format <b>+227XXXXXXXX</b>.
        </Typography>
      </Stack>

      {/* Formulaire */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nom complet"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Date de naissance"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TodayRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={0.5}>          
            <ToggleButtonGroup
              exclusive
              size="small"
              value={form.gender}
              onChange={(_e, v) => v && setForm((p) => ({ ...p, gender: v }))}
            >
              <ToggleButton value="masculin"><WcRoundedIcon sx={{ mr: 0.5 }} />Masculin</ToggleButton>
              <ToggleButton value="féminin"><WcRoundedIcon sx={{ mr: 0.5 }} />Féminin</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadRoundedIcon />}
              sx={{ textTransform: 'none', flexShrink: 0 }}
            >
              Sélectionner une photo
              <input hidden type="file" accept="image/*" onChange={handleFileChange} />
            </Button>
            {preview ? (
              <Avatar src={preview} alt="Photo" sx={{ width: 48, height: 48 }} />
            ) : (
              <Avatar sx={{ width: 48, height: 48, bgcolor: brand.green, color: '#fff' }}>
                {form.name?.[0]?.toUpperCase() || '🙂'}
              </Avatar>
            )}
          </Stack>
          {form.photoFile && (
            <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
              Fichier : {form.photoFile.name}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Téléphone (+227)"
            value={phoneDigits}
            onChange={handleDigitsChange}
            fullWidth
            required
            placeholder="96648383"
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
        </Grid>

        <Grid item xs={12} md={6}>
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
                  <LockRoundedIcon sx={{ color: brand.green }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass((v) => !v)} edge="end">
                    {showPass ? <VisibilityIcon /> : <LockRoundedIcon sx={{ opacity: 0.6 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          {message && (
            <Alert severity={message.startsWith('✅') ? 'success' : 'error'} sx={{ mb: 1 }}>
              {message}
            </Alert>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            fullWidth
            sx={{ py: 1.4, fontWeight: 800, borderRadius: 2, textTransform: 'none', bgcolor: brand.orange, '&:hover': { bgcolor: '#E4601F' } }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Créer le client'}
          </Button>
        </Grid>
      </Grid>

      {/* Liste des clients */}
      {clients.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
            📋 Liste des clients avec carte
          </Typography>

          <Box sx={{ overflowX: 'auto', borderRadius: 2, border: '1px solid #eee' }}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F7F9FC' }}>
                  <TableCell>Nom</TableCell>
                  <TableCell>Sexe</TableCell>
                  <TableCell>Naissance</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Téléphone</TableCell>
                  <TableCell>Code Carte</TableCell>
                  <TableCell>Solde</TableCell>
                  <TableCell>Date de création</TableCell>
                  <TableCell align="center">Fiche</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((client) => (
                    <TableRow key={client._id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar
                            src={client.photo || undefined}
                            sx={{ width: 32, height: 32, bgcolor: brand.green, color: '#fff' }}
                          >
                            {client.user?.name?.[0]?.toUpperCase() || '🙂'}
                          </Avatar>
                          <Typography fontWeight={700}>{client.user?.name || '—'}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={client.gender || '—'}
                          color={client.gender === 'féminin' ? 'secondary' : 'default'}
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell>
                        {client.birthDate ? new Date(client.birthDate).toLocaleDateString() : '—'}
                      </TableCell>

                      <TableCell>
                        {client.photo ? (
                          <Avatar src={client.photo} alt="Photo" sx={{ width: 32, height: 32 }} />
                        ) : '—'}
                      </TableCell>

                      <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                        {client.user?.phone || '—'}
                      </TableCell>

                      <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                        {client.codeVisible || '—'}
                      </TableCell>

                      <TableCell sx={{ fontWeight: 700, color: '#11693A' }}>
                        {formatFCFA(client.balance)}
                      </TableCell>

                      <TableCell>
                        {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : '—'}
                      </TableCell>

                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleViewClient(client)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>

          <TablePagination
            component="div"
            count={clients.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            sx={{ mt: 1 }}
          />
        </Box>
      )}

      {/* Modal fiche client */}
      <ClientCardModal
        open={openCard}
        onClose={() => setOpenCard(false)}
        client={selectedClient}
      />
    </Box>
  );
};

export default CreateClientForm;
