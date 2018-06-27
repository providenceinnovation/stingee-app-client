import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentTable ({ data = {}, onCheck, isSelectable }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {isSelectable && (
            <TableCell padding="checkbox">
              <Checkbox disabled />
            </TableCell>
          )}
          <TableCell component="th" scope="row">Cost (USD)</TableCell>
          <TableCell>Doctor</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(data).map((key) => {
          const { _id, checked, cost, provider, location, date } = data[key];
          const costInDollars = (parseInt(cost, 10) / 100).toFixed(2);

          const onClick = () => onCheck({ _id });

          return (
            <TableRow
              hover
              onClick={onClick}
              tabIndex={-1}
              selected={checked}
              key={`${cost}_${provider}_${location}_${date}`}
            >
              {isSelectable && (
                <TableCell padding="checkbox">
                  <Checkbox checked={!!checked} />
                </TableCell>
              )}
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
