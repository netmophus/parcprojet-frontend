
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material';
import jsPDF from 'jspdf';

const ChildCardModal = ({ open, onClose, child }) => {
  if (!child) return null;


  const handleGeneratePDF = async () => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [150, 90], // format carte
  });

  const toBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.warn("Erreur image", url, err);
      return null;
    }
  };

  const photoUrl = `http://localhost:5000${child.photo}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${child.qrcode}`;

  const base64Photo = await toBase64(photoUrl);
  const base64Qr = await toBase64(qrCodeUrl);

  // TITRE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Carte Enfant - Centre Récréatif', 10, 15);

  // PHOTO
  if (base64Photo) {
    doc.addImage(base64Photo, 'JPEG', 10, 25, 30, 30); // à gauche
  }

  // QR CODE en dessous de la photo
  if (base64Qr) {
    doc.addImage(base64Qr, 'PNG', 15, 62, 20, 20);
  }

  // INFOS à droite
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  let x = 55;
  let y = 30;

  doc.text(`Nom : ${child.name}`, x, y); y += 7;
  doc.text(`Date de naissance : ${new Date(child.birthDate).toLocaleDateString()}`, x, y); y += 7;
  doc.text(`Sexe : ${child.gender}`, x, y); y += 7;
  doc.text(`Parent : ${child.parent?.name ?? ''}`, x, y); y += 7;
  doc.text(`Téléphone : ${child.parent?.phone ?? ''}`, x, y); y += 7;
  doc.text(`Solde : ${child.balance} FCFA`, x, y); y += 7;
  doc.text(`Code visible : ${child.codeVisible}`, x, y);

  doc.save(`carte_enfant_${child.name}.pdf`);
};






  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>🧒 Fiche de l’enfant</DialogTitle>
      <DialogContent>
        <Box textAlign="center" mb={2}>
          <img
            src={child.photo || '/default-child.jpg'}
            alt="Photo de l’enfant"
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          👤 Nom : {child.name}
        </Typography>
        <Typography>
          🎂 Date de naissance : {new Date(child.birthDate).toLocaleDateString()}
        </Typography>
        <Typography>⚧ Sexe : {child.gender}</Typography>
        <Typography mt={2}>
          👨‍👧 Parent : {child.parent?.name} – {child.parent?.phone}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography>
          💰 Solde : <strong>{child.balance} FCFA</strong>
        </Typography>
        <Typography>🔑 Code visible : {child.codeVisible}</Typography>

        <Box mt={2} textAlign="center">
          <img
            src={child.qrcode}
            alt="QR Code"
            style={{ width: 100, height: 100 }}
          />
        </Box>

        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
            🖨️ Imprimer la carte (PDF)
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChildCardModal;
