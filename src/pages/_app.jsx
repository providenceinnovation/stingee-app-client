import React from 'react';
import App, { Container } from 'next/app';

import Layout from 'components/Layout/Layout';

export default class NextApp extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
