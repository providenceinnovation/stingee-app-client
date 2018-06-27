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
import { receivePayments } from 'src/redux/modules/payments';
import styles from './PaymentCard.less';

// TODO Convert to selector
function getTotal(data = []) {
  return Object.keys(data).reduce((amount, key) => {
    const { cost = 0, checked } = data[key] || {};
    return amount + (checked ? +cost : 0);
  }, 0)
}

@connect(({ payments }) => ({ payments }))
export default class PaymentCard extends Component {
  state = { data: [] };

  componentDidUpdate (prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.setState({ data });
    }
  }

  payAll = () => {
    const { dispatch, payments: { data: payments = [] } = {} } = this.props;
    const { data } = this.state;
    const amount = getTotal(data);

    const handler = StripeCheckout.configure({
      key: 'pk_test_xrFmJlFSg2QpjiQKoR4Cx8y4',
      image: '/static/stingee.png',
      locale: 'auto',
      token: ({ id: tokenId } = {}) => {
        dispatch(sendPayment({ tokenId, amount }));

        const paymentData = payments.map((item) => {
          const paidPayment = data[item._id] || {};
          return paidPayment.checked ? {
            ...item,
            checked: false,
            status: 'paid'
          } : item;
        });

        dispatch(receivePayments(paymentData));
      }
    });

    handler.open({
      name: 'Stingee',
      description: 'Payment for selected unpaid bills:',
      amount,
    });
  };

  onCheck = ({ _id } = {}) => {
    const { data } = this.state;

    const existingItem = data[_id] || {};

    this.setState({
      data: {
        ...data,
        [_id]: {
          ...existingItem,
          checked: !existingItem.checked,
        },
      }
    });
  }

  render() {
    const { title, showPaymentButton } = this.props;
    const { data } = this.state;

    const amount = getTotal(data);

    return (
      <Card>
        <CardHeader title={(
          <Typography className={styles.title} variant="subheading">{title}</Typography>
        )} />
        {(Object.keys(data).length > 0) ? (
          <PaymentTable data={data} onCheck={this.onCheck} isSelectable={showPaymentButton} />
        ) : (
          <Typography className={styles.noPaymentsMessage} variant="title" color="textSecondary" align="center">You have no {title.toLowerCase()} payments.</Typography>
        )}
        {showPaymentButton && (
          <div className={styles.totalWrapper}>
            <Typography variant="headline" className={styles.total}>Total ${(amount / 100).toFixed(2)}</Typography>
            <Button icon="payment" variant="contained" color="primary" onClick={this.payAll} className={styles.paymentButton} disabled={amount <= 0}>
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
  data: PropTypes.shape({}),
  showPaymentButton: PropTypes.bool,
};

PaymentCard.defaultProps = {
  title: '',
  data: {},
  showPaymentButton: false,
};
