import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';
import requestApi from '../services/requestApi';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: false,
      planetsData: [{}],
    };
    this.getPlanetsData = this.getPlanetsData.bind(this);
  }

  async getPlanetsData() {
    this.setState({ fetchingData: true });
    const planetsArray = [
      ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=1'),
      ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=2'),
      ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=3'),
      ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=4'),
      ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=5'),
      ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=6'),
    ];

    this.setState({ planetsData: planetsArray });
    this.setState({ fetchingData: false });
  }

  render() {
    const contextValue = {
      ...this.state,
      getPlanetsData: this.getPlanetsData,
    };
    const { children } = this.props;

    return (
      <AppContext.Provider value={ contextValue }>
        { children }
      </AppContext.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,

};

export default Provider;
