import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PlanetSearchContext } from '../context';
import { useValuesFilterFields } from '../hooks';

const comparisons = [
  'maior que',
  'menor que',
  'igual a',
];

const renderColumnsSelection = (
  { newEntry, availableColumns, values, handleFilterChanges, disabled },
) => {
  const columns = values ? [values.column] : availableColumns;
  return (
    <select
      { ...newEntry && { 'data-testid': 'column-filter' } }
      name="column"
      { ...values && { value: values.column } }
      onChange={ handleFilterChanges }
      disabled={ disabled }
    >
      { columns.map((value) => (
        <option value={ value } key={ value }>{ value }</option>
      )) }
    </select>
  );
};

const renderComparisonsSelection = (
  { newEntry, values, handleFilterChanges, disabled },
) => (
  <select
    { ...newEntry && { 'data-testid': 'comparison-filter' } }
    name="comparison"
    { ...values && { value: values.comparison } }
    onChange={ handleFilterChanges }
    disabled={ disabled }
  >
    { comparisons.map((value) => (
      <option value={ value } key={ value }>{ value }</option>
    )) }
  </select>
);

const renderValueInput = (
  { newEntry, values, handleFilterChanges, disabled },
) => (
  <input
    type="number"
    { ...newEntry && { 'data-testid': 'value-filter' } }
    name="value"
    { ...values && { value: values.value } }
    onChange={ handleFilterChanges }
    disabled={ disabled }
  />
);

const renderButton = ({ newEntry, buttonCallback, param }) => (
  <button
    type="button"
    { ...newEntry && { 'data-testid': 'button-filter' } }
    onClick={ () => buttonCallback(param) }
  >
    { newEntry ? 'Filtrar' : 'X' }
  </button>
);

const SearchValuesEntry = (
  { newEntry = false, filter = {}, availableColumns = [''] },
) => {
  const newFieldsValues = false;
  const values = newEntry ? newFieldsValues : filter;
  const { addFilterByValue, removeFilterByValue } = useContext(PlanetSearchContext);
  const buttonCallback = newEntry ? addFilterByValue : removeFilterByValue;
  const [valuesFilter, handleFilterChanges] = useValuesFilterFields();
  const params = {
    newEntry,
    availableColumns,
    values,
    handleFilterChanges,
    disabled: !newEntry,
  };
  return (
    <div { ...!newEntry && { 'data-testid': 'filter' } }>
      { renderColumnsSelection(params) }
      { renderComparisonsSelection(params) }
      { renderValueInput(params) }
      { renderButton(
        { newEntry, buttonCallback, param: newEntry ? valuesFilter : filter },
      ) }
    </div>
  );
};

export default SearchValuesEntry;

SearchValuesEntry.propTypes = {
  newEntry: PropTypes.bool,
  availableColumns: PropTypes.arrayOf(PropTypes.string),
  filter: PropTypes.shape({
    column: PropTypes.string,
    comparison: PropTypes.string,
    value: PropTypes.string,
  }),
};

SearchValuesEntry.defaultProps = {
  newEntry: false,
  availableColumns: [],
  filter: {
    column: '',
    comparison: '',
    value: '0',
  },
};
