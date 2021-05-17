import '../styles/App.css';
import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

function Filters() {
  const { filtered, setFilter, setFilterName,
    btnFilter, filterBtn, filterColumn } = useContext(Context);

  useEffect(filterColumn, [filtered]);

  const [columnFilter, setColumnFilter] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    },
  );

  const [columns, setColumns] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const options = ['maior que', 'igual a', 'menor que'];

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setColumnFilter({
      ...columnFilter,
      [name]: value,
    });
  };

  const columnsOptions = ((param) => (
    param.filter((element) => element).map((col) => (
      <option key={ col } value={ col }>{ col }</option>
    ))
  ));

  const remove = (param) => {
    const result = filtered.filters.filterByNumericValues
      .filter((item) => item !== param);
    setFilter({
      ...filtered,
      filters: {
        filterByName: { ...filtered.filters.filterByName },
        filterByNumericValues: result,
      },
    });
  };

  const introducedFilters = () => (
    filtered.filters.filterByNumericValues.map((element, index) => (
      <div data-testid="filter" key={ index } className="main-filtered">
        <span className="filtered">
          <span>
            { `${element.column} / ${element.comparison} / ${element.value}` }
          </span>
          <input
            className="btn"
            type="button"
            onClick={ () => remove(element) }
            value="X"
          />
        </span>
      </div>
    )));

  return (
    <div className="main-filter">
      <div className="filters">
        <div className="filter">
          <label htmlFor="filterName">
            Filtrar por Nome:
            <br />
            <input
              className="filterName"
              data-testid="name-filter"
              id="filterName"
              onChange={ setFilterName }
              type="text"
              value={ filtered.filters.filterByName.name }
            />
          </label>
        </div>
        <div className="filter">
          <label htmlFor="filterColumn">
            Filtrar por Coluna:
            <br />
            <select
              className="filterColumn"
              data-testid="column-filter"
              id="filterColumn"
              name="column"
              onChange={ handleChange }
              value={ columnFilter.column }
            >
              { columnsOptions(columns) }
            </select>
          </label>
        </div>
        <div className="filter">
          <label htmlFor="filterComparison">
            Faixa de Valor:
            <br />
            <select
              className="filterComparison"
              data-testid="comparison-filter"
              id="filterComparison"
              name="comparison"
              onChange={ handleChange }
              value={ columnFilter.comparison }
            >
              {options.map((val) => (
                <option key={ val } value={ val }>{ val }</option>
              ))}
            </select>
          </label>
        </div>
        <div className="filter">
          <label htmlFor="filterValue">
            Faixa de Valor:
            <br />
            <input
              className="filterValue"
              data-testid="value-filter"
              id="filterValue"
              name="value"
              onChange={ handleChange }
              value={ columnFilter.value }
              type="number"
            />
          </label>
        </div>
        <div className="filter">
          <button
            data-testid="button-filter"
            type="button"
            onClick={ () => {
              const el = columnFilter.column;
              setColumns(columns.filter((e) => (e !== el)));
              btnFilter(columnFilter);
            } }
          >
            Filtrar
          </button>
        </div>
      </div>
      <div>
        {
          (filterBtn && filtered.filters.filterByNumericValues.length > 0)
            ? introducedFilters()
            : []
        }
      </div>
    </div>
  );
}

export default Filters;
