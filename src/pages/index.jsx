import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'

import PaymentCard from 'components/PaymentCard/PaymentCard';
import Header from 'components/Header/Header';
import styles from './index.less';

const unpaidPaymentsData = [
  { cost: '$45.00', location: 'Redmond Sprained Neck Doctor', provider: 'Dr. Pain' },
  { cost: '$96.00', location: 'Redmond Sprained Neck Doctor', provider: 'Dr. Pain' },
];

const paidPaymentsData = [
  { cost: '$500.00', location: 'Redmond Sprained Neck Doctor', provider: 'Dr. Pain' },
  { cost: '$234.00', location: 'Redmond Sprained Neck Doctor', provider: 'Dr. Pain' },
  { cost: '$178.00', location: 'Redmond Sprained Neck Doctor', provider: 'Dr. Pain' },
  { cost: '$199.00', location: 'Redmond Sprained Neck Doctor', provider: 'Dr. Pain' },
];

export default class Index extends Component {
  render() {
    return (
      <div className={styles.body}>
        <Header />
        <div className={styles.content}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <PaymentCard title="Unpaid Bills" paymentsData={unpaidPaymentsData} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PaymentCard title="Paid Bills" paymentsData={paidPaymentsData} />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}
