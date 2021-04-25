import React from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

class Provider extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <StarWarsContext.Provider value="DeuCerto">
        { children }
      </StarWarsContext.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export default Provider;
