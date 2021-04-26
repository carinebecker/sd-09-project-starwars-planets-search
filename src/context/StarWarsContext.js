import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const filterNameInit = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const fieldsFilterInit = {
    column: 'population',
    comparison: 'maior que',
    value: '',
  };

  const arrayColumnInit = ['population', 'orbital_period', 'diameter', 'rotation_period',
    'surface_water'];

  const [data, setData] = useState([]);
  const [filters, setFilter] = useState(filterNameInit);
  const [dataFilter, setDataFilter] = useState([]);
  const [fieldsFilter, setFieldsFilter] = useState(fieldsFilterInit);
  const [arrayColumn, setArrayColumn] = useState(arrayColumnInit);

  const addData = (newData) => {
    setData(newData);
  };

  const addFilterName = (name) => {
    setFilter({
      ...filters,
      filterByName: {
        name,
      },
    });
  };

  const addFilterNumeric = (column, comparison, value) => {
    setFilter({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, {
        column,
        comparison,
        value,
      }],
    });
  };

  const addDataFilter = (newData) => {
    setDataFilter(newData);
  };

  const addFieldsFilter = (column, comparison, value) => {
    setFieldsFilter({
      column,
      comparison,
      value,
    });
  };

  const addArrayColumn = (newArrayColumn) => {
    setArrayColumn(newArrayColumn);
  };

  const context = {
    data,
    addData,
    filters,
    addFilterName,
    dataFilter,
    addDataFilter,
    addFilterNumeric,
    fieldsFilter,
    addFieldsFilter,
    arrayColumn,
    addArrayColumn,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = ({
  children: PropTypes.element,
}).isRequired;

export { StarWarsContext, StarWarsProvider as Provider };
