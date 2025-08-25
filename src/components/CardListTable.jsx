// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Pagination,
//   TextField,
// } from '@mui/material';
// import API from '../services/api';

// const CARDS_PER_PAGE = 10;

// const CardListTable = () => {
//   const [cards, setCards] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const loadCards = async () => {
//       try {
//         const res = await API.get('/children/recharges'); // Les 50 derniers doivent venir du backend
//         setCards(res.data);
//       } catch (err) {
//         console.error('Erreur chargement cartes', err);
//       }
//     };
//     loadCards();
//   }, []);

//   // 🔍 Recherche dynamique
//   const filteredCards = cards.filter((entry) => {
//     const code = entry.child?.codeVisible?.toLowerCase() || '';
//     const childName = entry.child?.name?.toLowerCase() || '';
//     const parentName = entry.parent?.name?.toLowerCase() || '';
//     const parentPhone = entry.parent?.phone?.toLowerCase() || '';
//     const term = searchTerm.toLowerCase();

//     return (
//       code.includes(term) ||
//       childName.includes(term) ||
//       parentName.includes(term) ||
//       parentPhone.includes(term)
//     );
//   });

//   // 🔢 Pagination
//   const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
//   const paginatedCards = filteredCards.slice(
//     (currentPage - 1) * CARDS_PER_PAGE,
//     currentPage * CARDS_PER_PAGE
//   );

//   return (
//     <Paper sx={{ p: 3, borderRadius: 3 }}>
//       <Typography variant="h6" fontWeight="bold" gutterBottom>
//         📋 Liste des cartes enregistrées
//       </Typography>

//       {/* 🔍 Barre de recherche */}
//       <Box mb={2}>
//         <TextField
//           fullWidth
//           label="Rechercher par code, nom ou téléphone"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1); // reset pagination en cas de recherche
//           }}
//         />
//       </Box>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Code</TableCell>
//             <TableCell>Enfant</TableCell>
//             <TableCell>Parent</TableCell>
//             <TableCell>Téléphone</TableCell>
//             <TableCell>Montant</TableCell>
//             <TableCell>Date</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {paginatedCards.map((entry) => (
//             <TableRow key={entry._id}>
//               <TableCell>{entry.child?.codeVisible}</TableCell>
//               <TableCell>{entry.child?.name}</TableCell>
//               <TableCell>{entry.parent?.name}</TableCell>
//               <TableCell>{entry.parent?.phone}</TableCell>
//               <TableCell>{entry.amount} FCFA</TableCell>
//               <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <Box mt={2} display="flex" justifyContent="center">
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={(e, value) => setCurrentPage(value)}
//           color="primary"
//         />
//       </Box>
//     </Paper>
//   );
// };

// export default CardListTable;





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
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import API from '../services/api';

const CARDS_PER_PAGE = 10;
const brand = { green: '#11693A', orange: '#F26B21' };

const formatFCFA = (n) =>
  `${Number(n || 0).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA`;

const CardListTable = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        const res = await API.get('/children/recharges'); // ⚙️ Top 50 côté backend
        setCards(res.data || []);
      } catch (err) {
        console.error('Erreur chargement cartes', err);
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  // 🔍 Recherche dynamique
  const filteredCards = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return cards;
    return cards.filter((entry) => {
      const code = entry.child?.codeVisible?.toLowerCase() || '';
      const childName = entry.child?.name?.toLowerCase() || '';
      const parentName = entry.parent?.name?.toLowerCase() || '';
      const parentPhone = entry.parent?.phone?.toLowerCase() || '';
      return (
        code.includes(term) ||
        childName.includes(term) ||
        parentName.includes(term) ||
        parentPhone.includes(term)
      );
    });
  }, [cards, searchTerm]);

  // Totaux (sur le filtre)
  const totalAmount = useMemo(
    () => filteredCards.reduce((s, e) => s + (Number(e.amount) || 0), 0),
    [filteredCards]
  );

  // 🔢 Pagination
  const totalPages = Math.max(1, Math.ceil(filteredCards.length / CARDS_PER_PAGE));
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1); // reset page quand on tape dans la recherche
  }, [searchTerm]);

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
          <Typography variant="h6" fontWeight={900}>
            📋 Liste des cartes enregistrées
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recharges récentes — filtrées par code, enfant, parent ou téléphone.
          </Typography>
        </Box>

        <TextField
          fullWidth
          placeholder="Rechercher par code, nom ou téléphone…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      <Stack direction="row" spacing={1} sx={{ mb: 1 }} useFlexGap flexWrap="wrap">
        <Chip
          icon={<CreditCardRoundedIcon />}
          label={`${filteredCards.length.toLocaleString('fr-FR')} opérations`}
          size="small"
        />
        <Chip
          label={`Total: ${formatFCFA(totalAmount)}`}
          size="small"
          sx={{ bgcolor: `${brand.green}14`, color: brand.green, fontWeight: 700 }}
        />
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Loader */}
      {loading ? (
        <Box sx={{ py: 6, display: 'grid', placeItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : filteredCards.length === 0 ? (
        // Empty state
        <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body1" fontWeight={700}>Aucune recharge trouvée</Typography>
          <Typography variant="body2">Essayez un autre terme de recherche.</Typography>
        </Box>
      ) : (
        <>
          {/* Table */}
          <TableContainer sx={{ border: '1px solid #eee', borderRadius: 2, maxHeight: 520 }}>
            <Table stickyHeader size="small" sx={{ minWidth: 960 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F7F9FC' }}>
                  <TableCell>Code</TableCell>
                  <TableCell>Enfant</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>Téléphone</TableCell>
                  <TableCell align="right">Montant</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCards.map((entry) => (
                  <TableRow
                    key={entry._id}
                    hover
                    sx={{ '&:nth-of-type(even)': { bgcolor: '#FAFAFD' } }}
                  >
                    <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                      {entry.child?.codeVisible || '—'}
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          sx={{ width: 28, height: 28, bgcolor: brand.green, color: '#fff' }}
                        >
                          {(entry.child?.name?.[0] || '🙂').toUpperCase()}
                        </Avatar>
                        <Typography fontWeight={700}>
                          {entry.child?.name || '—'}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar sx={{ width: 26, height: 26, bgcolor: '#E0E0E0', color: '#555' }}>
                          <PersonRoundedIcon fontSize="small" />
                        </Avatar>
                        <Typography>{entry.parent?.name || '—'}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <PhoneIphoneRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <span>{entry.parent?.phone || '—'}</span>
                      </Stack>
                    </TableCell>

                    <TableCell align="right" sx={{ fontWeight: 800, color: brand.green }}>
                      {formatFCFA(entry.amount)}
                    </TableCell>

                    <TableCell>
                      {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_e, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default CardListTable;
