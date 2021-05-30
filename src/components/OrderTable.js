import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function OrderTable() {
  const {
    loading,
    dataFromApi: { planets: { results } },
    setInputFilter,
    inputFilter: { filters },
    inputFilter: { filters: { order } },
    planetsFilter: { filteredPlanets },
    sortPlanets,
  } = useContext(StarWarsContext);

  useEffect(() => {
    sortPlanets();
  }, [filteredPlanets]);

  const selectColumn = ({ target: { value } }) => {
    setInputFilter({
      filters: {
        ...filters,
        order: {
          ...order,
          column: value,
        },
      },
    });
  };

  const selectOrder = ({ target: { id } }) => {
    setInputFilter({
      filters: {
        ...filters,
        order: {
          ...order,
          sort: id.toUpperCase(),
        },
      },
    });
  };

  const handleSubmit = () => {
    sortPlanets();
  };

  return loading
    ? (
      null
    ) : (
      <div>
        <div>
          <select
            data-testid="column-sort"
            onChange={ selectColumn }
          >
            {Object.keys(results[0])
              .map((result, index) => (
                <option key={ index }>
                  {result}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="asc">
            ASC
            <input
              type="radio"
              name="sort"
              id="asc"
              data-testid="column-sort-input-asc"
              onClick={ selectOrder }
            />
          </label>

          <label htmlFor="desc">
            DESC
            <input
              type="radio"
              name="sort"
              id="desc"
              data-testid="column-sort-input-desc"
              onClick={ selectOrder }
            />
          </label>
        </div>

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSubmit }
        >
          Ordenar
        </button>
      </div>
    );
}

export default OrderTable;
