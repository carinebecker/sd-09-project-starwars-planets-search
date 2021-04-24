import React from 'react';
import { func, objectOf } from 'prop-types';

function DeleteFilterBtn({ DeleteFunction, Filter }) {
  return (
    <div
      data-testid="filter"
    >
      <button
        type="button"
        onClick={ () => DeleteFunction(Filter) }
      >
        X
      </button>
    </div>
  );
}

DeleteFilterBtn.propTypes = {
  DeleteFunction: func,
  Filter: objectOf,
}.isRequired;

export default DeleteFilterBtn;
