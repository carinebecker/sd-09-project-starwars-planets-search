import React from 'react';
// import StarWarsContext from '../context/StarWarsContext';
import PropTypes from 'prop-types';

function ExcludeFilter(props) {
  // const { filterNumeric, selectColumns, setSelectColumns,
  //   setFilterNumeric } = useContext(StarWarsContext);
  const { removeClick, filterNumeric } = props;
  console.log(filterNumeric);

  return (
    filterNumeric.length > 0 && (
      <div>
        {filterNumeric.map((item, index) => (
          <div data-testid="filter" key={ index }>
            {item.column }
            {item.comparison }
            {item.value}
            <button
              type="button"
              onClick={ () => removeClick(item.column) }
            >
              x
            </button>
          </div>
        ))}
      </div>
    )
  );
}

ExcludeFilter.propTypes = {
  removeClick: PropTypes.func.isRequired,
  filterNumeric: PropTypes.arrayOf.isRequired,
};

export default ExcludeFilter;
