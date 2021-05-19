import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterPlanet, setFilterPlanet] = useState([]);

  // ComponentDidMount - Dispara funções após o componente ser inserido no DOM
  // Requisição da API
  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((res) => res.json());
      results.map((obj) => delete obj.residents);
      setPlanets(results);
    };
    fetchPlanets();
  }, []);

  // Atualiza o estado de searchName
  const handleSearchName = ({ target }) => {
    setSearchName(target.value);
  };

  // ComponentDidMount - Dispara funções após o componente ser inserido no DOM
  useEffect(() => {
    let filterPlanets = planets;
    filterPlanets = planets.filter((planet) => planet.name.includes((searchName)));
    setFilterPlanet(filterPlanets);
  }, [planets, searchName]);

  // O que starWarsContext vai prover para os fihos
  const data = {
    planets,
    setPlanets,
    searchName,
    setSearchName,
    filterPlanet,
    setFilterPlanet,
    handleSearchName,
  };

  return (
    <StarWarsContext.Provider value={ data }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default StarWarsProvider;

// Consultei o repositório para tirar dúvidas sobre a estrutura do Provider/Context
// https://github.com/tryber/sd-08-project-starwars-planets-search/pull/67/commits/213b5f617a6fd57d8e82796f9299032d3508095d?file-filters%5B%5D=
