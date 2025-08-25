// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, Paper, Grid, Card, CardContent, Avatar, TextField, Button, Dialog, DialogTitle, DialogContent
// } from '@mui/material';
// import QrCodeIcon from '@mui/icons-material/QrCode';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import API from '../../services/api';


// const ParentDashboardPage = () => {
//   const [children, setChildren] = useState([]);
//   const [selectedChild, setSelectedChild] = useState(null);
//   const [openQrModal, setOpenQrModal] = useState(false);
//   const [qrCode, setQrCode] = useState('');
//   const [openRechargeModal, setOpenRechargeModal] = useState(false);
//   const [rechargeAmount, setRechargeAmount] = useState('');



//   const [openHistoryModal, setOpenHistoryModal] = useState(false);
// const [history, setHistory] = useState([]);


// const handleShowHistory = async (child) => {
//   setSelectedChild(child);
//   // const data = await fetchRechargeHistory(child._id, token);
//   const data = await API.get(`/children/history/${child._id}`).then(res => res.data);

//   setHistory(data);
//   setOpenHistoryModal(true);
// };


//   useEffect(() => {
//     const loadMyChildren = async () => {
//       // const data = await fetchChildren(token, false); // false = mode parent
//       const data = await API.get('/children/mine').then(res => res.data);

//       setChildren(data);
//     };
//     loadMyChildren();
//   }, []);

//   const handleShowQr = async (child) => {
//     setSelectedChild(child);
//     // const qr = await fetchChildQrCode(child._id, token);
//     const qr = await API.get(`/children/${child._id}/qrcode`).then(res => res.data.qrCode);

//     setQrCode(qr);
//     setOpenQrModal(true);
//   };

// //   const handleOpenRecharge = (child) => {
// //     setSelectedChild(child);
// //     setRechargeAmount('');
// //     setOpenRechargeModal(true);
// //   };

//   const handleRecharge = async () => {
//     // await rechargeChild(selectedChild._id, Number(rechargeAmount), token);
//     // const updatedChildren = await fetchChildren(token, false);
//     await API.post(`/children/${selectedChild._id}/recharge`, { amount: Number(rechargeAmount) });
// const updatedChildren = await API.get('/children/mine').then(res => res.data);

//     setChildren(updatedChildren);
//     setOpenRechargeModal(false);
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h5" fontWeight="bold" mb={3}>🎛️ Tableau de bord Parent</Typography>



// <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
//   <Paper elevation={3} sx={{ p: 2, minWidth: 220 }}>
//     <Typography variant="body1">👶 Nombre d’enfants</Typography>
//     <Typography variant="h6" fontWeight="bold">{children.length}</Typography>
//   </Paper>

//   <Paper elevation={3} sx={{ p: 2, minWidth: 220 }}>
//     <Typography variant="body1">💰 Solde total</Typography>
//     <Typography variant="h6" fontWeight="bold">
//       {children.reduce((acc, c) => acc + (c.balance || 0), 0).toLocaleString()} F
//     </Typography>
//   </Paper>
// </Box>

//       <Grid container spacing={3}>
//         {children.map((child) => (
//           <Grid item xs={12} sm={6} md={4} key={child._id}>
//             <Card>
//               <CardContent>
//                 <Box display="flex" alignItems="center" mb={2}>
//                   <Avatar
//                     src={child.photo || 'https://via.placeholder.com/100'}
//                     sx={{ width: 60, height: 60, mr: 2 }}
//                   />
//                   <Box>
//                     <Typography variant="h6">{child.name}</Typography>
//                     <Typography variant="body2">
//                       Âge : {Math.floor((new Date() - new Date(child.birthDate)) / (1000 * 60 * 60 * 24 * 365.25))} ans
//                     </Typography>
//                     <Typography variant="body2">Solde : {child.balance?.toLocaleString() || '0'} F</Typography>
//                   </Box>
//                 </Box>

//                 <Button
//                   startIcon={<QrCodeIcon />}
//                   onClick={() => handleShowQr(child)}
//                   sx={{ mr: 1 }}
//                   variant="outlined"
//                 >
//                   QR Code
//                 </Button>

//               <Button
//                 startIcon={<MonetizationOnIcon />}
//                 variant="contained"
//                 disabled
//                 >
//                 Recharger (admin uniquement)
//                 </Button>



//                 <Button
//   onClick={() => handleShowHistory(child)}
//   sx={{ mt: 1 }}
//   fullWidth
//   variant="text"
// >
//   Voir historique
// </Button>

