// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   AppBar, Toolbar, Container, Box, Grid, Paper, Typography, TextField, MenuItem,
//   Card, CardMedia, CardContent, CardActions, Button, IconButton, Chip, Stack,
//   InputAdornment, Divider, Dialog, DialogTitle, DialogContent, DialogActions,
//   Badge, Skeleton, Pagination
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import API from '../services/api';
// import { generateReceiptPDF } from '../utils/generateReceipt';

// /* ========= Helpers pour images =========
//    Ex: baseURL = "http://192.168.1.221:5000/api" -> BACKEND_ORIGIN = "http://192.168.1.221:5000"
// */
// const BACKEND_ORIGIN = (API.defaults?.baseURL || '').replace(/\/api\/?$/, '');
// const publicUrl = (p) => {
//   if (!p) return '/no-image.png';                    // fallback local (place ce fichier dans /public)
//   if (/^https?:\/\//i.test(p)) return p;             // déjà absolue
//   return `${BACKEND_ORIGIN}${p.startsWith('/') ? p : `/${p}`}`;
// };

// const STORAGE_KEY = 'selectedSalePointId';
// const formatPrice = (n) => `${Number(n || 0).toLocaleString('fr-FR')} FCFA`;

// const AgentDashboardPage = () => {
//   /* ------ état inchangé ------ */
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [cardNumber, setCardNumber] = useState('');

//   const [menus, setMenus] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [salePoints, setSalePoints] = useState([]);
//   const [selectedSalePoint, setSelectedSalePoint] = useState(null);

//   const [cardInfo, setCardInfo] = useState(null);
//   const [cardError, setCardError] = useState(null);

//   const [orderHistory, setOrderHistory] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   /* ------ UX ------ */
//   const [query, setQuery] = useState('');
//   const [pickOpen, setPickOpen] = useState(false);

//   /* ------ fetch stands & restore choice ------ */
//   useEffect(() => {
//     const fetchSalePoints = async () => {
//       try {
//         const { data } = await API.get('/salepoints');
//         setSalePoints(data || []);
//       } catch (error) {
//         console.error('Erreur lors du chargement des stands :', error);
//       }
//     };
//     fetchSalePoints();
//   }, []);

//   useEffect(() => {
//     if (salePoints.length > 0) {
//       const savedId = sessionStorage.getItem(STORAGE_KEY);
//       if (savedId) {
//         const sp = salePoints.find((s) => s._id === savedId);
//         if (sp) {
//           setSelectedSalePoint(sp);
//           fetchMenusBySalePoint(sp._id);
//           return;
//         }
//       }
//       setPickOpen(true); // demander à l’agent de choisir
//     }
//   }, [salePoints]);

//   /* ------ fetch menus par stand ------ */
//   const fetchMenusBySalePoint = async (salePointId) => {
//     if (!salePointId) return;
//     setLoading(true);
//     try {
//       const { data } = await API.get(`/menuitems/salepoint/${salePointId}`);
//       setMenus(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Erreur chargement menus :', error);
//       setMenus([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const chooseStand = (id) => {
//     const sp = salePoints.find((s) => s._id === id) || null;
//     setSelectedSalePoint(sp);
//     setMenus([]);
//     if (sp) {
//       sessionStorage.setItem(STORAGE_KEY, sp._id);
//       fetchMenusBySalePoint(sp._id);
//     } else {
//       sessionStorage.removeItem(STORAGE_KEY);
//     }
//     setPickOpen(false);
//   };

//   /* ------ fetch historique paiements (inchangé) ------ */
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await API.get(`/orders/my-payments?page=${page}`);
//         setOrderHistory(data?.orders || []);
//         setTotalPages(data?.totalPages || 1);
//       } catch (error) {
//         console.error('Erreur historique commandes payées :', error);
//       }
//     };
//     fetchOrders();
//   }, [page]);

//   /* ------ carte client (inchangé) ------ */
//   const handleCardNumberChange = async (e) => {
//     const number = e.target.value;
//     setCardNumber(number);
//     setCardInfo(null);
//     setCardError(null);

//     if (number.length >= 6) {
//       try {
//         const response = await API.get(`/clients/by-code/${number}`);
//         setCardInfo(response.data);
//       } catch (error) {
//         setCardInfo(null);
//         setCardError('Client non trouvé');
//       }
//     }
//   };

