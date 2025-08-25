// import React, { useState } from 'react';
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Paper,
// } from '@mui/material';
// import API from '../../services/api';

// const RechargeCardForm = () => {
//   const [form, setForm] = useState({
//     qrcode: '',
//     amount: '',
//   });


//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const [type, setType] = useState('child'); // 'child' ou 'client'
// const [cardInfo, setCardInfo] = useState(null); // remplacera childInfo


// const [cardType, setCardType] = useState(null); // 'child' ou 'client'




//   const handleChange = (e) => {
//   const { name, value } = e.target;

//   if (name === 'qrcode') {
//     const clean = value
//       .toUpperCase()
//       .replace(/\s/g, '')
//       .replace(/[^A-Z0-9\-]/g, '');

//     setForm({ ...form, qrcode: clean });
//   } else {
//     setForm({ ...form, [name]: value });
//   }
// };

  
  
  

// const handleQrCodeBlur = async () => {
//   const cleanCode = form.qrcode.trim();

//   if (!cleanCode) {
//     setMessage('Veuillez entrer un code QR.');
//     setCardInfo(null);
//     return;
//   }

//   try {
//     // Essayer d'abord de charger un enfant
//     const resChild = await API.get(`/children/by-code/${cleanCode}`);
//     setCardInfo(resChild.data);
//     setMessage('');
//     setCardType('child'); // Tu peux stocker le type trouvé
//   } catch (errChild) {
//     try {
//       // Sinon essayer de charger un client
//       const resClient = await API.get(`/clients/by-code/${cleanCode}`);
//       setCardInfo(resClient.data);
//       setMessage('');
//       setCardType('client');
//     } catch (errClient) {
//       setCardInfo(null);
//       setMessage('❌ Carte introuvable.');
//     }
//   }
// };




// const handleSubmit = async () => {
//   try {
//     if (!cardInfo || !cardType) {
//       setMessage('Veuillez entrer un code valide d’abord.');
//       return;
//     }

//     setLoading(true);

//     const endpoint =
//       cardType === 'child'
//         ? `/children/${cardInfo._id}/recharge`
//         : `/clients/${cardInfo._id}/recharge`;

//     const res = await API.post(endpoint, {
//       amount: parseInt(form.amount, 10),
//     });

//     setMessage(`✅ Recharge réussie. Nouveau solde : ${res.data.balance} FCFA`);
//     setForm({ qrcode: '', amount: '' });
//     setCardInfo(null);
//   } catch (err) {
//     setMessage(err.response?.data?.message || 'Erreur lors de la recharge');
//   } finally {
//     setLoading(false);
//   }
// };






//   return (
//     <Paper sx={{ p: 3, borderRadius: 3 }}>
//       <Typography variant="h6" fontWeight="bold" gutterBottom>
//         💰 Recharger une carte
//       </Typography>

//       <Grid container spacing={2}>


//         <Grid item xs={12}>
//   <TextField
//     select
//     label="Type de carte"
//     name="type"
//     value={type}
//     onChange={(e) => setType(e.target.value)}
//     fullWidth
//     SelectProps={{ native: true }}
//   >
//     <option value="child">Enfant</option>
//     <option value="client">Client</option>
//   </TextField>
// </Grid>

//         <Grid item xs={12}>
//           <TextField
//             label="Code de la carte"
//             name="qrcode"
//             value={form.qrcode}
//             onChange={handleChange}
//             onBlur={handleQrCodeBlur}
//             fullWidth
//             required
//             placeholder="Ex: ABCD-1234"
//           />
//         </Grid>

//         {/* {childInfo && (
//           <Grid item xs={12}>
//             <Box p={2} bgcolor="#f9f9f9" borderRadius={2}>
//               <Typography><strong>Enfant :</strong> {childInfo.name}</Typography>
//               <Typography><strong>Parent :</strong> {childInfo.parent.name}</Typography>
//               <Typography><strong>Téléphone :</strong> {childInfo.parent.phone}</Typography>
//               <Typography><strong>Solde actuel :</strong> {childInfo.balance} FCFA</Typography>
//             </Box>
//           </Grid>
//         )} */}




//         {cardInfo && (
//   <Grid item xs={12}>
//     <Box p={2} bgcolor="#f9f9f9" borderRadius={2}>
//       <Typography>
//         <strong>{type === 'child' ? 'Enfant' : 'Client'} :</strong> {cardInfo.name}
//       </Typography>
//       {type === 'child' && (
//         <>
//           <Typography><strong>Parent :</strong> {cardInfo.parent?.name}</Typography>
//           <Typography><strong>Téléphone :</strong> {cardInfo.parent?.phone}</Typography>
//         </>
//       )}
//       <Typography><strong>Solde actuel :</strong> {cardInfo.balance} FCFA</Typography>
//     </Box>
//   </Grid>
// )}


//         <Grid item xs={12}>
//           <TextField
//             label="Montant à recharger (FCFA)"
//             name="amount"
//             type="number"
//             value={form.amount}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? 'Recharge en cours...' : 'Recharger la carte'}
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

// export default RechargeCardForm;




import React, { useState } from 'react';
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
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';
import API from '../../services/api';

const brand = { green: '#11693A', orange: '#F26B21', blue: '#0B79BF' };
const formatFCFA = (n) =>
  `${Number(n || 0).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA`;

const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

