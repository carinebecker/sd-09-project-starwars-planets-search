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
            column: '',
            comparison: '',
            value: 0,
          },
        ],
      },
    };
    this.getPlanetsData = this.getPlanetsData.bind(this);
    this.setNameFilter = this.setNameFilter.bind(this);
    this.setNumberFilter = this.setNumberFilter.bind(this);
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
      filteredPlanetsNumber: planetsArray,
      fetchingData: false,
    });
  }

  setNameFilter(name) {
    const { filters } = this.state;
    const typeOfFilter = 'filterByName';
    this.setState({
      filters: {
        ...filters,
        filterByName: { name },
      } }, () => { this.filterPlanets(typeOfFilter); });
  }

  setNumberFilter(column, comparison, value) {
    const { filters } = this.state;
    const typeOfFilter = 'filterByNumericValues';
    this.setState({
      filters: {
        ...filters,
        filterByNumericValues: [{
          column, comparison, value,
        }, ...filters.filterByNumericValues],
      } }, () => { this.filterPlanets(typeOfFilter); });
  }

  filterPlanets(typeOfFilter) {
    const { planetsData, filters } = this.state;
    const { filterByName, filterByNumericValues } = filters;
    const [{ column, comparison, value }] = filterByNumericValues;

    switch (typeOfFilter) {
    case 'filterByNumericValues': {
      switch (comparison) {
      case 'menor que': {
        const filteredArray = planetsData
          .filter((item) => (parseInt(item[column], 10) < parseInt(value, 10)));
        this.setState({ filteredPlanets: filteredArray });
        break;
      }
      case 'maior que': {
        const filteredArray = planetsData
          .filter((item) => (parseInt(item[column], 10) > parseInt(value, 10)));
        this.setState({ filteredPlanets: filteredArray });
        break;
      }
      case 'igual a': {
        const filteredArray = planetsData
          .filter((item) => (parseInt(item[column], 10) === parseInt(value, 10)));
        this.setState({ filteredPlanets: filteredArray });
        break;
      }
      default:
        break;
      }
      break;
    }
    default: {
      const filteredArray = planetsData
        .filter(({ name }) => name.includes(filterByName.name));
      this.setState({ filteredPlanets: filteredArray });
    }
    }
  }

  render() {
    const contextValue = {
      ...this.state,
      getPlanetsData: this.getPlanetsData,
      setFilterByName: this.setNameFilter,
      setNumberFilters: this.setNumberFilter,
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