//   /* ------ panier (inchangé) ------ */
//   const handleAddToCart = (item) => {
//     const existingItem = selectedItems.find((i) => i.id === item._id);
//     if (existingItem) {
//       const updatedItems = selectedItems.map((i) =>
//         i.id === item._id ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.price } : i
//       );
//       setSelectedItems(updatedItems);
//     } else {
//       setSelectedItems([...selectedItems, { id: item._id, name: item.name, price: item.price, quantity: 1, total: item.price }]);
//     }
//   };

//   const handleRemoveItem = (name) => {
//     setSelectedItems((prev) => prev.filter((item) => item.name !== name));
//   };

//   const cartTotal = useMemo(() => selectedItems.reduce((s, i) => s + i.total, 0), [selectedItems]);

//   const handlePayment = async () => {
//     try {
//       const response = await API.post('/orders/pay', {
//         cardNumber,
//         amount: cartTotal,
//         items: selectedItems,
//       });

//       if (response.data.success) {
//         alert('✅ Paiement effectué avec succès ! Le reçu sera envoyé au client.');
//         // const { order } = response.data;
//         // generateReceiptPDF(order, order.clientTransaction, cardInfo);
//         setOpenModal(false);
//         setSelectedItems([]);
//         setCardNumber('');
//       } else {
//         alert('❌ Échec du paiement : ' + response.data.message);
//       }
//     } catch (error) {
//       const msg = error.response?.data?.message || 'Une erreur est survenue pendant le paiement.';
//       alert('❌ Échec du paiement : ' + msg);
//     }
//   };

//   const refreshMenus = () => {
//     if (selectedSalePoint?._id) fetchMenusBySalePoint(selectedSalePoint._id);
//   };

//   /* ------ filtrage local ------ */
//   const filteredMenus = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return menus;
//     return menus.filter(
//       (m) => m.name?.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q)
//     );
//   }, [menus, query]);

//   /* ------ UI ------ */
//   const MenuCard = ({ item }) => (
//     <Card
//       sx={{
//         height: '100%',
       
//         borderRadius: 3,
//         boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
//         overflow: 'hidden',
//         transition: 'transform .2s ease, box-shadow .2s ease',
//         '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' },
//       }}
//     >
   

//    <CardMedia
//   component="img"
//   height="170"
//   image={publicUrl(item.photo)}       // 👈 Cloudinary (https) ou /uploads → origin backend
//   alt={item.name}
//   loading="lazy"
//   crossOrigin="anonymous"
//   referrerPolicy="no-referrer"
//   onError={(e) => {
//     e.currentTarget.onerror = null;
//     e.currentTarget.src = '/no-image.png'; // 👈 fallback local
//   }}
//   sx={{ objectFit: 'cover' , width:'100%'}}
// />


//       <CardContent>
//         <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//           <Typography variant="h6" fontWeight={800}>{item.name}</Typography>
//           <Chip label={formatPrice(item.price)} color="primary" size="small" />
//         </Stack>
//         {item.description && (
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//             {item.description}
//           </Typography>
//         )}
//       </CardContent>
//       <CardActions sx={{ px: 2, pb: 2 }}>
//         <Button fullWidth variant="contained" onClick={() => handleAddToCart(item)}>
//           Ajouter
//         </Button>
//       </CardActions>
//     </Card>
//   );

//   const StandPickerDialog = () => (
//     <Dialog open={pickOpen} onClose={() => setPickOpen(false)} maxWidth="sm" fullWidth>
//       <DialogTitle>Choisir un stand</DialogTitle>
//       <DialogContent dividers>
//         {salePoints.length === 0 ? (
//           <Typography color="text.secondary">Aucun stand disponible.</Typography>
//         ) : (
//           <Grid container spacing={2}>
//             {salePoints.map((sp) => (
//               <Grid item xs={12} sm={6} key={sp._id}>
//                 <Paper
//                   onClick={() => chooseStand(sp._id)}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     cursor: 'pointer',
//                     border: '1px solid',
//                     borderColor: 'divider',
//                     '&:hover': { borderColor: 'primary.main', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' },
//                   }}
//                 >
//                   <Typography fontWeight={800}>{sp.name}</Typography>
//                   {sp.type && (
//                     <Typography variant="body2" color="text.secondary">
//                       {sp.type}
//                     </Typography>
//                   )}
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setPickOpen(false)}>Fermer</Button>
//       </DialogActions>
//     </Dialog>
//   );

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: (t) => t.palette.grey[50] }}>
//       {/* AppBar simple */}
//       <AppBar position="sticky" elevation={0} sx={{ background: 'linear-gradient(90deg,#1f2937 0%,#0b1220 100%)' }}>
//         <Toolbar sx={{ gap: 2 }}>
//           <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: .3 }}>
//             Tableau de bord · Agent
//           </Typography>
//           <Box sx={{ flexGrow: 1 }} />
//           <IconButton color="inherit" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
//             <Badge badgeContent={selectedItems.length} color="error">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ py: 3 }}>
//         {/* Filtres visibles */}
//         <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={5}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Sélectionner un stand"
//                 value={selectedSalePoint?._id || ''}
//                 onChange={(e) => chooseStand(e.target.value)}
//               >
//                 <MenuItem value="">— Choisir un stand —</MenuItem>
//                 {salePoints.map((sp) => (
//                   <MenuItem key={sp._id} value={sp._id}>
//                     {sp.name} {sp.type ? `(${sp.type})` : ''}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} md={5}>
//               <TextField
//                 fullWidth
//                 placeholder="Rechercher un menu (nom, description)…"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={2}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 startIcon={<RefreshIcon />}
//                 onClick={refreshMenus}
//                 disabled={!selectedSalePoint}
//               >
//                 Actualiser
//               </Button>
//             </Grid>
//           </Grid>

