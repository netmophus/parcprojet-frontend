import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Avatar,
} from '@mui/material';
import API from '../services/api';

const PaginatedPaymentTable = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const grouped = {};

  orders.forEach((order) => {
    if (!grouped[order.cardNumber]) {
      grouped[order.cardNumber] = [];
    }
    grouped[order.cardNumber].push(order);
  });

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders/my-payments');
      setOrders(response.data);
    } catch (error) {
      console.error('Erreur chargement historique :', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const clients = Object.keys(grouped).slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        🧾 Historique des paiements par client
      </Typography>

      {clients.map((clientKey) => {
        const clientOrders = grouped[clientKey];
        const totalSpent = clientOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        const last = clientOrders[0];

        return (
          <Box key={clientKey} mb={3} p={2} bgcolor="#f9f9f9" borderRadius={2}>
            <Typography variant="subtitle1">
              Carte : <strong>{clientKey}</strong> | Total payé :{' '}
              <strong>{totalSpent} FCFA</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Solde avant : <strong>{last?.clientTransaction?.beforeBalance} FCFA</strong> — Solde après :{' '}
              <strong>{last?.clientTransaction?.afterBalance} FCFA</strong>
            </Typography>

            <Table size="small" sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Articles</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientOrders.map((order, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      {order.items.map((item, i) => (
                        <Typography key={i}>
                          {item.menuItem?.name} x {item.quantity}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell>{order.totalAmount} FCFA</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        );
      })}

      <TablePagination
        component="div"
        count={Object.keys(grouped).length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Paper>
  );
};

export default PaginatedPaymentTable;
