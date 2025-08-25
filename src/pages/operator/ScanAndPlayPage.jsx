



// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Alert,
//   TextField,
//   MenuItem,
//   Paper,
//   Avatar,
//   Divider,
// } from '@mui/material';
// import API from '../../services/api';

// import { useNavigate } from 'react-router-dom';




// const ScanAndPlayPage = () => {
//   const [manualCode, setManualCode] = useState('');
//   const [child, setChild] = useState(null);
//   const [selectedGame, setSelectedGame] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const [games, setGames] = useState([]);

//   const token = localStorage.getItem('token');

//   const handleSearchByCode = async () => {
//     try {
//       const res = await API.get(`/children/search-by-code/${manualCode}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = res.data;

//       setChild(data);
//       setError('');
//       setMessage('');
//     } catch (err) {
//       setChild(null);
//       setError(err.response?.data?.message || 'Erreur lors de la recherche.');
//     }
//   };

// // const handlePlay = async () => {
// //   try {
// //    const res = await API.post(
// //   '/children/play',


// //   { codeVisible: child.codeVisible, gameName: selectedGame },
// //   { headers: { Authorization: `Bearer ${token}` } }
// // );

// //     setMessage(`${res.message} | Nouveau solde : ${res.newBalance} F`);
// //     setError('');
// //     setChild(null);
// //     setSelectedGame('');
// //     setManualCode('');
// //   } catch (err) {
// //     setError(err.response?.data?.message || 'Erreur lors du jeu.');
// //   }
// // };


// const handlePlay = async () => {
//   try {
//     const res = await API.post(
//       '/children/play',
//       { codeVisible: child.codeVisible, gameName: selectedGame },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // ✅ Accès correct aux données de la réponse
//     setMessage(`${res.data.message} | Nouveau solde : ${res.data.newBalance.toLocaleString()} F`);
//     setError('');
//     setChild(null);
//     setSelectedGame('');
//     setManualCode('');
//   } catch (err) {
//     setError(err.response?.data?.message || 'Erreur lors du jeu.');
//   }
// };


// useEffect(() => {
//   const loadGames = async () => {
//     try {
//      const res = await API.get('/games', {
//   headers: { Authorization: `Bearer ${token}` },
// });
// const gameList = res.data;

//       setGames(gameList);
//     } catch (err) {
//       console.error("Erreur lors du chargement des jeux", err);
//     }
//   };

//   loadGames();
// }, []);


//   return (
//     <Box p={3}>
//       <Button variant="outlined" onClick={() => navigate('/operator-dashboard')} sx={{ mb: 2 }}>
//         ← Retour au menu
//       </Button>

//       <Typography variant="h5" mb={2}>🎮 Entrer les 4 derniers chiffres</Typography>

//       <TextField
//         label="Code visible (ex: 3105)"
//         fullWidth
//         value={manualCode}
//         onChange={(e) => setManualCode(e.target.value)}
//         inputProps={{ maxLength: 4 }}
//         sx={{ mb: 2 }}
//       />

//       <Button
//         variant="contained"
//         onClick={handleSearchByCode}
//         disabled={manualCode.length !== 4}
//         sx={{ mb: 3 }}
//       >
//         🔍 Rechercher
//       </Button>

//       {child && (
//         <Paper elevation={4} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
//           <Avatar
//             src={child.photo || 'https://via.placeholder.com/150'}
//             sx={{ width: 100, height: 100 }}
//           />
//           <Box>
//             <Typography variant="h6">{child.name}</Typography>
//             <Typography>🎂 Âge : {
//               child.birthDate
//                 ? Math.floor((new Date() - new Date(child.birthDate)) / (1000 * 60 * 60 * 24 * 365.25))
//                 : 'Inconnu'
//             } ans</Typography>
//             <Typography>👤 Code visible : {child.codeVisible}</Typography>
//             <Typography>💰 Solde : {child.balance.toLocaleString()} F</Typography>
//             <Typography>👪 Parent : {child.parent?.name || 'Non défini'}</Typography>
//           </Box>
//         </Paper>
//       )}