//           {selectedSalePoint && (
//             <Stack direction="row" gap={1} alignItems="center" sx={{ mt: 2, flexWrap: 'wrap' }}>
//               <Chip label={`Stand : ${selectedSalePoint.name}`} />
//               {selectedSalePoint.type && <Chip label={selectedSalePoint.type} variant="outlined" />}
//               <Chip variant="outlined" label={`Articles : ${menus.length}`} />
//               <Chip color="secondary" variant="outlined" label={`Panier : ${selectedItems.length}`} />
//               <Button size="small" onClick={() => setPickOpen(true)} sx={{ ml: 'auto' }}>
//                 Changer de stand
//               </Button>
//             </Stack>
//           )}
//         </Paper>

//         {/* Menus */}
//         {!selectedSalePoint ? (
//           <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
//             <Typography variant="h6" fontWeight={800}>Aucun stand sélectionné</Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//               Choisis un stand avec le sélecteur ci-dessus.
//             </Typography>
//             <Button sx={{ mt: 2 }} variant="contained" onClick={() => setPickOpen(true)}>
//               Choisir un stand
//             </Button>
//           </Paper>
//         ) : loading ? (
//           <Grid container spacing={2}>
//             {Array.from({ length: 6 }).map((_, i) => (
//               <Grid item xs={12} sm={6} md={4} key={i}>
//                 <Paper sx={{ p: 2, borderRadius: 3 }}>
//                   <Skeleton variant="rectangular" height={170} sx={{ borderRadius: 2 }} />
//                   <Skeleton variant="text" sx={{ mt: 1, width: '60%' }} />
//                   <Skeleton variant="text" width="40%" />
//                   <Skeleton variant="rectangular" height={36} sx={{ mt: 1.5, borderRadius: 2 }} />
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         ) : filteredMenus.length === 0 ? (
//           <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
//             <Typography variant="h6" fontWeight={800}>Aucun résultat</Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//               Modifie ta recherche ou change de stand.
//             </Typography>
//           </Paper>
//         ) : (
//           <Grid container spacing={2}>
//             {filteredMenus.map((item) => (
//               <Grid item xs={12} sm={6} md={4} key={item._id}>
//                 <MenuCard item={item} />
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         {/* Panier */}
//         {selectedItems.length > 0 && (
//           <Paper sx={{ mt: 4, p: 2.5, borderRadius: 3, bgcolor: '#0b1220', color: 'white' }}>
//             <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//               <Typography variant="h6" fontWeight={800}>🛒 Panier du client</Typography>
//               <Chip label={`${selectedItems.length} article(s)`} sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }} />
//             </Stack>

//             <Divider sx={{ borderColor: 'rgba(255,255,255,0.16)', mb: 2 }} />

//             <Stack gap={1}>
//               {selectedItems.map((item, index) => (
//                 <Box
//                   key={index}
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   sx={{ p: 1.25, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)' }}
//                 >
//                   <Typography>
//                     {item.name}{' '}
//                     <Typography component="span" color="rgba(255,255,255,0.7)">x{item.quantity}</Typography>
//                   </Typography>
//                   <Box display="flex" alignItems="center" gap={1.5}>
//                     <Typography>{item.total.toLocaleString()} FCFA</Typography>
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       size="small"
//                       onClick={() => handleRemoveItem(item.name)}
//                       startIcon={<DeleteOutlineIcon />}
//                       sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.24)' }}
//                     >
//                       Retirer
//                     </Button>
//                   </Box>
//                 </Box>
//               ))}
//             </Stack>

//             <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
//               <Typography variant="h6">Total</Typography>
//               <Typography variant="h6" fontWeight={900}>{cartTotal.toLocaleString()} FCFA</Typography>
//             </Stack>

//             <Box sx={{ mt: 2, textAlign: 'right' }}>
//               <Button variant="contained" color="success" startIcon={<CreditCardIcon />} onClick={() => setOpenModal(true)}>
//                 Valider la facture
//               </Button>
//             </Box>
//           </Paper>
//         )}

//         {/* Paiement */}
//         <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
//           <DialogTitle>💳 Paiement par carte</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Numéro de carte"
//               fullWidth
//               variant="outlined"
//               value={cardNumber}
//               onChange={handleCardNumberChange}
//               margin="normal"
//             />
//             {cardInfo && (
//               <Typography variant="body2" color="green">
//                 ✅ Carte détectée : Solde disponible : <strong>{formatPrice(cardInfo.balance)}</strong>
//               </Typography>
//             )}
//             {cardError && <Typography variant="body2" color="error">❌ {cardError}</Typography>}
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               Montant à débiter : <strong>{formatPrice(cartTotal)}</strong>
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenModal(false)}>Annuler</Button>
//             <Button onClick={handlePayment} variant="contained" color="primary" disabled={!cardInfo}>
//               Confirmer le paiement
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Historique paiements */}
//         <Box sx={{ mt: 5 }}>
//           <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
//             <Typography variant="h6" fontWeight={800}>Historique des paiements</Typography>
//           </Stack>