const RechargeCardForm = () => {
  const [form, setForm] = useState({ qrcode: '', amount: '' });
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); // 'success' | 'error' | 'info' | 'warning'
  const [loading, setLoading] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);

  const [cardInfo, setCardInfo] = useState(null); // { _id, name, balance, ... }
  const [cardType, setCardType] = useState(null); // 'child' | 'client'

  const sanitizeQR = (v) =>
    v.toUpperCase().replace(/\s/g, '').replace(/[^A-Z0-9\-]/g, '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'qrcode') {
      setForm((p) => ({ ...p, qrcode: sanitizeQR(value) }));
    } else if (name === 'amount') {
      setForm((p) => ({ ...p, amount: value }));
    }
  };

  const verifyCode = async () => {
    const cleanCode = form.qrcode.trim();
    if (!cleanCode) {
      setSeverity('warning');
      setMessage('Veuillez entrer un code QR.');
      setCardInfo(null);
      setCardType(null);
      return;
    }

    try {
      setLookingUp(true);
      // 1) Essayer enfant
      const resChild = await API.get(`/children/by-code/${cleanCode}`);
      setCardInfo(resChild.data);
      setCardType('child');
      setSeverity('success');
      setMessage('');
    } catch (_errChild) {
      try {
        // 2) Essayer client
        const resClient = await API.get(`/clients/by-code/${cleanCode}`);
        setCardInfo(resClient.data);
        setCardType('client');
        setSeverity('success');
        setMessage('');
      } catch (_errClient) {
        setCardInfo(null);
        setCardType(null);
        setSeverity('error');
        setMessage('❌ Carte introuvable. Vérifiez le code et réessayez.');
      }
    } finally {
      setLookingUp(false);
    }
  };

  const canSubmit =
    !!cardInfo && !!cardType && Number.parseInt(form.amount, 10) > 0 && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      setLoading(true);

      const endpoint =
        cardType === 'child'
          ? `/children/${cardInfo._id}/recharge`
          : `/clients/${cardInfo._id}/recharge`;

      const payload = { amount: Number.parseInt(form.amount, 10) };
      const res = await API.post(endpoint, payload);

      // Mettre à jour solde localement
      const newBalance = res.data?.balance ?? (Number(cardInfo.balance) + payload.amount);
      setCardInfo((prev) => (prev ? { ...prev, balance: newBalance } : prev));

      setSeverity('success');
      setMessage(`✅ Recharge réussie. Nouveau solde : ${formatFCFA(newBalance)}`);
      setForm({ qrcode: '', amount: '' });
      setCardType(null);
    } catch (err) {
      setSeverity('error');
      setMessage(err.response?.data?.message || 'Erreur lors de la recharge');
    } finally {
      setLoading(false);
    }
  };

  const pickAmount = (val) => setForm((p) => ({ ...p, amount: String(val) }));

  return (
    <Box>
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={900}>
          💰 Recharger une carte
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Saisissez le <b>code de la carte</b> puis le <b>montant</b>.
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {/* QR code */}
        <Grid item xs={12} md={7}>
          <TextField
            label="Code de la carte"
            name="qrcode"
            value={form.qrcode}
            onChange={handleChange}
            onBlur={verifyCode}
            placeholder="Ex. ABCD-1234"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <QrCode2RoundedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={verifyCode} edge="end" disabled={lookingUp}>
                    {lookingUp ? <CircularProgress size={18} /> : <SearchRoundedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText="Le code est insensible à la casse et sans espaces."
          />
        </Grid>

        {/* Montant */}
        <Grid item xs={12} md={5}>
          <TextField
            label="Montant à recharger"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 0, step: 100 }}
            onKeyDown={(e) => {
              if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnRoundedIcon />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">FCFA</InputAdornment>,
            }}
          />
          {/* Raccourcis de montant */}
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
            {quickAmounts.map((a) => (
              <Chip
                key={a}
                label={`${a.toLocaleString('fr-FR')} FCFA`}
                onClick={() => pickAmount(a)}
                variant="outlined"
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Grid>

        {/* Fiche carte */}
        {cardInfo && (
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid #EAEAEA',
                bgcolor: '#FFF',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar
                    src={cardInfo.photo || undefined}
                    sx={{ width: 44, height: 44, bgcolor: brand.green, color: '#fff' }}
                  >
                    {cardInfo.name?.[0]?.toUpperCase() || '🙂'}
                  </Avatar>
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {cardType === 'child' ? (
                        <FamilyRestroomRoundedIcon sx={{ color: brand.blue }} />
                      ) : (
                        <PersonRoundedIcon sx={{ color: brand.blue }} />
                      )}
                      <Typography variant="subtitle1" fontWeight={800}>
                        {cardInfo.name}
                      </Typography>
                    </Stack>

                    {cardType === 'child' && (
                      <Typography variant="body2" color="text.secondary">
                        Parent : {cardInfo.parent?.name ?? '—'} — {cardInfo.parent?.phone ?? '—'}
                      </Typography>
                    )}
                  </Box>
                </Stack>

                <Stack alignItems="flex-end">
                  <Typography variant="caption" color="text.secondary">
                    Solde actuel
                  </Typography>
                  <Typography variant="h6" fontWeight={900} sx={{ color: brand.green }}>
                    {formatFCFA(cardInfo.balance)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        )}

        {/* CTA */}
        <Grid item xs={12}>
          {message && (
            <Alert severity={severity} sx={{ mb: 1 }}>
              {message}
            </Alert>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!canSubmit}
            fullWidth
            sx={{
              py: 1.4,
              fontWeight: 800,
              borderRadius: 2,
              textTransform: 'none',
              bgcolor: brand.orange,
              '&:hover': { bgcolor: '#E4601F' },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Recharger la carte'}
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" color="text.secondary">
        Astuce : utilisez les raccourcis pour aller plus vite (1k, 2k, 5k…).
      </Typography>
    </Box>
  );
};

export default RechargeCardForm;
