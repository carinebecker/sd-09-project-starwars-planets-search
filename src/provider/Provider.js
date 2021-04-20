import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import contextStar from '../context/contextStar';
import req from '../services/req';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    req().then((response) => setData(response));
  }, []);

  useEffect(() => {
    req().then((response) => setFilters(response));
  }, []);

  const filterByName = (nome) => {
    const filtro = data.filter(
      ({ name }) => name.toLowerCase().includes(nome.toLowerCase()),
    );
    setFilters(filtro);
  };

  const filterByNumericValues = ({ column, comparison, value }) => {
    const filtro = data.filter((planeta) => {
      const dados = parseInt(planeta[column], 10);
      const valor = parseInt(value, 10);
      switch (comparison) {
      case 'maior que':
        return dados > valor;
      case 'menor que':
        return dados < valor;
      case 'igual a':
        return dados === valor;
      default:
        return filtro;
      }
    });
    setFilters(filtro);
  };

  const contextValue = {
    data,
    setData,
    filterByName: (textName) => filterByName(textName),
    filterByNumericValues,
    filters,
    setFilters,
  };

  return (
    <contextStar.Provider value={ contextValue }>
      {children}
    </contextStar.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