//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Modale QR Code */}
//       <Dialog open={openQrModal} onClose={() => setOpenQrModal(false)}>
//         <DialogTitle>QR Code de {selectedChild?.name}</DialogTitle>
//         <DialogContent sx={{ textAlign: 'center' }}>
//           {qrCode && <img src={qrCode} alt="QR Code" style={{ width: 200 }} />}
//         </DialogContent>
//       </Dialog>

//       {/* Modale Recharge */}
//       <Dialog open={openRechargeModal} onClose={() => setOpenRechargeModal(false)}>
//         <DialogTitle>Recharger {selectedChild?.name}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Montant"
//             type="number"
//             fullWidth
//             value={rechargeAmount}
//             onChange={(e) => setRechargeAmount(e.target.value)}
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" onClick={handleRecharge}>
//             Valider le rechargement
//           </Button>
//         </DialogContent>
//       </Dialog>




// <Dialog open={openHistoryModal} onClose={() => setOpenHistoryModal(false)} maxWidth="sm" fullWidth>
//   <DialogTitle>Historique de {selectedChild?.name}</DialogTitle>
//   <DialogContent>
//     {history.length === 0 ? (
//       <Typography>Aucun rechargement trouvé.</Typography>
//     ) : (
//       history.map((rec, index) => (
//         <Box key={index} mb={1}>
//           <Typography variant="body2">
//             Montant : <strong>{rec.amount} F</strong> — Le : {new Date(rec.createdAt).toLocaleDateString()}
//           </Typography>
// {rec.admin && (
//   <Typography variant="caption" color="text.secondary">
//     Effectué par : {rec.admin.name}
//   </Typography>
// )}

//         </Box>
//       ))
//     )}
//   </DialogContent>
// </Dialog>


//     </Box>
//   );
// };

// export default ParentDashboardPage;




import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  CircularProgress,
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HistoryIcon from '@mui/icons-material/History';
import API from '../../services/api';

function roleIsParent(role) {
  return String(role || '').toLowerCase() === 'parent';
}

