import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import StingeeIcon from 'components/StingeeIcon/StingeeIcon';
import styles from './Header.less';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '',
  }

  state = {
    isMenuOpen: false,
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    const { title } = this.props;

    const auth = true;

    return (
      <AppBar position="static">
        <Toolbar>
          <StingeeIcon />
          <Typography className={styles.title} variant="title" color="inherit">{title}</Typography>
          {auth && (
            <div>
              <IconButton
                // onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
