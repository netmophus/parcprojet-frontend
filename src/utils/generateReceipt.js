import jsPDF from 'jspdf';

export const generateReceiptPDF = (order, transaction, client) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Reçu de Paiement', 20, 20);

  doc.setFontSize(12);
  doc.text(`Nom du client : ${client?.user?.name || '—'}`, 20, 40);
  doc.text(`Téléphone : ${client?.user?.phone || '—'}`, 20, 48);
  doc.text(`Carte : ${order.cardNumber}`, 20, 56);

  doc.text(`Montant payé : ${order.totalAmount} FCFA`, 20, 70);
  doc.text(`Solde avant : ${transaction?.balanceBefore || '—'} FCFA`, 20, 78);
  doc.text(`Solde après : ${transaction?.balanceAfter || '—'} FCFA`, 20, 86);
  doc.text(`Date : ${new Date(order.createdAt).toLocaleString()}`, 20, 94);

  doc.text('Détails de la commande :', 20, 110);
  let y = 120;
  order.items.forEach((item, i) => {
    doc.text(
      `${i + 1}. ${item.quantity} x ${item.unitPrice} FCFA (${item.menuItem?.name || 'Menu'})`,
      25,
      y
    );
    y += 8;
  });

  doc.save(`recu-${order._id}.pdf`);
};
