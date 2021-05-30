import React from 'react';

export const COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const filterPlanets = (planets, filterByNumericValues) => {
  filterByNumericValues.forEach(({ column, comparison, value }) => {
    if (comparison === 'maior que') {
      planets = planets.filter((planet) => +planet[column] > +value);
    }
    if (comparison === 'menor que') {
      planets = planets.filter((planet) => +planet[column] < +value);
    }
    if (comparison === 'igual a') {
      planets = planets.filter((planet) => +planet[column] === +value);
    }
  });
  return planets;
};

const sortByName = (planets, sort) => {
  const negative = -1;
  planets.sort((a, b) => {
    if (a.name > b.name) return sort === 'ASC' ? 1 : negative;
    if (b.name > a.name) return sort === 'ASC' ? negative : 1;
    return 0;
  });
};

export const sortPlanets = (planets, { column, sort }) => {
  if (column === 'name') sortByName(planets, sort);
  switch (sort) {
  case 'ASC':
    return planets.sort((a, b) => (a[column] - b[column]));
  case 'DESC':
    return planets.sort((a, b) => (b[column] - a[column]));
  default:
    return planets;
  }
};

export const createInput = (testid, id, type, onChange) => (
  <input data-testid={ testid } id={ id } type={ type } onChange={ onChange } />
);

export const createDropDown = (testid, id, option, onChange) => (
  <select data-testid={ testid } id={ id } name={ id } onChange={ onChange }>
    { option.map((element) => (
      <option key={ element } value={ element }>{ element }</option>))}
  </select>
);

export const createRadioInput = (testid, name, value, onChange) => (
  <label htmlFor={ value }>
    { value }
    <input
      data-testid={ testid }
      id={ value }
      name={ name }
      value={ value }
      type="radio"
      onChange={ onChange }
    />
  </label>
);

export const createButton = (testid, name, onClick) => (
  <button data-testid={ testid } type="button" onClick={ onClick }>
    { name }
  </button>
);

const STATE = { column: 'population', comparison: 'maior que', value: 0 };

function Form() {
  const { nameFilter, changeFilters } = useContext(Context);
  const [state, setState] = useState(STATE);
  const [columns, setColumns] = useState(COLUMNS);
  const comparisons = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target: { id, value } }) => {
    setState({ ...state, [id]: value });
  };

  const handleFilterButton = () => {
    changeFilters(state);
    setColumns(columns.filter((el) => el !== state.column));
  };

  return (
    <section>
      <label htmlFor="name">
        SEARCH
        { createInput('name-filter', 'name', 'text', nameFilter) }
      </label>
      { createDropDown('column-filter', 'column', columns, handleChange) }
      { createDropDown('comparison-filter', 'comparison', comparisons, handleChange) }
      { createInput('value-filter', 'value', 'number', handleChange) }
      { createButton('button-filter', 'FILTER', handleFilterButton) }
    </section>
  );
}

export default Form;
