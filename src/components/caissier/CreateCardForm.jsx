// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   MenuItem,
// } from '@mui/material';
// import API from '../../services/api';


// const CreateCardForm = () => {
//   const [form, setForm] = useState({
//     user: '',
//     qrcode: '',
//     balance: 0,
//   });

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
       
//         const data = await API.get('/users');

//         setUsers(data);
//       } catch (err) {
//         console.error('Erreur chargement utilisateurs', err);
//       }
//     };
//     loadUsers();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//      await API.post('/cards', form);
//       setMessage('✅ Carte créée avec succès');
//       setForm({ user: '', qrcode: '', balance: 0 });
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Erreur lors de la création de la carte');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper sx={{ p: 3, borderRadius: 3 }}>
//       <Typography variant="h6" fontWeight="bold" gutterBottom>
//         💳 Créer une carte
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             select
//             label="Utilisateur"
//             name="user"
//             value={form.user}
//             onChange={handleChange}
//             fullWidth
//           >
//             {users.map((u) => (
//               <MenuItem key={u._id} value={u._id}>
//                 {u.name} ({u.role})
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="QR Code"
//             name="qrcode"
//             value={form.qrcode}
//             onChange={handleChange}
//             fullWidth
//             required
//             placeholder="QR123456XYZ"
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             label="Solde initial (facultatif)"
//             name="balance"
//             value={form.balance}
//             onChange={handleChange}
//             fullWidth
//             type="number"
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button variant="contained" onClick={handleSubmit} fullWidth disabled={loading}>
//             {loading ? 'Création...' : 'Créer la carte'}
//           </Button>
//         </Grid>
//       </Grid>

//       {message && (
//         <Typography mt={3} textAlign="center" color={message.startsWith('✅') ? 'green' : 'error'}>
//           {message}
//         </Typography>
//       )}
//     </Paper>
//   );
// };

// export default CreateCardForm;
