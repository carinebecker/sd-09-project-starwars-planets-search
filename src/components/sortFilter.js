import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import PlanetContext from '../context/context';

export default function SortForm() {
  const { setFilters, filters, planetList } = useContext(PlanetContext);
  const [object, setObject] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const handleChange = ({ target }) => {
    const { value, name, tagName } = target;
    if (tagName === 'SELECT') {
      setObject({ ...object, column: value });
    }
    if (tagName === 'INPUT') {
      setObject({ ...object, sort: name });
    }
  };

  const sortButton = () => {
    setFilters({ ...filters, order: { ...object } });
  };

  return (
    <Form className="m-3 form-inline">
      <select
        onChange={ handleChange }
        value={ object.column }
        className="form-control p-1"
        data-testid="column-sort"
      >
        { planetList && Object.keys(planetList[0])
          .map((e, i) => <option key={ i } id={ e }>{ e }</option>) }
      </select>
      <label className="form-check-label p-1" htmlFor="asc-order">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          className="form-check-input"
          id="asc-order"
          name="ASC"
          checked={ object.sort === 'ASC' }
          onChange={ handleChange }
        />
        ASC
      </label>
      <label className="form-check-label p-1" htmlFor="desc-order">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          className="form-check-input"
          id="desc-order"
          name="DESC"
          checked={ object.sort === 'DESC' }
          onChange={ handleChange }
        />
        DESC
      </label>
      <button
        onClick={ sortButton }
        type="button"
        className="btn btn-success"
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </Form>
  );
}
