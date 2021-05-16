import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import PlanetContext from '../context/context';
import ChosenFilters from './ChosenFilters';

export default function Filter() {
  const { filters, setFilters } = useContext(PlanetContext);
  const { filterByNumericValues } = filters;
  const [object, setObject] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '' });

  const search = (e) => setFilters({ ...filters,
    filterByName: { name: e.target.value } });

  const disableRepeated = () => {
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((item) => {
        const option = document.querySelector(`#${item.column}`);
        if (option) {
          option.remove();
        }
      });
    }
    return true;
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setObject({ ...object, [name]: value });
    disableRepeated();
  };

  const adicionaFiltro = ({ column, comparison, value }) => {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues,
        { column, comparison, value }],
    });
  };

  return (disableRepeated()
    && (
      <Form className="form-inline">
        <input
          data-testid="name-filter"
          type="text"
          className="form-control m-1"
          onChange={ search }
          value={ filters.filterByName.name }
          placeholder="Pesquise por nome aqui..."
        />
        <select
          name="column"
          value={ object.column }
          className="form-control m-1"
          data-testid="column-filter"
          onChange={ handleChange }
        >
          <option id="population">population</option>
          <option id="orbital_period">orbital_period</option>
          <option id="diameter">diameter</option>
          <option id="rotation_period">rotation_period</option>
          <option id="surface_water">surface_water</option>
        </select>
        <select
          value={ object.comparison }
          name="comparison"
          className="form-control m-1"
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          className="form-control m-1"
          data-testid="value-filter"
          placeholder="0"
          value={ object.value }
          name="value"
          onChange={ handleChange }
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={ () => adicionaFiltro(object) }
          data-testid="button-filter"
        >
          Adicionar filtro
        </button>
        { filterByNumericValues.length > 0 && ChosenFilters() }
      </Form>));
}
