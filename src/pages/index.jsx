import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PaymentIcon from '@material-ui/icons/Payment';

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

  payAll = () => {
    const amount = 2007;

    const handler = StripeCheckout.configure({
      key: 'pk_test_xrFmJlFSg2QpjiQKoR4Cx8y4',
      image: '/static/stingee.png',
      locale: 'auto',
      token: ({ id: tokenId, ...rest } = {}) => {
        console.log(rest);
        dispatch(sendPayment({ tokenId, amount }));
      }
    });

    handler.open({
      name: 'Stingee',
      description: 'Payment for selected unpaid bills:',
      amount,
    });
  };

  render() {
    const { payments: { data: payments = [] } } = this.props;

    // TODO Selector
    const unpaidPaymentsData = payments.filter(({ status }) => status === 'unpaid');
    const paidPaymentsData = payments.filter(({ status }) => status === 'paid');

    return (
      <div className={styles.body}>
        <Header title="Stingee" />
        <div className={styles.content}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant="headline">Bills</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PaymentCard title="Unpaid" data={unpaidPaymentsData} />
              <Button icon="payment" variant="contained" color="primary" onClick={this.payAll} className={styles.paymentButton}>
                Make Payment
                <PaymentIcon className={styles.paymentIcon} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PaymentCard title="Paid" data={paidPaymentsData} />
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
