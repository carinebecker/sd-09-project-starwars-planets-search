import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function OrderTable() {
  const {
    loading,
    dataFromApi: { planets: { results } },
    setInputFilter,
    inputFilter: { filters },
    inputFilter: { filters: { order } },
  } = useContext(StarWarsContext);

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

  const sortPlanets = (data = results) => {
    const reorderByNumber = {
      up: 1,
      down: -1,
    };

    const sortedData = data
      .sort((a, b) => (
        a[order.column] < b[order.column]
          ? reorderByNumber.down : reorderByNumber.up
      ));

    console.log(sortedData);
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
