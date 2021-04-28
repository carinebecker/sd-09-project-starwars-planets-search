import React, { useContext, useState } from 'react';
import SelectedFilters from './SelectedFilters';
import MyContext from '../context/MyContext';

function Filters() {
  const { filters, setFilters, filterByNum, setFilterByNum } = useContext(MyContext);
  const initialState = {
    column: '',
    comparison: '',
    value: '',
  };

  const [state, setState] = useState(initialState);
  const [unavailableFilters, setUnavailableFilters] = useState([]);
  const [geoOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  function handleInput({ target }) {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  }

  function handleDropDown({ target }) {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleFilteredInputs() {
    setFilterByNum([...filterByNum, state]);
    // if (filters.filterByNumericValues[0].comparison === '') {
    //   return (
    //     setFilters({
    //       ...filters,
    //       filterByNumericValues: [state],
    //     })
    //   );
    // }
    // return (
    //   setFilters({
    //     ...filters,
    //     filterByNumericValues: [
    //       ...filters.filterByNumericValues,
    //       state,
    //     ],
    //   })
    // );
  }

  return (
    <div>
      <label htmlFor="name-filter">
        Search for a specific planet name:
        <input
          type="text"
          id="name-filter"
          placeholder="filter by name..."
          data-testid="name-filter"
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="numeric-filters">
        Apply more filters:
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleDropDown }
        >
          { geoOptions.filter((option) => !unavailableFilters.includes(option))
            .map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            ))}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleDropDown }
        >
          <option value="">Select an option</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ handleDropDown }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          handleFilteredInputs();
          unavailableFilters.push(state.column);
          setUnavailableFilters([...unavailableFilters]);
        } }
      >
        Filtrar
      </button>
      <SelectedFilters />
    </div>
  );
}

export default Filters;
