import React from 'react';
import PropTypes from 'prop-types';

function GenericFilterInput({ label, dataTestId, set, htmlFor }) {
  return (
    <label htmlFor={ htmlFor }>
      { label }
      <input
        data-testid={ dataTestId }
        id={ htmlFor }
        onChange={ (event) => set(event.target.value) }
      />
    </label>
  );
}

GenericFilterInput.propTypes = {
  label: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  set: PropTypes.func.isRequired,
  htmlFor: PropTypes.string.isRequired,
};

export default GenericFilterInput;
