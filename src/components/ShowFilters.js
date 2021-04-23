import React, { useContext } from 'react';
import Toast from 'react-bootstrap/Toast';
import YodaContext from '../local_resources/Context';
import KeyGenerator from '../local_resources/KeyGenerator';

const keygen = KeyGenerator();
const DEFAULT_COLUMNS = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

const ShowFilters = () => {
  const {
    showToast,
    setShowToast,
    filters,
    setFilters,
    columns,
    setColumns } = useContext(YodaContext);
  const toggleShowToast = () => {
    const index = parseInt(
      document.querySelector('button.close').previousElementSibling.id, 10,
    );

    setShowToast(
      [...showToast.slice(0, 0),
        ...showToast.slice(1, showToast.length)],
    );

    setFilters(
      { ...filters,
        filterByNumericValues: [
          ...filters.filterByNumericValues.slice(0, index),
          ...filters.filterByNumericValues.slice(
            index + 1, filters.filterByNumericValues.length,
          ),
        ] },
    );

    if (filters.filterByNumericValues === 0) {
      setColumns([...columns.slice(0, 0), ...DEFAULT_COLUMNS]);
    }
  };

  return (
    filters.filterByNumericValues
      ? (
        filters.filterByNumericValues.map((filter, index) => (
          <Toast
            key={ keygen.next().value }
            onClose={ toggleShowToast }
            show={ showToast[index] }
          >
            <Toast.Header data-testid="filter" name={ index }>
              <strong className="mr-auto" id={ index }>
                { `Filter: ${filter.column} ${filter.comparison} ${filter.value}` }
              </strong>
            </Toast.Header>
          </Toast>)))
      : ''
  );
};
export default ShowFilters;
