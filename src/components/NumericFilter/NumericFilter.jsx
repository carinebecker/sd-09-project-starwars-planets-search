import React, { useContext, useState, useEffect } from 'react';
import planetsContext from '../../context/PlanetsContext';
import FiltersContext from '../../context/FiltersContext';
import Dropdown from '../Dropdown';

export default function NumericFilter() {
  const { planets } = useContext(planetsContext);
  const {
    filters: { filterByNumericValues: numericFilters },
    setters: { setNumericValue },
  } = useContext(FiltersContext);
  const [numericFields, setNumericFields] = useState([]);
  const [filterDescription, setFilterDescription] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  useEffect(() => {
    if (planets.length) {
      const fields = Object.keys(planets[0]).filter((key) => (
        !Number.isNaN(Number(planets[0][key]))
      ));
      setNumericFields(fields);
    }
  }, [planets]);

  function updateFilterInfo(e) {
    const { value, name } = e.target;
    setFilterDescription({ ...filterDescription, [name]: value });
  }

  function addFilter() {
    setNumericValue([...numericFilters, filterDescription]);
  }

  return (
    <>
      <Dropdown
        options={ numericFields }
        name="column"
        dataTestID="column-filter"
        value={ filterDescription.column }
        onHandleChange={ updateFilterInfo }
      />
      <Dropdown
        options={ ['maior que', 'igual a', 'menor que'] }
        name="comparison"
        dataTestID="comparison-filter"
        value={ filterDescription.comparison }
        onHandleChange={ updateFilterInfo }
      />
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ filterDescription.value }
        onChange={ updateFilterInfo }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFilter }
      >
        Filtrar
      </button>
    </>
  );
}
