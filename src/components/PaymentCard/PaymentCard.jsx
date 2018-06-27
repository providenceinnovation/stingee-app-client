import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PaymentIcon from '@material-ui/icons/Payment';

import { sendPayment } from 'redux/modules/payment';
import Card from 'components/Card/Card';
import PaymentTable from 'components/PaymentTable/PaymentTable'
import styles from './PaymentCard.less';

@connect()
export default class PaymentCard extends Component {
  state = { amount: 14100 };

  payAll = () => {
    const { dispatch } = this.props;
    const { amount } = this.state;

    const handler = StripeCheckout.configure({
      key: 'pk_test_xrFmJlFSg2QpjiQKoR4Cx8y4',
      image: '/static/stingee.png',
      locale: 'auto',
      token: ({ id: tokenId } = {}) => {
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
    const { title, data, showPaymentButton } = this.props;
    const { amount } = this.state;

    return (
      <Card>
        <CardHeader title={(
          <Typography className={styles.title} variant="subheading">{title}</Typography>
        )}/>
        <PaymentTable data={data}/>
        {showPaymentButton && (
          <div className={styles.totalWrapper}>
            <Typography variant="headline" className={styles.total}>Total ${(amount / 100).toFixed(2)}</Typography>
            <Button icon="payment" variant="contained" color="primary" onClick={this.payAll} className={styles.paymentButton}>
              Make Payment
              <PaymentIcon className={styles.paymentIcon}/>
            </Button>
          </div>
        )}
      </Card>
    );
  }
}

PaymentCard.propTypes = {
  title: PropTypes.string,
  paymentsData: PropTypes.shape({}),
  showPaymentButton: PropTypes.bool,
};

PaymentCard.defaultProps = {
  title: '',
  paymentsData: {},
  showPaymentButton: false,
};
