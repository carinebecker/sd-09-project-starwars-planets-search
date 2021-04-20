import React, { useContext } from 'react';
import Context from '../context/Context';

export default function SelectFilters() {
  const { filters, setFilters, setSelectOptions } = useContext(Context);
  const { filterByNumericValues } = filters;

  async function deleteFilter(column) {
    await setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter((filter) => (
        filter.column !== column
      )),
    });
    await setSelectOptions((prevState) => ([
      ...prevState,
      column,
    ]));
  }

  return (
    <div>
      <p>Filtros selecionados:</p>
      {filterByNumericValues.map((filtro, index) => {
        const { column, comparison, value } = filtro;
        return (
          <div key={ index } data-testid="filter">
            <span>{`Coluna: ${column}, Comparação: ${comparison}, Valor: ${value}`}</span>
            <button onClick={ () => deleteFilter(column) } type="button">
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}
