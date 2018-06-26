import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import Card from 'components/Card/Card';
import PaymentTable from 'components/PaymentTable/PaymentTable'
import styles from './PaymentCard.less';

export default function PaymentCard({ title, subheader, data }) {
  return (
    <Card>
      <CardHeader title={(
        <Fragment>
          <Typography className={styles.title} variant="subheading">{title}</Typography>
        </Fragment>
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
