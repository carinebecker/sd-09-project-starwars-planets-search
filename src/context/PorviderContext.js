import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Api from '../services/Api';
import Context from './Context';

export default function ProviderContext({ children }) {
  const [response, setResponse] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maiorQue');
  const [value, setValue] = useState(0);
  const [arrayPlanet, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {},
    filterByNumericValues: [],
  });

  useEffect(() => {
    async function res() {
      const planets = await Api();
      setResponse([...planets]);
      setPlanets([...planets]);
    }
    res();
  }, []);

  useEffect(() => {
    const { filterByName, filterByNumericValues } = filters;
    let newArray = [...response];
    if (filterByName.name) {
      const { name: nome } = filterByName;
      newArray = newArray.filter(({ name: planetName }) => (
        planetName.includes(nome)
      ));
    }
    if (filterByNumericValues !== []) {
      filterByNumericValues.forEach((element) => {
        const { column: coluna, comparison: comp, value: valor } = element;
        if (comp === 'maior que') {
          newArray = newArray.filter((planet) => (
            parseFloat(planet[coluna]) > parseFloat(valor)
          ));
        }
        if (comp === 'menor que') {
          newArray = newArray.filter((planet) => (
            parseFloat(planet[coluna]) < parseFloat(valor)
          ));
        }
        if (comp === 'igual a') {
          newArray = newArray.filter((planet) => (
            parseFloat(planet[coluna]) === parseFloat(valor)
          ));
        }
      });
    }
    setPlanets(newArray);
  }, [filters, response]);

  const inputFilter = (inputName) => {
    setFilters({
      ...filters,
      filterByName: { name: inputName },
    });
  };

  const buttonFilter = () => {
    const newNumericFilter = {
      column,
      comparison,
      value,
    };
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        newNumericFilter,
      ],
    });
  };

  const currentState = {
    response,
    arrayPlanet,
    filters,
    column,
    comparison,
    value,
    name,
    setPlanets,
    setName,
    setResponse,
    setColumn,
    setComparison,
    setValue,
    inputFilter,
    buttonFilter,
  };

  return (
    <Context.Provider value={ currentState }>
      {children}
    </Context.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};
