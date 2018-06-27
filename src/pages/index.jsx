import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import ReceiptIcon from '@material-ui/icons/Receipt';

import PaymentCard from 'components/PaymentCard/PaymentCard';
import Header from 'components/Header/Header';
import { fetchPayments } from 'redux/modules/payments';
import { sendPayment } from 'redux/modules/payment';
import styles from './index.less';
import './stripe.less';

@connect(({ payments }) => ({ payments }))
export default class Index extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPayments());
  }

  render() {
    const { payments: { data: payments = [] } } = this.props;

    // TODO Selector
    const unpaidPaymentsData = payments.filter(({ status }) => status === 'unpaid');
    const paidPaymentsData = payments.filter(({ status }) => status === 'paid');

    return (
      <div className={styles.body}>
        <Header title="Stingee" />
        <div className={styles.content}>
          <Grid container spacing={16} direction="column">
            <Grid item xs={12} align="center">
              <Grid item xs={12} md={10} lg={8} xl={6} align="left">
                <Typography className={styles.title} variant="headline"><ReceiptIcon color="disabled" />Bills</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} align="center">
              <Grid item xs={12} md={10} lg={8} xl={6} align="left">
                <PaymentCard title="Unpaid" data={unpaidPaymentsData} showPaymentButton />
              </Grid>
            </Grid>
            <Grid item xs={12} align="center">
              <Grid item xs={12} md={10} lg={8} xl={6} align="left">
                <PaymentCard title="Paid" data={paidPaymentsData} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  payments: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      status: PropTypes.string,
    }))
  }),
}

Index.defaultProps = {
  payments: {
    data: [],
  },
}