//       {child && (
//         <>
//        <TextField
//   select
//   fullWidth
//   label="🎲 Sélectionner un jeu"
//   value={selectedGame}
//   onChange={(e) => setSelectedGame(e.target.value)}
//   sx={{ mt: 3 }}
// >
//   {games.map((g) => (
//     <MenuItem key={g._id} value={g.name}>
//       {g.name} ({g.price.toLocaleString()} F)
//     </MenuItem>
//   ))}
// </TextField>


//           <Button
//             variant="contained"
//             color="primary"
//             disabled={!selectedGame}
//             sx={{ mt: 2 }}
//             onClick={handlePlay}
//           >
//             ✅ Valider le jeu
//           </Button>
//         </>
//       )}

//       {message && <Alert severity="success" sx={{ mt: 3 }}>{message}</Alert>}
//       {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
//     </Box>
//   );
// };

// export default ScanAndPlayPage;




// ScanAndPlayPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  TextField,
  MenuItem,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

const DIGITS = (v) => v.replace(/\D/g, '');

export default function ScanAndPlayPage() {
  const navigate = useNavigate();

  // saisie code (4 derniers chiffres)
  const [manualCode, setManualCode] = useState('');

  // entité trouvée (enfant OU client)
  const [entity, setEntity] = useState(null);       // { type: 'child'|'client', displayName, photo, codeVisible, balance, birthDate, parentName? }
  const [entityRaw, setEntityRaw] = useState(null); // objet brut (debug / si tu veux l’afficher)
  const [loadingEntity, setLoadingEntity] = useState(false);

  // jeux
  const [games, setGames] = useState([]);
  const [selectedGameName, setSelectedGameName] = useState('');

  // messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // charge les jeux
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get('/games');
        setGames(res.data || []);
      } catch (err) {
        console.error('Erreur chargement jeux', err);
      }
    })();
  }, []);

  // jeu sélectionné + coût
  const selectedGame = useMemo(
    () => games.find((g) => g.name === selectedGameName) || null,
    [games, selectedGameName]
  );
  const gameCost = selectedGame?.price ?? 0;

  // solde restant (preview)
  const remaining = useMemo(() => {
    if (!entity || selectedGame == null) return null;
    return (Number(entity.balance || 0) - Number(gameCost || 0));
  }, [entity, gameCost, selectedGame]);

  const canPlay = Boolean(entity && selectedGame && remaining !== null && remaining >= 0);

  // helpers de normalisation de réponses
  const mapChild = (c) => ({
    type: 'child',
    displayName: c?.name || 'Enfant',
    photo: c?.photo || null,
    codeVisible: c?.codeVisible,
    balance: c?.balance ?? 0,
    birthDate: c?.birthDate || null,
    parentName: c?.parent?.name || null,
  });

  const mapClient = (cl) => ({
    type: 'client',
    displayName: cl?.user?.name || 'Client',
    photo: cl?.photo || null,
    codeVisible: cl?.codeVisible,
    balance: cl?.balance ?? 0,
    birthDate: cl?.birthDate || null,
    parentName: null,
  });

  // recherche par code: tente enfant, puis client
  const handleSearchByCode = async () => {
    const code = DIGITS(manualCode).slice(0, 4);
    if (code.length !== 4) return;

    setLoadingEntity(true);
    setMessage('');
    setError('');
    setEntity(null);
    setEntityRaw(null);

    try {
      // 1) tenter ENFANT
      const rChild = await API.get(`/children/search-by-code/${code}`);
      if (rChild?.data) {
        setEntity(mapChild(rChild.data));
        setEntityRaw(rChild.data);
        return;
      }
    } catch (_) {
      // continue
    }

    try {
      // 2) sinon tenter CLIENT (adulte)
      // (backend: GET /clients/by-code/:codeVisible)
      const rClient = await API.get(`/clients/by-code/${code}`);
      if (rClient?.data) {
        // suivant ton contrôleur, rClient.data peut déjà être l’objet client direct ou enveloppé.
        const data = rClient.data.card || rClient.data.client || rClient.data;
        setEntity(mapClient(data));
        setEntityRaw(data);
        return;
      }
    } catch (err2) {
      setError(err2?.response?.data?.message || "Aucun enfant ou client trouvé pour ce code.");
      return;
    } finally {
      setLoadingEntity(false);
    }
  };

  const handlePlay = async () => {
    if (!canPlay) return;
    setMessage('');
    setError('');

    try {
      if (entity.type === 'child') {
        const res = await API.post('/children/play', {
          codeVisible: entity.codeVisible,
          gameName: selectedGameName,
        });
        const newBal = res?.data?.newBalance ?? null;
        setMessage(`${res?.data?.message || 'Jeu validé'} | Nouveau solde : ${Number(newBal ?? 0).toLocaleString()} F`);
      } else {
        // CLIENT (assure-toi d’avoir l’endpoint /clients/play côté backend)
        const res = await API.post('/clients/play', {
          codeVisible: entity.codeVisible,
          gameName: selectedGameName,
        });
        const newBal = res?.data?.newBalance ?? null;
        setMessage(`${res?.data?.message || 'Jeu validé'} | Nouveau solde : ${Number(newBal ?? 0).toLocaleString()} F`);
      }

      // reset
      setEntity(null);
      setEntityRaw(null);
      setSelectedGameName('');
      setManualCode('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Erreur lors de la validation du jeu.');
    }
  };

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => navigate('/operator-dashboard')} sx={{ mb: 2 }}>
        ← Retour au menu
      </Button>

      <Typography variant="h5" mb={2}>🎮 Entrer les 4 derniers chiffres</Typography>

      <TextField
        label="Code visible (ex: 3105)"
        fullWidth
        value={manualCode}
        onChange={(e) => setManualCode(DIGITS(e.target.value).slice(0, 4))}
        inputProps={{ maxLength: 4, inputMode: 'numeric', pattern: '[0-9]*' }}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleSearchByCode}
        disabled={manualCode.length !== 4 || loadingEntity}
        sx={{ mb: 3 }}
      >
        {loadingEntity ? 'Recherche…' : '🔍 Rechercher'}
      </Button>

      {entity && (
        <Paper elevation={4} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={
              entity.photo
                ? (entity.photo.startsWith('http') ? entity.photo : `http://localhost:5000${entity.photo}`)
                : 'https://via.placeholder.com/150'
            }
            sx={{ width: 100, height: 100 }}
          />
          <Box>
            <Typography variant="h6">
              {entity.displayName} {entity.type === 'client' ? '— (Client)' : '— (Enfant)'}
            </Typography>

            {entity.birthDate && (
              <Typography>
                🎂 Âge : {Math.floor((new Date() - new Date(entity.birthDate)) / (1000 * 60 * 60 * 24 * 365.25))} ans
              </Typography>
            )}

            <Typography>👤 Code visible : {entity.codeVisible}</Typography>
            <Typography>💰 Solde : {Number(entity.balance || 0).toLocaleString()} F</Typography>
            {entity.type === 'child' && (
              <Typography>👪 Parent : {entity.parentName || '—'}</Typography>
            )}
          </Box>
        </Paper>
      )}

      {entity && (
        <>
          <TextField
            select
            fullWidth
            label="🎲 Sélectionner un jeu"
            value={selectedGameName}
            onChange={(e) => setSelectedGameName(e.target.value)}
            sx={{ mt: 3 }}
          >
            {games.map((g) => (
              <MenuItem key={g._id} value={g.name}>
                {g.name} ({Number(g.price).toLocaleString()} F)
              </MenuItem>
            ))}
          </TextField>

          {/* Prévisualisation solde restant */}
          {selectedGame && (
            <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
              <Typography variant="body2">
                Prix du jeu : <strong>{Number(gameCost).toLocaleString()} F</strong>
              </Typography>
              <Typography variant="body2">
                Solde actuel : <strong>{Number(entity.balance || 0).toLocaleString()} F</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" fontWeight={700} color={remaining < 0 ? 'error' : 'inherit'}>
                Solde après jeu : <strong>{Number(remaining).toLocaleString()} F</strong>
              </Typography>
              {remaining < 0 && (
                <Alert severity="warning" sx={{ mt: 1 }}>
                  Solde insuffisant pour jouer à ce jeu.
                </Alert>
              )}
            </Paper>
          )}

          <Button
            variant="contained"
            color="primary"
            disabled={!canPlay}
            sx={{ mt: 2 }}
            onClick={handlePlay}
          >
            ✅ Valider le jeu
          </Button>
        </>
      )}

      {message && <Alert severity="success" sx={{ mt: 3 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
    </Box>
  );
}
