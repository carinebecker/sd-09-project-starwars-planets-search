import React, { useContext } from 'react';
import { savePlanets } from '../context/contextPlanets';

export default function ShowFilters() {
  const { storeFilters } = useContext(savePlanets);
  const filterElement = storeFilters;
  let filterEl = 'Sem Filtros';
  const valida = storeFilters !== 'population maior que 100000';
  if (valida) {
    filterEl = filterElement;
  }
  return (
    <div data-testid="filter" className="btn btn-danger">
      { filterEl }
      <button type="button" className="btn-filter btn-danger">
        X
      </button>
    </div>
  );
}
