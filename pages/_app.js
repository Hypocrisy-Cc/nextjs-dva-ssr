import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withDva from '../utils/withDva'

class CustomApp extends App {
  render () {
    const { Component, pageProps, dvaStore } = this.props
    return (
      <Container>
        <Provider store={dvaStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withDva(CustomApp)