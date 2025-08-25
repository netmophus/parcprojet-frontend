// src/pages/HomePage.js
// Home "Parc Salma – Loisirs. Culture. Saveurs." — version publique (pas d'infos perso)

import * as React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  Stack,
  Divider,
   Avatar,  
} from "@mui/material";

import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import AttractionsRoundedIcon from "@mui/icons-material/AttractionsRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";


// en haut de HomePage.js
import { Dialog, DialogContent, DialogActions, useMediaQuery, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
// (optionnel) tu peux retirer PersonAddAltRoundedIcon / ExploreRoundedIcon si non utilisés

import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';

import { alpha } from '@mui/material/styles';




import { Link as RouterLink } from "react-router-dom";


const brand = {
  green: "#11693A",
  greenDark: "#0D5330",
  orange: "#F26B21",
  blue: "#0B79BF",
  cream: "#F7F5F0",
};

// ---------- Données d'exemple pour les sections publiques ----------
const QUICK_ACTIONS = [
  { key: "recharge", title: "Recharger ma carte", icon: <AddCardRoundedIcon />, color: brand.blue },
  { key: "scan", title: "Scanner & Payer", icon: <QrCode2RoundedIcon />, color: brand.green },
  { key: "addChild", title: "Ajouter un enfant", icon: <FamilyRestroomRoundedIcon />, color: brand.orange },
  { key: "transfer", title: "Transférer entre cartes", icon: <CompareArrowsRoundedIcon />, color: "#6C63FF" },
  { key: "block", title: "Bloquer ma carte", icon: <LockRoundedIcon />, color: "#C62828" },
];




const CATEGORIES = [
  {
    key: "maneges",
    title: "Manèges",
    icon: <AttractionsRoundedIcon sx={{ fontSize: 40 }} />,
    accent: brand.green,
    desc: "Tyrolienne, karting, toboggans...",
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ"
  },
  {
    key: "loisirs",
    title: "Loisirs",
    icon: <SportsEsportsRoundedIcon sx={{ fontSize: 40 }} />,
    accent: brand.blue,
    desc: "Jeux d’eau, mini-golf, zone kids.",
    videoUrl: "https://youtu.be/ysz5S6PUM-U"
  },
  {
    key: "saveurs",
    title: "Saveurs",
    icon: <RestaurantMenuRoundedIcon sx={{ fontSize: 40 }} />,
    accent: brand.orange,
    desc: "Resto, grillades, pâtisserie.",
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4"
  },
  {
    key: "sport",
    title: "Sport & Bien-être",
    icon: <FitnessCenterRoundedIcon sx={{ fontSize: 40 }} />,
    accent: "#37474F",
    desc: "Musculation, fitness, massage.",
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
  },
];



// Détails/CTA par action (adapte les routes selon ton app)
const ACTION_DETAILS = {
  recharge: {
    desc: "Ajoutez du crédit par carte bancaire, mobile money ou au guichet.",
     //primary: { label: "Recharger maintenant", to: "/topup" },
    secondary: { label: "Trouver une caisse", to: "/map?filter=caisses", icon: <StorefrontRoundedIcon /> },
  },
  scan: {
    desc: "Réglez en 1 scan via QR/NFC chez les opérateurs et restaurants.",
    //primary: { label: "Ouvrir le scanner", to: "/scan" },
  },
  addChild: {
    desc: "Créez un profil enfant et fixez des limites de dépenses.",
    //primary: { label: "Créer un profil", to: "/parent/children/new" },
  },
  transfer: {
    desc: "Déplacez du solde entre vos cartes famille instantanément.",
   // primary: { label: "Transférer", to: "/transfer" },
  },
  block: {
    desc: "Perte ou vol ? Bloquez la carte immédiatement (réversible).",
    // primary: { label: "Bloquer maintenant", to: "/card/block" },
  },
};


const OFFERS = [
  // existantes
  { key: "grillade", title: "Menu Grillade + Boisson", price: 3500, badge: "-15%", desc: "Économisez aujourd’hui." },
  { key: "poisson",  title: "Poisson braisé du Chef",  price: 4900, badge: "Saveur du jour", desc: "Avec légumes croquants." },
  { key: "fitness",  title: "Pass Fitness 45 min",     price: 1000, badge: "Bien-être", desc: "Salle climatisée." },

  // nouvelles — Restauration
  { key: "pizza",        title: "Formule Pizza + Soda",      price: 3000, badge: "Best-seller", desc: "Pâte fine, sauce maison." },
  { key: "burger",       title: "Menu Burger + Frites",      price: 3500, badge: "Nouveau",    desc: "Pain brioché, steak 120g." },
  { key: "menu-enfant",  title: "Menu Enfant",               price: 2500, badge: "Kids",       desc: "Mini burger, frites, jus." },
  { key: "patisserie",   title: "Pâtisserie + Jus frais",    price: 2000, badge: "Gourmand",   desc: "Part au choix + jus pressé." },

  // Boissons
  { key: "smoothie",     title: "Smoothie Mangue 50 cl",     price: 1200, badge: "Frais",      desc: "100% fruits, sans sucre ajouté." },
  { key: "granite",      title: "Granité menthe/citron",     price: 800,  badge: "Rafraîchissant", desc: "Parfait après les manèges." },

  // Bien-être / Sport
  { key: "massage20",    title: "Massage Relax 20 min",      price: 3000, badge: "Détente",     desc: "Relâchement express." },
  { key: "massageDuo",   title: "Massage Duo 2×20 min",      price: 5500, badge: "Duo",        desc: "À partager à deux." },
  { key: "fitness-month",title: "Abonnement Fitness (1 mois)",price: 15000,badge: "Promo",      desc: "Accès illimité à la salle." },

  // Manèges / Pack
  { key: "family-pack",  title: "Pack Famille Manèges (x4)", price: 8000, badge: "Famille -20%", desc: "4 attractions au choix." },
  { key: "karting10",    title: "Karting — 10 minutes",      price: 2000, badge: "Adrénaline",  desc: "Casque & briefing inclus." },
];


const ACTIVITIES = [
  { key: "tyrolienne", title: "Grande Tyrolienne", price: 1500, badge: "Taille ≥ 1,30 m" },
  { key: "karting", title: "Karting Junior", price: 2000, badge: "Âge 7–12" },
  { key: "toboggan", title: "Toboggan Aquatique", price: 1200, badge: "Maillot obligatoire" },
];

// ---------- Utils ----------
const formatFCFA = (n) =>
  `${n?.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} F CFA`;

// ---------- Atomes ----------
function SectionTitle({ icon, children, action, id }) {
  return (
    <Stack id={id} direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5, mt: 3 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography variant="h6" fontWeight={700}>{children}</Typography>
      </Stack>
      {action ?? null}
    </Stack>
  );
}

function QuickActionCard({ title, icon, color, onClick }) {
  return (
    <Card
      onClick={onClick}
      elevation={0}
      sx={{
        bgcolor: `${color}14`,
        border: "1px solid",
        borderColor: `${color}33`,
        cursor: "pointer",
        height: "100%",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: color, color: "#fff", display: "grid", placeItems: "center", flex: "0 0 42px" }}>
          {icon}
        </Box>
        <Typography variant="body1" fontWeight={600} sx={{ lineHeight: 1.2 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

function Pill({ children, color = brand.orange }) {
  return (
    <Chip
      label={children}
      size="small"
      sx={{ bgcolor: `${color}1A`, color, fontWeight: 700, borderRadius: 2 }}
    />
  );
}

function CategoryCard({ title, icon, accent, desc, onOpen }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "#E6E6E6",
        height: "100%",
        borderRadius: 2,
        transition: "box-shadow .2s, transform .2s",
        "&:hover": { boxShadow: 4, transform: "translateY(-2px)" }
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Box
            sx={{
              width: 56, height: 56, borderRadius: 2,
              bgcolor: alpha(accent, 0.12), color: accent,
              display: "grid", placeItems: "center"
            }}
          >
            {icon}
          </Box>
          <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
          <Typography variant="body2" color="text.secondary">{desc}</Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button
          onClick={onOpen}
          startIcon={<PlayCircleRoundedIcon />}
          endIcon={<ArrowForwardRoundedIcon className="arrow" />}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: 1.5,
            py: 0.75,
            fontWeight: 700,
            bgcolor: alpha(accent, 0.10),
            color: accent,
            boxShadow: `inset 0 0 0 1px ${alpha(accent, 0.25)}`,
            transition: "all .2s ease",
            "&:hover": {
              bgcolor: accent,
              color: "#fff",
              boxShadow: `0 8px 18px -8px ${alpha(accent, 0.7)}`,
              "& .arrow": { transform: "translateX(2px)" }
            }
          }}
        >
          Ouvrir
        </Button>
      </CardActions>
    </Card>
  );
}



// Convertit toute URL YouTube en URL embed
function toEmbedUrl(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("youtube") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    return url; // déjà au bon format
  } catch {
    return url;
  }
}

function VideoDialog({ video, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const src = video ? `${toEmbedUrl(video.videoUrl)}?autoplay=1&modestbranding=1&rel=0` : "";

  return (
    <Dialog open={!!video} onClose={onClose} fullWidth maxWidth="md" fullScreen={fullScreen}>
      <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
        <CloseRoundedIcon />
      </IconButton>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: "relative", pt: "56.25%" /* 16:9 */ }}>
          {video && (
            <Box
              component="iframe"
              src={src}
              title={video.title}
              sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={800}>{video?.title}</Typography>
          <Typography variant="body2" color="text.secondary">{video?.desc}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}



function OfferCard({ title, price, badge, onClick }) {
  return (
    <Card elevation={0} sx={{ border: "1px solid #E6E6E6", height: "100%", "&:hover": { boxShadow: 3 } }}>
      <CardContent>
        <Stack spacing={1}>
          <Pill color={brand.orange}>
            <LocalOfferRoundedIcon sx={{ mr: 0.5, fontSize: 18 }} />
            {badge}
          </Pill>
          <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
          <Typography variant="h6" fontWeight={800} color={brand.green}>{formatFCFA(price)}</Typography>
          <Typography variant="body2" color="text.secondary">Payez directement avec votre carte.</Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button
          onClick={onClick}
          variant="contained"
          fullWidth
          sx={{ textTransform: "none", bgcolor: brand.orange, "&:hover": { bgcolor: "#E4601F" } }}
        >
          Payer avec ma carte
        </Button>
      </CardActions>
    </Card>
  );
}

function ActivityCard({ title, price, badge, onClick }) {
  return (
    <Card elevation={0} sx={{ border: "1px solid #E6E6E6", height: "100%", "&:hover": { boxShadow: 3 } }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
          <Typography variant="h6" fontWeight={800} color={brand.green}>{formatFCFA(price)}</Typography>
          <Pill>{badge}</Pill>
        </Stack>
      </CardContent>
      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button onClick={onClick} size="small" sx={{ textTransform: "none" }}>Voir détails</Button>
      </CardActions>
    </Card>
  );
}

// ---------- Hero public (remplace la zone perso) ----------
function PublicHero() {
  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: 3,
        overflow: "hidden",
        color: "#fff",
        p: { xs: 3, sm: 4 },
        background: `linear-gradient(135deg, #148C4B 0%, #0D5330 60%),
                     radial-gradient(1200px 400px at 100% 0%, #1aa25b33 0%, transparent 60%),
                     radial-gradient(800px 300px at 0% 100%, #0b79bf33 0%, transparent 60%)`,
        position: "relative",
        minHeight: { xs: 240, sm: 280 },
      }}
    >
      {/* Badge décor en haut-droite */}
      <Box sx={{
        position: "absolute", top: 16, right: 16, width: 64, height: 64,
        borderRadius: 2, bgcolor: "#ffffff26", display: "grid", placeItems: "center"
      }}>
        <QrCode2RoundedIcon sx={{ fontSize: 36 }} />
      </Box>

      <Stack spacing={1.2}>
        <Typography variant="overline" sx={{ opacity: 0.9 }}>
          Loisirs • Culture • Saveurs
        </Typography>

        <Typography variant="h4" fontWeight={900} lineHeight={1.15}>
          Bienvenue au <span style={{ color: "#FFD54F" }}>Parc Salma</span>
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 720, opacity: 0.95 }}>
          Obtenez une <b>carte prépayée</b> au guichet et payez partout :
          manèges, restauration, pâtisserie, salle de sport & massage.
        </Typography>

        {/* Parcours ultra simple */}
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
          <Chip
            avatar={<Avatar sx={{ bgcolor: "#ffffff2a", color: "#fff", width: 22, height: 22, fontSize: 12 }}>1</Avatar>}
            label="Passez au guichet caisse"
            size="small"
            sx={{ bgcolor: "#ffffff1f", color: "#fff" }}
          />
          <Chip
            avatar={<Avatar sx={{ bgcolor: "#ffffff2a", color: "#fff", width: 22, height: 22, fontSize: 12 }}>2</Avatar>}
            label="Créez & chargez votre carte"
            size="small"
            sx={{ bgcolor: "#ffffff1f", color: "#fff" }}
          />
          <Chip
            avatar={<Avatar sx={{ bgcolor: "#ffffff2a", color: "#fff", width: 22, height: 22, fontSize: 12 }}>3</Avatar>}
            label="Jouez & consommez sans cash"
            size="small"
            sx={{ bgcolor: "#ffffff1f", color: "#fff" }}
          />
        </Stack>

        {/* CTAs */}
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
          <Button
            component={RouterLink}
            to="/map?filter=caisses"          // adapte si ta route est /caisses ou /plan
            variant="contained"
            startIcon={<StorefrontRoundedIcon />}
            sx={{ textTransform: "none", bgcolor: brand.orange, "&:hover": { bgcolor: "#E4601F" } }}
          >
            Trouver une caisse
          </Button>

          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            startIcon={<LoginRoundedIcon />}
            sx={{ textTransform: "none", borderColor: "#fff", color: "#fff",
                  "&:hover": { borderColor: "#fff", bgcolor: "#ffffff14" } }}
          >
            Se connecter et voir mon solde
          </Button>
        </Stack>
      </Stack>

      {/* Mini “carte” verrouillée (aperçu moderne) */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: 12, sm: 20 },
          bottom: { xs: 12, sm: 16 },
          minWidth: 250,
          p: 1.5,
          borderRadius: 2,
          bgcolor: "#ffffff22",
          border: "1px solid #ffffff3a",
          backdropFilter: "blur(6px)",
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box
            sx={{
              width: 42, height: 42, borderRadius: 1.5,
              bgcolor: "#ffffff2a", display: "grid", placeItems: "center"
            }}
          >
            <CreditCardRoundedIcon />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" fontWeight={800}>Carte prépayée</Typography>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>
              Solde visible après connexion
            </Typography>
          </Box>
          <LockRoundedIcon sx={{ opacity: 0.9 }} />
        </Stack>
      </Box>
    </Box>
  );
}



