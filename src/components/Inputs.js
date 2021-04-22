import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Inputs() {
  const { filterPlanets, filterByNumber, filterOptions } = useContext(MyContext);
  // const [subject, setSubject] = useState('');
  // const [number, setNumber] = useState(0);
  // const [operator, setOperator] = useState('');

  // handleChange = ({ target }) => {
  //   const { value, name } = target;
  //   if (name === 'subject') {
  //     return setSubject(value);
  //   }
  //   if (name === 'operator') {
  //     return setOperator(value);
  //   }
  //   if (name === 'number') {
  //     return setNumber(value);
  //   }
  // };

  // handleClick = () => {
  //   filterByNumber(subject, operator, number);
  // };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar por nome"
        onChange={ filterPlanets }
        name="name"
      />
      <select data-testid="column-filter" onChange={ filterOptions } name="subject">
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select data-testid="comparison-filter" onChange={ filterOptions } name="operator">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ filterOptions }
        name="number"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterByNumber }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Inputs;
