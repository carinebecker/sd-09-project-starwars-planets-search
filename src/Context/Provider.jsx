import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import requestApiStarWars from '../services/requestApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const [text, setText] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  async function fetchPlanetsFromApi() {
    setIsFetching(true);
    await requestApiStarWars()
      .then(
        (response) => setData(response.results),
        (error) => console.log(error.message),
      )
      .finally(() => setIsFetching(false));
  }

  useEffect(() => {
    fetchPlanetsFromApi();
  }, []);

  // search based on => https://www.youtube.com/watch?v=d1r0aK5awWk
  const search = (((rows) => {
    const ONE_LESS = -1;
    return rows.filter(
      (row) => row.name.toLowerCase().indexOf(text.toLowerCase()) > ONE_LESS,
    );
  }));
  useEffect(() => {
    function filterResults() {
      let filterPlanets = [];
      filterByNumericValues.forEach((fil) => {
        switch (fil.comparison) {
        case 'maior que':
          filterPlanets = data.filter((row) => row[fil.column] > parseInt(fil.value, 10));
          return setData(filterPlanets);
        case 'menor que':
          filterPlanets = data.filter((row) => row[fil.column] < parseInt(fil.value, 10));
          return setData(filterPlanets);
        case 'igual a':
          filterPlanets = data.filter((row) => row[fil.column] === fil.value);
          return setData(filterPlanets);
        default:
          search(data);
        }
      });
    }

    filterResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumericValues]);

  const contextStarWars = {
    isFetching,
    setIsFetching,
    setText,
    search,
    setFilterByNumericValues,
    data,
    setData,
    fetchPlanetsFromApi,
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
