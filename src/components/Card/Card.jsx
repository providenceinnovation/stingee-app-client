import React from 'react';
import PropTypes from 'prop-types';

import MUICard from '@material-ui/core/Card';

import styles from './Card.less';

export default function Card({ children }) {
  return (
    <MUICard className={styles.card}>{children}</MUICard>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};

Card.defaultProps = {
  children: undefined,
};
