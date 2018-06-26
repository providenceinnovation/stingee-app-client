import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import getPageContext from '../../getPageContext';

export default class Layout extends Component {
  pageContext = null;

  constructor(props) {
    super(props);

    this.pageContext = this.props.pageContext || getPageContext();
  }

  static getInitialProps = ({ Component, ctx }) => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <MuiThemeProvider
        theme={this.pageContext.theme}
        sheetsManager={this.pageContext.sheetsManager}
      >
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}
