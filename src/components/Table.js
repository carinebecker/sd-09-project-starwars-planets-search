import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
import PlanetsTable from './PlanetsTable';

const Table = () => {
  const { data, isFetched } = useContext(PlanetsContext);
  const [filteredData, filteredDataSet] = useState(null);
  const [filters, filtersSet] = useState({
    filterByName: {
      name: '',
    },
  });

  useEffect(() => {
    if (isFetched) {
      const { filterByName: { name } } = filters;
      filteredDataSet(data.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())
      )));
    }
  }, [data, isFetched, filters, filtersSet]);
  return (
    (isFetched && filteredData)
      ? (
        <>
          <form>
            <label htmlFor="name-filter">
              Pesquisar por nome
              <input
                id="name-filter"
                value={ filters.filterByName.name }
                onChange={ (event) => (filtersSet({
                  ...filters,
                  filterByName: {
                    name: event.target.value,
                  },
                })) }
                data-testid="name-filter"
              />
            </label>
          </form>
          <PlanetsTable planets={ filteredData } />
        </>
      )
      : <div>b</div>
  );
};

export default Table;
