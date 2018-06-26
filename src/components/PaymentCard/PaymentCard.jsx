import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import Card from 'components/Card/Card';
import PaymentTable from 'components/PaymentTable/PaymentTable'

export default function PaymentCard({ title, subheader, data }) {
  return (
    <Card>
      <CardHeader title={(
        <Typography variant="title">{title}</Typography>
      )} />
      <PaymentTable data={data} />
    </Card>
  );
}

PaymentCard.propTypes = {
  title: PropTypes.string,
  paymentsData: PropTypes.shape({}),
};

PaymentCard.defaultProps = {
  title: '',
  paymentsData: {},
};
