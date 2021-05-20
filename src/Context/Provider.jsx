import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestApiStarWars from '../services/requestApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [text, setText] = useState('');
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchPlanetsFromApi = () => {
      setIsFetching(true);
      requestApiStarWars()
        .then(
          (response) => setData(response.results),
          (error) => console.log(error.message),
        )
        .finally(() => setIsFetching(false));
    };
    fetchPlanetsFromApi();
  }, []);

  // search based on => https://www.youtube.com/watch?v=d1r0aK5awWk
  const search = ((rows) => {
    const ONE_LESS = -1;
    return rows.filter(
      (row) => row.name.toLowerCase().indexOf(text.toLowerCase()) > ONE_LESS,
    );
  });

  const searchButton = (() => {
    let filterPlanets = [];
    setFilterByNumericValues([...filterByNumericValues, { column, comparison, value }]);
    switch (comparison) {
    case 'maior que':
      filterPlanets = data.filter((row) => row[column] > parseInt(value, 10));
      return setData(filterPlanets);
    case 'menor que':
      filterPlanets = data.filter((row) => row[column] < parseInt(value, 10));
      return setData(filterPlanets);
    case 'igual a':
      filterPlanets = data.filter((row) => row[column] === value);
      return setData(filterPlanets);
    default:
      break;
    }
  });

  const contextStarWars = {
    isFetching,
    setText,
    search,
    setColumn,
    setComparison,
    setValue,
    searchButton,
    data,
    filters:
      {
        filterByName: {
          name: text,
        },
        filterByNumericValues,
      },
  };

  return (
    <StarWarsContext.Provider
      value={ contextStarWars }
    >
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