//           {orderHistory.map((order, index) => (
//             <Paper key={index} elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
//                 <Typography variant="subtitle1" fontWeight={800}>💰 {order.totalAmount.toLocaleString()} FCFA</Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   {new Date(order.createdAt).toLocaleString()}
//                 </Typography>
//               </Box>

//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 🪪 Carte : <strong>{order.cardNumber}</strong>
//               </Typography>

//               <Divider sx={{ mb: 1.5 }} />
//               {order.items.map((item, i) => (
//                 <Typography key={i} variant="body2" sx={{ pl: .5 }}>
//                   🍽️ {item.menuItem?.name || 'Menu'} – {item.quantity} × {item.unitPrice.toLocaleString()} FCFA
//                 </Typography>
//               ))}

//               {order.clientTransaction && (
//                 <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mt: 1 }}>
//                   <Typography variant="caption" color="text.secondary">
//                     🔁 Solde avant : {order.clientTransaction.balanceBefore.toLocaleString()} FCFA
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     💳 Solde après : {order.clientTransaction.balanceAfter.toLocaleString()} FCFA
//                   </Typography>
//                 </Stack>
//               )}

//               <Box sx={{ mt: 1.5, textAlign: 'right' }}>
//                 <Button
//                   variant="outlined"
//                   onClick={() =>
//                     generateReceiptPDF(order, order.clientTransaction, order.clientTransaction?.client)
//                   }
//                 >
//                   🖨️ Imprimer le reçu
//                 </Button>
//               </Box>
//             </Paper>
//           ))}

//           {totalPages > 1 && (
//             <Stack alignItems="center" sx={{ mt: 2 }}>
//               <Pagination page={page} count={totalPages} onChange={(_, p) => setPage(p)} color="primary" />
//             </Stack>
//           )}
//         </Box>
//       </Container>

//       {/* Dialog de choix de stand */}
//       <StandPickerDialog />
//     </Box>
//   );
// };

// export default AgentDashboardPage;





