import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Inputs() {
  const { subjects, filterPlanets, options, displayFiltered, resetFilter,
    filterByNumber, filterOptions } = useContext(MyContext);

  const renderNameInput = () => (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar por nome"
        onChange={ filterPlanets }
        name="name"
      />
    </div>
  );

  const renderSubjectInput = () => (
    <select data-testid="column-filter" onChange={ filterOptions } name="subject">
      { subjects.map((sub) => <option key={ sub }>{ sub }</option>)}
    </select>
  );

  const renderOperatorInput = () => (
    <select data-testid="comparison-filter" onChange={ filterOptions } name="operator">
      <option>maior que</option>
      <option>menor que</option>
      <option>igual a</option>
    </select>
  );

  const renderNumberInput = () => (
    <input
      data-testid="value-filter"
      type="number"
      onChange={ filterOptions }
      name="number"
    />
  );

  const renderFilteredBy = () => {
    const { subject, operator, number } = options;
    if (displayFiltered) {
      return (
        <div>
          <p data-testid="filter">
            { `Filtrado por ${subject} ${operator} ${number}` }
            <button type="button" onClick={ resetFilter }>X</button>
          </p>
        </div>
      );
    }
    return null;
  };

  const handleCLick = () => {
    filterByNumber();
  };

  return (
    <div>
      <fieldset>
        { renderNameInput() }
        { renderSubjectInput() }
        { renderOperatorInput() }
        { renderNumberInput() }
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleCLick }
        >
          Filtrar
        </button>
      </fieldset>
      <fieldset>
        <h4>Filtros:</h4>
        { renderFilteredBy() }
      </fieldset>
    </div>
  );
}

export default Inputs;