const ParentDashboardPage = () => {
  // état “prêt” et utilisateur
  const [ready, setReady] = useState(false);
  const [me, setMe] = useState(null);

  // enfants & vues
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  // QR
  const [openQrModal, setOpenQrModal] = useState(false);
  const [qrCode, setQrCode] = useState('');

  // Recharge
  const [openRechargeModal, setOpenRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('');

  // Historique
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [history, setHistory] = useState([]);

  // --------- init: récupérer le user (API -> fallback localStorage) ---------
  useEffect(() => {
    const init = async () => {
      try {
        // s’assure que l’Authorization est présent si ton instance ne le fait pas
        const token = localStorage.getItem('token');
        if (token && !API.defaults.headers.common.Authorization) {
          API.defaults.headers.common.Authorization = `Bearer ${token}`;
        }

        // 1) essai API
        const res = await API.get('/auth/me'); // adapte si besoin
        const user = res?.data?.user ?? res?.data ?? null;
        if (user) {
          setMe(user);
          // charge les enfants UNIQUEMENT si parent
          if (roleIsParent(user.role)) {
            // const kids = await API.get('/children/mine').then(r => r.data);
            const kids = await API.get('/users/children/mine').then(r => r.data);
            setChildren(kids || []);
          }
          setReady(true);
          return;
        }

        // 2) fallback (si /auth/me renvoie un format inattendu)
        throw new Error('Unexpected /auth/me shape');
      } catch (e) {
        console.warn('[parent-dashboard] /auth/me KO -> fallback localStorage', e?.message || e);

        // Fallback localStorage : essaie plusieurs clés possibles selon tes écrans
        const rawUser =
          localStorage.getItem('ps_user') ||
          localStorage.getItem('user') ||
          null;

        let fallbackUser = null;
        if (rawUser) {
          try {
            fallbackUser = JSON.parse(rawUser);
          } catch (_) {
            // ignore JSON error
          }
        }

        // dernier recours: clé role à part
        const rawRole = localStorage.getItem('role');
        const computedRole =
          fallbackUser?.role ||
          rawRole ||
          null;

        if (fallbackUser || computedRole) {
          const u = fallbackUser || { role: computedRole };
          setMe(u);

          if (roleIsParent(u.role)) {
            try {
              // const kids = await API.get('/children/mine').then(r => r.data);

              const kids = await API.get('/users/children/mine').then(r => r.data);
              setChildren(kids || []);
            } catch (errKids) {
              console.warn('[parent-dashboard] /children/mine KO:', errKids?.message || errKids);
            }
          }
        }
        setReady(true);
      }
    };

    init();
  }, []);

  const amParent = roleIsParent(me?.role);

  // --------- actions protégées ---------
  const guardParent = () => {
    if (!amParent) {
      alert("Espace réservé aux parents.");
      return false;
    }
    return true;
  };

  const handleShowQr = async (child) => {
    if (!guardParent()) return;
    setSelectedChild(child);
    const qr = await API.get(`/children/${child._id}/qrcode`).then((res) => res.data.qrCode);
    setQrCode(qr);
    setOpenQrModal(true);
  };

  const handleShowHistory = async (child) => {
    if (!guardParent()) return;
    setSelectedChild(child);
    const data = await API.get(`/children/history/${child._id}`).then((res) => res.data);
    setHistory(data || []);
    setOpenHistoryModal(true);
  };

  const handleRecharge = async () => {
    if (!guardParent()) return;
    await API.post(`/children/${selectedChild._id}/recharge`, { amount: Number(rechargeAmount) });
    const updatedChildren = await API.get('/users/children/mine').then((res) => res.data);
    // const updatedChildren = await API.get('/children/mine').then((res) => res.data);

    setChildren(updatedChildren || []);
    setOpenRechargeModal(false);
  };

  // --------- états ---------
  if (!ready) {
    return (
      <Box p={4} display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!amParent) {
    return (
      <Box p={3}>
        <Alert severity="warning">
          Cet espace est réservé aux <strong>parents</strong>. Merci de vous connecter avec un compte parent.
        </Alert>
      </Box>
    );
  }

  // --------- rendu parent ---------
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        🎛️ Tableau de bord Parent
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={3} gap={2} flexWrap="wrap">
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

      <Grid container spacing={3}>
        {children.map((child) => (
          <Grid item xs={12} sm={6} md={4} key={child._id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={child.photo || 'https://via.placeholder.com/100'}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{child.name}</Typography>
                    <Typography variant="body2">
                      Âge :{' '}
                      {Math.floor(
                        (new Date() - new Date(child.birthDate)) / (1000 * 60 * 60 * 24 * 365.25)
                      )}{' '}
                      ans
                    </Typography>
                    <Typography variant="body2">
                      Solde : {child.balance?.toLocaleString() || '0'} F
                    </Typography>
                  </Box>
                </Box>

                <Button
                  startIcon={<QrCodeIcon />}
                  onClick={() => handleShowQr(child)}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  QR Code
                </Button>

                <Button startIcon={<MonetizationOnIcon />} variant="contained" disabled>
                  Recharger (admin uniquement)
                </Button>

                <Button
                  onClick={() => handleShowHistory(child)}
                  sx={{ mt: 1 }}
                  fullWidth
                  variant="text"
                  startIcon={<HistoryIcon />}
                >
                  Voir historique
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modale QR Code */}
      <Dialog open={openQrModal} onClose={() => setOpenQrModal(false)}>
        <DialogTitle>QR Code de {selectedChild?.name}</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {qrCode && <img src={qrCode} alt="QR Code" style={{ width: 200 }} />}
        </DialogContent>
      </Dialog>

      {/* Modale Recharge */}
      <Dialog open={openRechargeModal} onClose={() => setOpenRechargeModal(false)}>
        <DialogTitle>Recharger {selectedChild?.name}</DialogTitle>
        <DialogContent>
          <TextField
            label="Montant"
            type="number"
            fullWidth
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleRecharge}>
            Valider le rechargement
          </Button>
        </DialogContent>
      </Dialog>

      {/* Modale Historique */}
      <Dialog open={openHistoryModal} onClose={() => setOpenHistoryModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Historique de {selectedChild?.name}</DialogTitle>
        <DialogContent>
          {history.length === 0 ? (
            <Typography>Aucun rechargement trouvé.</Typography>
          ) : (
            history.map((rec, index) => (
              <Box key={index} mb={1}>
                <Typography variant="body2">
                  Montant : <strong>{rec.amount} F</strong> — Le :{' '}
                  {new Date(rec.createdAt).toLocaleDateString()}
                </Typography>
                {rec.admin && (
                  <Typography variant="caption" color="text.secondary">
                    Effectué par : {rec.admin.name}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ParentDashboardPage;