import React, { useEffect, useMemo, useState } from 'react';
import {
  AppBar, Toolbar, Container, Box, Grid, Paper, Typography, TextField, MenuItem,
  Card,  CardContent, CardActions, Button, IconButton, Chip, Stack,
  InputAdornment, Divider, Dialog, DialogTitle, DialogContent, DialogActions,
  Badge, Skeleton, Pagination, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HistoryIcon from '@mui/icons-material/History';
import API from '../services/api';
import { generateReceiptPDF } from '../utils/generateReceipt';

/* ========= Helpers images ========= */

const STORAGE_KEY = 'selectedSalePointId';
const formatPrice = (n) => `${Number(n || 0).toLocaleString('fr-FR')} FCFA`;

const AgentDashboardPage = () => {
  /* ------ état panier / menus ------ */
  const [selectedItems, setSelectedItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

  const [salePoints, setSalePoints] = useState([]);
  const [selectedSalePoint, setSelectedSalePoint] = useState(null);

  const [cardInfo, setCardInfo] = useState(null);
  const [cardError, setCardError] = useState(null);

  /* ------ historique (NOUVEAU) ------ */
  const [historyOpen, setHistoryOpen] = useState(false);
  const [histOrders, setHistOrders] = useState([]);
  const [histLoading, setHistLoading] = useState(false);
  const [histPage, setHistPage] = useState(1);
  const [histTotalPages, setHistTotalPages] = useState(1);
  const [histQueryInput, setHistQueryInput] = useState('');
  const [histQuery, setHistQuery] = useState('');

  /* ------ UX ------ */
  const [query, setQuery] = useState('');
  const [pickOpen, setPickOpen] = useState(false);

  /* ------ stands ------ */
  useEffect(() => {
    const fetchSalePoints = async () => {
      try {
        const { data } = await API.get('/salepoints');
        setSalePoints(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des stands :', error);
      }
    };
    fetchSalePoints();
  }, []);

  useEffect(() => {
    if (salePoints.length > 0) {
      const savedId = sessionStorage.getItem(STORAGE_KEY);
      if (savedId) {
        const sp = salePoints.find((s) => s._id === savedId);
        if (sp) {
          setSelectedSalePoint(sp);
          fetchMenusBySalePoint(sp._id);
          return;
        }
      }
      setPickOpen(true);
    }
  }, [salePoints]);

  const fetchMenusBySalePoint = async (salePointId) => {
    if (!salePointId) return;
    setLoading(true);
    try {
      const { data } = await API.get(`/menuitems/salepoint/${salePointId}`);
      setMenus(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erreur chargement menus :', error);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  const chooseStand = (id) => {
    const sp = salePoints.find((s) => s._id === id) || null;
    setSelectedSalePoint(sp);
    setMenus([]);
    if (sp) {
      sessionStorage.setItem(STORAGE_KEY, sp._id);
      fetchMenusBySalePoint(sp._id);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    setPickOpen(false);
  };

  /* ------ carte client ------ */
  const handleCardNumberChange = async (e) => {
    const number = e.target.value;
    setCardNumber(number);
    setCardInfo(null);
    setCardError(null);
    if (number.length >= 6) {
      try {
        const response = await API.get(`/clients/by-code/${number}`);
        setCardInfo(response.data);
      } catch (error) {
        setCardInfo(null);
        setCardError('Client non trouvé');
      }
    }
  };

  /* ------ panier ------ */
  const handleAddToCart = (item) => {
    const existingItem = selectedItems.find((i) => i.id === item._id);
    if (existingItem) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.id === item._id ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.price } : i
        )
      );
    } else {
      setSelectedItems((prev) => [
        ...prev,
        { id: item._id, name: item.name, price: item.price, quantity: 1, total: item.price },
      ]);
    }
  };

  const handleRemoveItem = (name) => {
    setSelectedItems((prev) => prev.filter((item) => item.name !== name));
  };

  const cartTotal = useMemo(() => selectedItems.reduce((s, i) => s + i.total, 0), [selectedItems]);

  const handlePayment = async () => {
    try {
      const response = await API.post('/orders/pay', {
        cardNumber,
        amount: cartTotal,
        items: selectedItems,
      });

      if (response.data.success) {
        alert('✅ Paiement effectué avec succès ! Le reçu sera envoyé au client.');
        setOpenModal(false);
        setSelectedItems([]);
        setCardNumber('');
      } else {
        alert('❌ Échec du paiement : ' + response.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Une erreur est survenue pendant le paiement.';
      alert('❌ Échec du paiement : ' + msg);
    }
  };

  const refreshMenus = () => {
    if (selectedSalePoint?._id) fetchMenusBySalePoint(selectedSalePoint._id);
  };

  /* ------ filtrage local menus ------ */
  const filteredMenus = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return menus;
    return menus.filter(
      (m) => m.name?.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q)
    );
  }, [menus, query]);

  /* ------ Historique (bouton + modal) ------ */

  const openHistory = () => {
    setHistoryOpen(true);
  };

  const closeHistory = () => {
    setHistoryOpen(false);
  };

  const fetchHistory = async (page = histPage, q = histQuery) => {
    setHistLoading(true);
    try {
      const { data } = await API.get('/orders/my-payments', {
        params: { page, limit: 50, q }, // si non supporté côté backend, on filtre côté client juste après
      });

      let orders = data?.orders || [];

      // Filtre local par client si le backend n'implémente pas "q"
      if (q) {
        const needle = q.toLowerCase();
        orders = orders.filter((o) => {
          const card = (o.cardNumber || '').toLowerCase();
          const name = (o.clientTransaction?.client?.user?.name || '').toLowerCase();
          const phone = (o.clientTransaction?.client?.user?.phone || '').toLowerCase();
          return card.includes(needle) || name.includes(needle) || phone.includes(needle);
        });
      }

      setHistOrders(orders);
      setHistTotalPages(data?.totalPages || 1);
      setHistPage(data?.page || page);
    } catch (e) {
      console.error('Erreur historique (modal):', e);
      setHistOrders([]);
      setHistTotalPages(1);
    } finally {
      setHistLoading(false);
    }
  };

  useEffect(() => {
    if (historyOpen) {
      fetchHistory(1, histQuery); // charge les 50 derniers (page 1) à l’ouverture
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyOpen]);

// helper existant chez toi
const publicUrl = (p) => {
  if (!p) return '/no-image.png';
  if (/^https?:\/\//i.test(p)) return p;
  const ORIGIN = (API.defaults?.baseURL || '').replace(/\/api\/?$/, '');
  return `${ORIGIN}${p.startsWith('/') ? p : `/${p}`}`;
};





//   const MenuCard = ({ item }) => (
//     <Card
//       sx={{
//         height: '100%',
//         borderRadius: 3,
//         boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
//         overflow: 'hidden',
//         transition: 'transform .2s ease, box-shadow .2s ease',
//         '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' },
//       }}
//     >
//       {/* <CardMedia
//         component="img"
//         height="170"
//         image={publicUrl(item.photo)}
//         alt={item.name}
//         loading="lazy"
//         crossOrigin="anonymous"
//         referrerPolicy="no-referrer"
//         onError={(e) => {
//           e.currentTarget.onerror = null;
//           e.currentTarget.src = '/no-image.png';
//         }}
//         sx={{ objectFit: 'cover' }}
//       /> */}


//       {/* <Box
//   component="img"
//   src={publicUrl(item.photo)}
//   alt={item.name}
//   loading="lazy"
//   onError={(e) => {
//     e.currentTarget.onerror = null;
//     e.currentTarget.src = '/no-image.png';
//   }}
//   style={{
//     width: '100%',
//     height: 220,          // ⟵ ajuste (200–260 par ex.)
//     objectFit: 'contain', // ⟵ montre l’image entière
//     background: '#f5f7fa',
//     display: 'block',
//   }}
// /> */}



// {/* Image responsive, non-coupée, même “hauteur visuelle” qu’avant */}
// <Box
//   sx={{
//     height: 170,                     // ≈ comme avant
//     bgcolor: '#f5f7fa',              // fond doux autour si l’image ne remplit pas
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//   }}
// >
//   <Box
//     component="img"
//     src={publicUrl(item.photo)}
//     alt={item.name}
//     loading="lazy"
//     crossOrigin="anonymous"
//     referrerPolicy="no-referrer"
//     onError={(e) => {
//       e.currentTarget.onerror = null;
//       e.currentTarget.src = '/no-image.png';
//     }}
//     sx={{
//       maxWidth: '100%',
//       maxHeight: '100%',
//       objectFit: 'contain',          // ⟵ montre l’image en entier
//       display: 'block',
//     }}
//   />
// </Box>



//       <CardContent>
//         <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//           <Typography variant="h6" fontWeight={800}>{item.name}</Typography>
//           <Chip label={formatPrice(item.price)} color="primary" size="small" />
//         </Stack>
//         {item.description && (
//           <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//             {item.description}
//           </Typography>
//         )}
//       </CardContent>
//       <CardActions sx={{ px: 2, pb: 2 }}>
//         <Button fullWidth variant="contained" onClick={() => handleAddToCart(item)}>
//           Ajouter
//         </Button>
//       </CardActions>
//     </Card>
//   );



function MenuCard({ item }) {
  const IMG_H = 200; // ajuste 170–240 selon ton look

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        transition: 'transform .2s ease, box-shadow .2s ease',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' },
      }}
    >
      {/* Cadre image : l’image occupe 100% du cadre sans être rognée */}
      <Box
        sx={{
          height: IMG_H,
          bgcolor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={publicUrl(item.photo)}
          alt={item.name}
          loading="lazy"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/no-image.png';
          }}
          sx={{
            width: '100%',       // ✅ prend toute la largeur du cadre
            height: '100%',      // ✅ prend toute la hauteur du cadre
            objectFit: 'contain' // ✅ visible en entier (non rognée)
          }}
        />
      </Box>

      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" fontWeight={800}>{item.name}</Typography>
          <Chip label={`${Number(item.price).toLocaleString('fr-FR')} FCFA`} color="primary" size="small" />
        </Stack>
        {item.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {item.description}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button fullWidth variant="contained" onClick={() => handleAddToCart(item)}>
          Ajouter
        </Button>
      </CardActions>
    </Card>
  );
}




  const StandPickerDialog = () => (
    <Dialog open={pickOpen} onClose={() => setPickOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Choisir un stand</DialogTitle>
      <DialogContent dividers>
        {salePoints.length === 0 ? (
          <Typography color="text.secondary">Aucun stand disponible.</Typography>
        ) : (
          <Grid container spacing={2}>
            {salePoints.map((sp) => (
              <Grid item xs={12} sm={6} key={sp._id}>
                <Paper
                  onClick={() => chooseStand(sp._id)}
                  sx={{
                    p: 2, borderRadius: 2, cursor: 'pointer', border: '1px solid', borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' },
                  }}
                >
                  <Typography fontWeight={800}>{sp.name}</Typography>
                  {sp.type && (
                    <Typography variant="body2" color="text.secondary">
                      {sp.type}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPickOpen(false)}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );

  const HistoryDialog = () => (
    <Dialog open={historyOpen} onClose={closeHistory} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <HistoryIcon /> Historique des paiements (50 derniers par page)
      </DialogTitle>

      <DialogContent dividers>
        {/* Barre de recherche client */}
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Rechercher par client (nom, téléphone, n° carte)"
            value={histQueryInput}
            onChange={(e) => setHistQueryInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              setHistQuery(histQueryInput.trim());
              setHistPage(1);
              fetchHistory(1, histQueryInput.trim());
            }}
          >
            Rechercher
          </Button>
        </Stack>

        {histLoading ? (
          <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : histOrders.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Typography>Aucun paiement trouvé.</Typography>
          </Paper>
        ) : (
          <Stack gap={1.5}>
            {histOrders.map((order, idx) => (
              <Paper
                key={order._id || idx}
                elevation={0}
                sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography variant="subtitle1" fontWeight={800}>
                    💰 {order.totalAmount?.toLocaleString()} FCFA
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  🪪 Carte : <strong>{order.cardNumber}</strong>
                  {order.clientTransaction?.client?.user?.name && (
                    <> — {order.clientTransaction.client.user.name}</>
                  )}
                  {order.clientTransaction?.client?.user?.phone && (
                    <> — {order.clientTransaction.client.user.phone}</>
                  )}
                </Typography>

                <Divider sx={{ mb: 1.5 }} />

                {order.items?.map((it, i) => (
                  <Typography key={i} variant="body2" sx={{ pl: .5 }}>
                    🍽️ {it.menuItem?.name || 'Menu'} – {it.quantity} × {it.unitPrice?.toLocaleString()} FCFA
                  </Typography>
                ))}

                {order.clientTransaction && (
                  <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      🔁 Solde avant : {order.clientTransaction.balanceBefore?.toLocaleString()} FCFA
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      💳 Solde après : {order.clientTransaction.balanceAfter?.toLocaleString()} FCFA
                    </Typography>
                  </Stack>
                )}

                <Box sx={{ mt: 1.25, textAlign: 'right' }}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      generateReceiptPDF(order, order.clientTransaction, order.clientTransaction?.client)
                    }
                  >
                    🖨️ Imprimer le reçu
                  </Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
          Page {histPage} / {histTotalPages}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Pagination
            page={histPage}
            count={histTotalPages}
            onChange={(_, p) => {
              setHistPage(p);
              fetchHistory(p, histQuery);
            }}
            color="primary"
          />
          <Button onClick={closeHistory}>Fermer</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: (t) => t.palette.grey[50] }}>
      {/* AppBar */}
      <AppBar position="sticky" elevation={0} sx={{ background: 'linear-gradient(90deg,#1f2937 0%,#0b1220 100%)' }}>
        <Toolbar sx={{ gap: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: .3 }}>
            Tableau de bord · Agent
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Button
            color="inherit"
            startIcon={<HistoryIcon />}
            onClick={openHistory}
            sx={{ textTransform: 'none' }}
          >
            Historique
          </Button>

          <IconButton
            color="inherit"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            <Badge badgeContent={selectedItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Filtres visibles (stands + recherche menus) */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                select
                fullWidth
                label="Sélectionner un stand"
                value={selectedSalePoint?._id || ''}
                onChange={(e) => chooseStand(e.target.value)}
              >
                <MenuItem value="">— Choisir un stand —</MenuItem>
                {salePoints.map((sp) => (
                  <MenuItem key={sp._id} value={sp._id}>
                    {sp.name} {sp.type ? `(${sp.type})` : ''}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Rechercher un menu (nom, description)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={refreshMenus}
                disabled={!selectedSalePoint}
              >
                Actualiser
              </Button>
            </Grid>
          </Grid>

          {selectedSalePoint && (
            <Stack direction="row" gap={1} alignItems="center" sx={{ mt: 2, flexWrap: 'wrap' }}>
              <Chip label={`Stand : ${selectedSalePoint.name}`} />
              {selectedSalePoint.type && <Chip label={selectedSalePoint.type} variant="outlined" />}
              <Chip variant="outlined" label={`Articles : ${menus.length}`} />
              <Chip color="secondary" variant="outlined" label={`Panier : ${selectedItems.length}`} />
              <Button size="small" onClick={() => setPickOpen(true)} sx={{ ml: 'auto' }}>
                Changer de stand
              </Button>
            </Stack>
          )}
        </Paper>

        {/* Menus */}
        {!selectedSalePoint ? (
          <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight={800}>Aucun stand sélectionné</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Choisis un stand avec le sélecteur ci-dessus.
            </Typography>
            <Button sx={{ mt: 2 }} variant="contained" onClick={() => setPickOpen(true)}>
              Choisir un stand
            </Button>
          </Paper>
        ) : loading ? (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Skeleton variant="rectangular" height={170} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="text" sx={{ mt: 1, width: '60%' }} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={36} sx={{ mt: 1.5, borderRadius: 2 }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : filteredMenus.length === 0 ? (
          <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h6" fontWeight={800}>Aucun résultat</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Modifie ta recherche ou change de stand.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {filteredMenus.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <MenuCard item={item} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Panier */}
        {selectedItems.length > 0 && (
          <Paper sx={{ mt: 4, p: 2.5, borderRadius: 3, bgcolor: '#0b1220', color: 'white' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="h6" fontWeight={800}>🛒 Panier du client</Typography>
              <Chip label={`${selectedItems.length} article(s)`} sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'white' }} />
            </Stack>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.16)', mb: 2 }} />

            <Stack gap={1}>
              {selectedItems.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ p: 1.25, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)' }}
                >
                  <Typography>
                    {item.name}{' '}
                    <Typography component="span" color="rgba(255,255,255,0.7)">x{item.quantity}</Typography>
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Typography>{item.total.toLocaleString()} FCFA</Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveItem(item.name)}
                      startIcon={<DeleteOutlineIcon />}
                      sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.24)' }}
                    >
                      Retirer
                    </Button>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" fontWeight={900}>{cartTotal.toLocaleString()} FCFA</Typography>
            </Stack>

            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button variant="contained" color="success" startIcon={<CreditCardIcon />} onClick={() => setOpenModal(true)}>
                Valider la facture
              </Button>
            </Box>
          </Paper>
        )}

        {/* Paiement */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle>💳 Paiement par carte</DialogTitle>
          <DialogContent>
            <TextField
              label="Numéro de carte"
              fullWidth
              variant="outlined"
              value={cardNumber}
              onChange={handleCardNumberChange}
              margin="normal"
            />
            {cardInfo && (
              <Typography variant="body2" color="green">
                ✅ Carte détectée : <strong>{formatPrice(cardInfo.balance)}</strong> disponibles
              </Typography>
            )}
            {cardError && <Typography variant="body2" color="error">❌ {cardError}</Typography>}
            <Typography variant="body2" sx={{ mt: 1 }}>
              Montant à débiter : <strong>{formatPrice(cartTotal)}</strong>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Annuler</Button>
            <Button onClick={handlePayment} variant="contained" color="primary" disabled={!cardInfo}>
              Confirmer le paiement
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      {/* Choix stand */}
      <StandPickerDialog />

      {/* Historique (modal) */}
      <HistoryDialog />
    </Box>
  );
};

export default AgentDashboardPage;
