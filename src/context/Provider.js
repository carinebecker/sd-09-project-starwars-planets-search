import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../services/fetchAPI';
import MyContext from './MyContext';

const { Provider, Consumer } = MyContext;

class MyProvider extends Component {
  render() {
    const context = {
      data: fetchAPI,
    };

    const { children } = this.props;

    return (
      <Provider value={ context }>
        { children }
      </Provider>
    );
  }
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MyProvider as Provider, Consumer };
