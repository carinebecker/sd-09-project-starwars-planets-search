import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/planetsAPI';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(
    { filterByName: { name: '' },
      filterByNumericValues: [] },
  );

  const fetchPlanets = async () => {
    const planetsFromApi = await getPlanets();
    setPlanets(planetsFromApi);
    setIsFetching(false);
  };

  return (
    <TableContext.Provider
      value={ { isFetching,
        planets,
        filters,
        setFilters,
        fetchPlanets } }
    >
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableProvider;
