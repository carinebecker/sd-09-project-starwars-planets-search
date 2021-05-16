import React, { useContext } from 'react';
import PlanetContext from '../context/context';

export default function ChosenFilters() {
  const { filters, setFilters } = useContext(PlanetContext);
  const { filterByNumericValues } = filters;

  const deleteF = ({ column }) => {
    const filterArray = filterByNumericValues.filter((e) => e.column !== column);
    setFilters({ ...filters, filterByNumericValues: filterArray });
  };

  return filterByNumericValues.map((filter, i) => (
    <div key={ i } data-testid="filter" className="p-2 d-flex justify-content-around">
      <span className="badge-info rounded p-1 px-3 m-1">{ filter.column }</span>
      <span className="badge-info rounded p-1 px-3 m-1">{ filter.comparison }</span>
      <span className="badge-info rounded p-1 px-3 m-1">{ filter.value }</span>
      <button
        type="button"
        onClick={ () => deleteF(filter) }
        className="btn btn-sm btn-danger"
      >
        x
      </button>
    </div>));
}
