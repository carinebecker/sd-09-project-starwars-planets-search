import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
import PlanetsTable from './PlanetsTable';

const Table = () => {
  const { data, isFetched } = useContext(PlanetsContext);
  const [filteredData, filteredDataSet] = useState(null);
  const [nameFilter, nameFilterSet] = useState('');

  useEffect(() => {
    if (isFetched) {
      filteredDataSet(data.filter((planet) => (
        planet.name.toLowerCase().includes(nameFilter.toLowerCase())
      )));
    }
  }, [data, isFetched, nameFilter]);
  return (
    (isFetched && filteredData)
      ? (
        <>
          {
            console.log(filteredData)
          }
          <form>
            <label htmlFor="name-filter">
              Pesquisar por nome
              <input
                id="name-filter"
                value={ nameFilter }
                onChange={ (event) => nameFilterSet(event.target.value) }
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
