// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Typography,
//   Box,
//   Divider,
//   Button,
// } from '@mui/material';

// const ClientCardModal = ({ open, onClose, client }) => {
//   if (!client) return null;

//   const { user, gender, birthDate, codeVisible, balance, photo } = client;

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>🧾 Fiche du client</DialogTitle>
//       <DialogContent>
//         <Box textAlign="center" mb={2}>
//           <img
//             src={photo || '/default-avatar.png'}
//             alt="Photo"
//             style={{ width: 100, height: 100, borderRadius: '50%' }}
//           />
//           <Typography variant="h6" fontWeight="bold" mt={1}>
//             {user?.name}
//           </Typography>
//           <Typography variant="body2">{user?.phone}</Typography>
//         </Box>

//         <Divider sx={{ mb: 2 }} />

//         <Typography><strong>Date de naissance :</strong> {new Date(birthDate).toLocaleDateString()}</Typography>
//         <Typography><strong>Sexe :</strong> {gender}</Typography>
//         <Typography><strong>Code carte :</strong> {codeVisible}</Typography>
//         <Typography><strong>Solde :</strong> {balance} FCFA</Typography>
//         <Typography><strong>Date d’inscription :</strong> {new Date(client.createdAt).toLocaleDateString()}</Typography>

//         <Box mt={3} textAlign="center">
//           <Button variant="contained" onClick={() => window.print()}>
//             🖨️ Imprimer
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ClientCardModal;



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

const ClientCardModal = ({ open, onClose, client }) => {
  if (!client) return null;

  const { user, birthDate, gender, codeVisible, balance, photo, qrcode } = client;

  const handleGeneratePDF = async () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [150, 90],
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

    const photoUrl = photo ? `http://localhost:5000${photo}` : '/default-client.jpg';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${qrcode}`;

    const base64Photo = await toBase64(photoUrl);
    const base64Qr = await toBase64(qrCodeUrl);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Carte Client - Centre Récréatif', 10, 15);

    if (base64Photo) {
      doc.addImage(base64Photo, 'JPEG', 10, 25, 30, 30);
    }

    if (base64Qr) {
      doc.addImage(base64Qr, 'PNG', 15, 62, 20, 20);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    let x = 55;
    let y = 30;

    doc.text(`Nom : ${user.name}`, x, y); y += 7;
    doc.text(`Téléphone : ${user.phone}`, x, y); y += 7;
    doc.text(`Date de naissance : ${new Date(birthDate).toLocaleDateString()}`, x, y); y += 7;
    doc.text(`Sexe : ${gender}`, x, y); y += 7;
    doc.text(`Solde : ${balance} FCFA`, x, y); y += 7;
    doc.text(`Code visible : ${codeVisible}`, x, y);

    doc.save(`carte_client_${user.name}.pdf`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>👤 Fiche du client</DialogTitle>
      <DialogContent>
        <Box textAlign="center" mb={2}>
          <img
            src={photo ? `http://localhost:5000${photo}` : '/default-client.jpg'}
            alt="Photo du client"
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          👤 Nom : {user.name}
        </Typography>
        <Typography>📞 Téléphone : {user.phone}</Typography>
        <Typography>🎂 Date de naissance : {new Date(birthDate).toLocaleDateString()}</Typography>
        <Typography>⚧ Sexe : {gender}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography>
          💰 Solde : <strong>{balance} FCFA</strong>
        </Typography>
        <Typography>🔑 Code visible : {codeVisible}</Typography>

        <Box mt={2} textAlign="center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${qrcode}`}
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

export default ClientCardModal;
