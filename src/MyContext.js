import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import requestAPI from './services';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataToChange, setDataToChange] = useState([]);
  const [keysData, setKeysData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  const [filters, setFilter] = useState({ filtersByName: { name: '' },
    filterByNumericValues: [] });

  const [columnFilter, setColumnFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    requestAPI()
      .then((results) => {
        setData(results.results);
        setDataToChange(results.results);
        setIsLoading(false);
        setKeysData(Object.keys(results.results[0]));
      });
  }, []);

  const serchInput = ({ target }) => {
    setName(target.value);
    const num = -1;
    const nameFiltered = data
      .filter((element) => element.name.indexOf(target.value) !== num);
    setDataToChange(nameFiltered);

    // setFilter((prevState) => ({ ...prevState, filtersByName: { name } }));
    if (target.value === '') setDataToChange(data);
  };

  const setOptionsFilter = ({ target }) => {
    switch (target.name) {
    case 'comparisonFilter':
      setComparison(target.value);
      break;
    case 'valueFilter':
      setValue(target.value);
      break;
    case 'columnFilter':
      setColumn(target.value);
      break;
    default:
      console.log(target);
      break;
    }
  };

  const removeCloumn = () => {
    const newColumnsArray = columnFilter
      .filter((columnToFilter) => columnToFilter !== column);
    setColumnFilter(newColumnsArray);
    setColumn(newColumnsArray[0]);

    // Esse setFilter serva para add filtros.
    setFilter((prevState) => (
      { filtersByName: { name },
        filterByNumericValues: [...prevState.filterByNumericValues,
          {
            column,
            comparison,
            value,
          },
        ] }));
  };

  const filterByNumber = () => {
    removeCloumn();
    switch (comparison) {
    case 'maior que': {
      const result = data
        .filter((element) => element[column] > parseInt(value, 10));
      setDataToChange(result);
    }
      break;
    case 'menor que': {
      const result = data
        .filter((element) => element[column] < parseInt(value, 10));
      setDataToChange(result);
    }
      break;
    case 'igual a': {
      const result = data.filter((element) => element[column] === value);
      setDataToChange(result);
    }
      break;
    default:
      break;
    }
  };

  const context = {
    data,
    dataToChange,
    isLoading,
    keysData,
    columnFilter,
    filters,
    serchInput,
    setOptionsFilter,
    filterByNumber,
    setColumnFilter,
    setDataToChange,
    setFilter,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
};

MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MyContext, MyContextProvider as Provider };
