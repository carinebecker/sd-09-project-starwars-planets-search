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

  const filterAll = (dataToFilter, nameFilter, numericFilters) => {
    const stepOne = dataToFilter.filter((planet) => (
      planet.name.toLowerCase().includes(nameFilter.toLowerCase())
    ));
    const compare = (a, b, op) => {
      if (op === 'menor que') {
        return (!Number.isNaN(parseInt(a, 10)) && parseInt(a, 10) < parseInt(b, 10)) || false;
      }
      if (op === 'igual a') {
        return (parseInt(a, 10) && parseInt(a, 10) === parseInt(b, 10)) || false;
      }
      if (op === 'maior que') {
        return (parseInt(a, 10) && parseInt(a, 10) > parseInt(b, 10)) || false;
      }
    };
    return numericFilters.reduce((acc, numericFilter) => {
      console.log(acc);
      return acc.filter((element) => (
        compare(
          element[numericFilter.column], numericFilter.value, numericFilter.comparison,
        )
      ));
    }, stepOne);
  };

  useEffect(() => {
    if (isFetched) {
      filteredDataSet(
        filterAll(data, filters.filterByName.name, filters.filterByNumericValues),
      );
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
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="igual a">igual a</option>
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
