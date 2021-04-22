import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';
import requestApi from '../services/requestApi';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: false,
      planetsData: [{ name: 'name' }],
      filteredPlanets: [{ name: 'name' }],
      filters: {
        filterByName: {
          name: '',
        },
        filterByNumericValues: [
          {
            column: 'population',
            comparison: 'maior que',
            value: '100000',
          },
        ],
      },
    };
    this.getPlanetsData = this.getPlanetsData.bind(this);
    this.setNameFilter = this.setNameFilter.bind(this);
    this.filterPlanets = this.filterPlanets.bind(this);
  }

  async getPlanetsData() {
    this.setState({ fetchingData: true });
    const planetsArray = [
      ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/'),
      // ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=2'),
      // ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=3'),
      // ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=4'),
      // ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=5'),
      // ...await requestApi('https://swapi-trybe.herokuapp.com/api/planets/?page=6'),
    ];

    this.setState({
      planetsData: planetsArray,
      filteredPlanets: planetsArray,
      fetchingData: false,
    });
  }

  setNameFilter(nameFilter) {
    const { filters } = this.state;
    this.setState({
      filters: {
        ...filters,
        filterByName: { name: nameFilter },
      } }, () => this.filterPlanets());
  }

  filterPlanets() {
    const { planetsData, filters } = this.state;
    const { filterByName } = filters;

    const filteredArray = planetsData
      .filter(({ name }) => name.includes(filterByName.name));
    this.setState({ filteredPlanets: filteredArray });
  }

  render() {
    const contextValue = {
      ...this.state,
      getPlanetsData: this.getPlanetsData,
      setFilterByName: this.setNameFilter,
      filterTable: this.filterPlanets,
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
