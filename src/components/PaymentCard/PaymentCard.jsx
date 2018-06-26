import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// TODO Cleanup key
function renderListItems ({ cost, location, provider }) {
  return (
    <ListItem key={`${cost}_${location}_${provider}`} button divider>
      {cost} {location} {provider}
    </ListItem>
  )
}

export default function PaymentCard({ title, children, subheader, paymentsData }) {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <List disablePadding>
        {paymentsData.map(renderListItems)}
      </List>
    </Card>
  );
}

PaymentCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

PaymentCard.defaultProps = {
  children: undefined,
  title: '',
};
