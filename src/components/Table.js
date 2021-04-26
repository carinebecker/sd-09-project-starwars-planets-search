import React, { useContext, useState, useEffect, useRef } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
import PlanetsTable from './PlanetsTable';

const Table = () => {
  const { data, isFetched } = useContext(PlanetsContext);
  const [filteredData, filteredDataSet] = useState(null);
  const [filters, filtersSet] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    ],
  });

  const columnRef = useRef(null);
  const comparisonRef = useRef(null);
  const valueRef = useRef(null);

  const columnFields = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

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
            <select
              data-testid="column-filter"
              ref={ columnRef }
            >
              {
                columnFields.map((value, index) => (
                  !filters.filterByNumericValues.some((val) => (
                    val.column === value
                  ))
                    ? (
                      <option
                        key={ index }
                        data-testid={ value }
                        value={ value }
                      >
                        { value }
                      </option>
                    ) : null
                ))
              }
            </select>
            <select
              data-testid="comparison-filter"
              ref={ comparisonRef }
            >
              <option>maior que</option>
              <option>menor que</option>
              <option>igual a</option>
            </select>
            <input
              type="number"
              data-testid="value-filter"
              ref={ valueRef }
            />
            <button
              type="button"
              data-testid="button-filter"
              onClick={ () => {
                filtersSet({
                  ...filters,
                  filterByNumericValues: [
                    ...filters.filterByNumericValues,
                    {
                      column: columnRef.current.value,
                      comparison: comparisonRef.current.value,
                      value: valueRef.current.value,
                    },
                  ],
                });
              } }
            >
              Adicionar Filtro
            </button>
          </form>
          <PlanetsTable planets={ filteredData } />
        </>
      )
      : <div>b</div>
  );
};

export default Table;