function ActionSheet({ action, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  if (!action) return null;
  const meta = ACTION_DETAILS[action.key] || {};
  const grad = `linear-gradient(135deg, ${action.color} 0%, ${action.color}CC 100%)`;

  const go = (to) => () => {
    onClose();
    if (to) navigate(to);
  };

  return (
    <Dialog
      open={!!action}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          overflow: "hidden",
          bgcolor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box sx={{ p: { xs: 2.5, sm: 3 }, background: grad, color: "#fff", position: "relative" }}>
        <IconButton onClick={onClose} sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}>
          <CloseRoundedIcon />
        </IconButton>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ width: 56, height: 56, borderRadius: 2, bgcolor: "#ffffff22", display: "grid", placeItems: "center" }}>
            {action.icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight={800}>{action.title}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.95 }}>{meta.desc}</Typography>
          </Box>
        </Stack>
      </Box>

      <DialogContent sx={{ bgcolor: "#fff" }}>
        {/* Tu peux ajouter ici des champs contextuels (montant, sélection de carte…) */}
        <Typography variant="body2" color="text.secondary">
          Cette action nécessite une carte liée. Connectez-vous ou rendez-vous à une caisse pour créer/charger votre carte.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ bgcolor: "#fff", p: 2 }}>
        {meta.secondary && (
          <Button
            onClick={go(meta.secondary.to)}
            startIcon={meta.secondary.icon ?? null}
            sx={{ textTransform: "none" }}
          >
            {meta.secondary.label}
          </Button>
        )}
        <Button
          onClick={go(meta.primary?.to)}
          variant="contained"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ textTransform: "none", bgcolor: brand.orange, "&:hover": { bgcolor: "#E4601F" } }}
        >
          {meta.primary?.label || "Continuer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


// ---------- Page ----------
export default function HomePage() {
 
  const [activeAction, setActiveAction] = React.useState(null);

   const handleAction = (key) => () => {
    const found = QUICK_ACTIONS.find((a) => a.key === key);
    setActiveAction(found || null);
  };
  const closeSheet = () => setActiveAction(null);

  const go = (label) => () => console.log("Go to:", label);


  const [openCat, setOpenCat] = React.useState(null);
const openVideo = (cat) => setOpenCat(cat);
const closeVideo = () => setOpenCat(null);

  return (
    <Box sx={{ bgcolor: brand.cream, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
     

      {/* Contenu */}
      <Container maxWidth="md" sx={{ py: 2, flexGrow: 1 }}>
        {/* ✅ HERO PUBLIC à la place de "Bienvenue ML / Solde / Famille" */}
        <PublicHero />

        {/* Actions rapides */}
        <SectionTitle icon={<AddCardRoundedIcon />} id="actions">Mes actions rapides</SectionTitle>
        <Grid container spacing={1.5}>
          {QUICK_ACTIONS.map((a) => (
            <Grid key={a.key} item xs={6} sm={4} md={3}>
              <QuickActionCard title={a.title} icon={a.icon} color={a.color} onClick={handleAction(a.key)} />
            </Grid>
          ))}
        </Grid>

        {/* Catégories */}
        <SectionTitle icon={<AttractionsRoundedIcon />} id="categories">Catégories</SectionTitle>
      <Grid container spacing={1.5}>
  {CATEGORIES.map((c) => (
    <Grid key={c.key} item xs={12} sm={6} md={3}>
      <CategoryCard
        title={c.title}
        icon={c.icon}
        accent={c.accent}
        desc={c.desc}
        onOpen={() => openVideo(c)}   // ✅ ouvre la vidéo
      />
    </Grid>
  ))}
</Grid>


        {/* Offres du jour */}
        <SectionTitle
          icon={<LocalOfferRoundedIcon />}
          id="offres"
          action={<Button size="small" onClick={go("offers")} sx={{ textTransform: "none" }}>Tout voir</Button>}
        >
          Offres du jour
        </SectionTitle>
        <Grid container spacing={1.5}>
          {OFFERS.map((o) => (
            <Grid key={o.key} item xs={12} sm={6} md={4}>
              <OfferCard title={o.title} price={o.price} badge={o.badge} onClick={go(`offer:${o.key}`)} />
            </Grid>
          ))}
        </Grid>

        {/* Activités phares */}
        <SectionTitle icon={<AttractionsRoundedIcon />} id="activites">Activités phares</SectionTitle>
        <Grid container spacing={1.5}>
          {ACTIVITIES.map((a) => (
            <Grid key={a.key} item xs={12} sm={6} md={4}>
              <ActivityCard title={a.title} price={a.price} badge={a.badge} onClick={go(`activity:${a.key}`)} />
            </Grid>
          ))}
        </Grid>

        {/* Mini carte / liens utiles */}
        <Card elevation={0} sx={{ mt: 3, border: "1px solid #E6E6E6" }}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <MapRoundedIcon sx={{ color: brand.green }} />
              <Typography variant="subtitle1" fontWeight={700}>Carte du parc</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Repérez les caisses, restaurants, manèges et l’infirmerie.
            </Typography>
          </CardContent>
          <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
            <Button onClick={go("map")} variant="outlined" sx={{ textTransform: "none" }}>
              Itinéraire depuis ma position
            </Button>
          </CardActions>
        </Card>

        <Divider sx={{ my: 3 }} />
      </Container>
{/* 👉 Feuille d’action */}
<ActionSheet action={activeAction} onClose={closeSheet} />
<VideoDialog video={openCat} onClose={closeVideo} />

    </Box>
  );
}
