import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((res) => res.json());
      results.map((obj) => delete obj.residents);
      setData(results);
    };
    fetchPlanets();
  }, []);
  const context = { data };
  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}
PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default PlanetsProvider;

// Consultei o repositório para tirar dúvidas sobre a estrutura do Provider/Context
// https://github.com/tryber/sd-08-project-starwars-planets-search/pull/67/commits/213b5f617a6fd57d8e82796f9299032d3508095d?file-filters%5B%5D=
