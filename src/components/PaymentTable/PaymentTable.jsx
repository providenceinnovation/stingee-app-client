import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentTable ({ data = [] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox disabled />
          </TableCell>
          <TableCell component="th" scope="row">Cost (USD)</TableCell>
          <TableCell>Doctor</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ cost, provider, location, date }) => {
          const isSelected = false;
          const costInDollars = (cost / 100).toFixed(2);

          return (
            <TableRow
              hover
              onClick={() => {}}
              tabIndex={-1}
              selected={isSelected}
              key={`${cost}_${provider}_${location}_${date}`}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isSelected} />
              </TableCell>
              <TableCell component="th" scope="row">{`$${costInDollars}`}</TableCell>
              <TableCell>{provider}</TableCell>
              <TableCell>{location}</TableCell>
              <TableCell>{date}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
