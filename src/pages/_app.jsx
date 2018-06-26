import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';

import { initializeStore } from 'redux/store';
import Layout from 'components/Layout/Layout';

export default class NextApp extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={initializeStore()}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}
