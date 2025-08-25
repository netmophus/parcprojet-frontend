import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
  TablePagination,
} from '@mui/material';

const RechargeClientTable = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        👤 Liste des recharges clients
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Montant</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((recharge) => (
              <TableRow key={recharge._id}>
                <TableCell>{recharge?.clientCard?.codeVisible || '—'}</TableCell>
                <TableCell>{recharge.client?.name || '—'}</TableCell>
                <TableCell>{recharge.client?.phone || '—'}</TableCell>
                <TableCell>{recharge.amount.toLocaleString()} FCFA</TableCell>
                <TableCell>
                  {new Date(recharge.createdAt).toLocaleString('fr-FR')}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
};

export default RechargeClientTable;
