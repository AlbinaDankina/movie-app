// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.props.children;
  }
}
