import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import fetchAPI from '../services/fetchAPI';
import MyContext from './MyContext';

const { Provider, Consumer } = MyContext;

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.fetch = this.fetch.bind(this);
  }

  async fetch(data) {
    // const context = await fetchAPI();
    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    const { children } = this.props;

    return (
      <Provider value={ { data, funcao: this.fetch } }>
        { children }
      </Provider>
    );
  }
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MyProvider as Provider, Consumer };
