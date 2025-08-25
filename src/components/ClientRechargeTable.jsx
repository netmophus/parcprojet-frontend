// // ClientRechargeTable.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Paper, Typography, Table, TableHead,
//   TableRow, TableCell, TableBody, Pagination, TextField
// } from '@mui/material';
// import API from '../services/api';

// const ClientRechargeTable = () => {
//   const [recharges, setClientRecharges] = useState([]);
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');

 
//   useEffect(() => {
//   const fetchRecharges = async () => {
//     try {
//       const res = await API.get('/clients/recharges');
//       console.log('✅ Recharges client reçues :', res.data); // ← à vérifier dans la console
//       setClientRecharges(res.data);
//     } catch (err) {
//       console.error('❌ Erreur chargement recharges client', err);
//     }
//   };

//   fetchRecharges();
// }, []);


//   const filtered = recharges.filter((r) => {
//     const name = r.client?.name?.toLowerCase() || '';
//     const phone = r.client?.phone?.toLowerCase() || '';
//     const code = r.codeVisible?.toLowerCase() || '';
//     const term = search.toLowerCase();
//     return name.includes(term) || phone.includes(term) || code.includes(term);
//   });

//   const paginated = filtered.slice((page - 1) * 10, page * 10);

//   return (
//     <Paper sx={{ p: 2, borderRadius: 2 }}>
//       <Typography variant="h6" fontWeight="bold" gutterBottom>
//         🧑‍💼 Recharges Clients
//       </Typography>
//       <TextField
//         fullWidth
//         label="Rechercher par nom ou téléphone"
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setPage(1);
//         }}
//         sx={{ mb: 2 }}
//       />
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Nom</TableCell>
//             <TableCell>Téléphone</TableCell>
//             <TableCell>Montant</TableCell>
//             <TableCell>Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {paginated.map((r) => (
//             <TableRow key={r._id}>
//               <TableCell>{r.client?.name}</TableCell>
//               <TableCell>{r.client?.phone}</TableCell>
//               <TableCell>{r.amount} FCFA</TableCell>
//               <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Box mt={2} display="flex" justifyContent="center">
//         <Pagination
//           count={Math.ceil(filtered.length / 10)}
//           page={page}
//           onChange={(e, val) => setPage(val)}
//           color="primary"
//         />
//       </Box>
//     </Paper>
//   );
// };

// export default ClientRechargeTable;





// ClientRechargeTable.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  TextField,
  Stack,
  InputAdornment,
  Chip,
  Avatar,
  Divider,
  TableContainer,
  CircularProgress,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import API from '../services/api';

const PER_PAGE = 10;
const brand = { green: '#11693A', orange: '#F26B21' };

const formatFCFA = (n) =>
  `${Number(n || 0).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA`;

const ClientRechargeTable = () => {
  const [recharges, setClientRecharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecharges = async () => {
      try {
        setLoading(true);
        const res = await API.get('/clients/recharges');
        setClientRecharges(res.data || []);
      } catch (err) {
        console.error('❌ Erreur chargement recharges client', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecharges();
  }, []);

  // 🔍 Recherche dynamique (nom, téléphone, code si dispo)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return recharges;
    return recharges.filter((r) => {
      const name = r.client?.name?.toLowerCase() || '';
      const phone = r.client?.phone?.toLowerCase() || '';
      const code = r.codeVisible?.toLowerCase() || ''; // au cas où le backend l'envoie
      return name.includes(term) || phone.includes(term) || code.includes(term);
    });
  }, [recharges, search]);

  // Totaux sur le filtre
  const totalAmount = useMemo(
    () => filtered.reduce((s, r) => s + (Number(r.amount) || 0), 0),
    [filtered]
  );

  // 🔢 Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => setPage(1), [search]);

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: '1px solid #EAEAEA' }}>
      {/* En-tête */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1.5}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h6" fontWeight={900}>🧑‍💼 Recharges Clients</Typography>
          <Typography variant="body2" color="text.secondary">
            Historique récent — filtre par nom, téléphone, ou code si disponible.
          </Typography>
        </Box>

        <TextField
          fullWidth
          placeholder="Rechercher par nom / téléphone / code…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: '100%', md: 380 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
        <Chip
          icon={<CreditCardRoundedIcon />}
          label={`${filtered.length.toLocaleString('fr-FR')} opérations`}
          size="small"
        />
        <Chip
          label={`Total: ${formatFCFA(totalAmount)}`}
          size="small"
          sx={{ bgcolor: `${brand.green}14`, color: brand.green, fontWeight: 700 }}
        />
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* États de chargement / vide / table */}
      {loading ? (
        <Box sx={{ py: 6, display: 'grid', placeItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body1" fontWeight={700}>Aucune recharge trouvée</Typography>
          <Typography variant="body2">Essayez un autre terme de recherche.</Typography>
        </Box>
      ) : (
        <>
          <TableContainer sx={{ border: '1px solid #eee', borderRadius: 2, maxHeight: 520 }}>
            <Table stickyHeader size="small" sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F7F9FC' }}>
                  <TableCell>Client</TableCell>
                  <TableCell>Téléphone</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell align="right">Montant</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((r) => (
                  <TableRow
                    key={r._id}
                    hover
                    sx={{ '&:nth-of-type(even)': { bgcolor: '#FAFAFD' } }}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          src={r.client?.photo || undefined}
                          sx={{ width: 28, height: 28, bgcolor: brand.green, color: '#fff' }}
                        >
                          {r.client?.name?.[0]?.toUpperCase() || '🙂'}
                        </Avatar>
                        <Typography fontWeight={700}>{r.client?.name || '—'}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <PhoneIphoneRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <span>{r.client?.phone || '—'}</span>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                      {r.codeVisible || '—'}
                    </TableCell>

                    <TableCell align="right" sx={{ fontWeight: 800, color: brand.green }}>
                      {formatFCFA(r.amount)}
                    </TableCell>

                    <TableCell>
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_e, val) => setPage(val)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ClientRechargeTable;
