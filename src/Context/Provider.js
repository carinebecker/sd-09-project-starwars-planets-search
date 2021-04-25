import React from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestApiStarWars from '../services/requestApi';

class Provider extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isFetching: true,
    };

    this.fetchPlanetsFromApi = this.fetchPlanetsFromApi.bind(this);
    this.handleFetchSuccess = this.handleFetchSuccess.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
  }

  componentDidMount() {
    this.fetchPlanetsFromApi();
  }

  handleFetchSuccess(result) {
    this.setState({
      data: result.results,
      isFetching: false,
    });
    console.log('sucesso');
  }

  handleFetchError(error) {
    this.setState({
      isFetching: false,
    });
    console.log(error.message);
  }

  fetchPlanetsFromApi() {
    this.setState({ isFetching: true }, () => {
      requestApiStarWars()
        .then(
          this.handleFetchSuccess,
          this.handleFetchError,
        );
      console.log('chamada api');
    });
  }

  render() {
    const { children } = this.props;
    return (
      <StarWarsContext.Provider
        value={ {
          ...this.state,
          getPlanetsFromApi: this.fetchPlanetsFromApi,
        } }
      >
        { children }
      </StarWarsContext.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export default Provider;
