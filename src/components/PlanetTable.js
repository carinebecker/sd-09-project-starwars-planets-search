import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useNumFilter from './NumericFilter';
import PlanetContext from '../context/context';

export default function Table({ list }) {
  const { filters: { order: { column, sort } } } = useContext(PlanetContext);
  const headers = Object.keys(list[0]).filter((item) => item !== 'residents');
  const [listing] = useNumFilter(list);

  const sortedListing = listing.sort((a, b) => {
    const minus = -1;
    a = a[column].toLowerCase();
    b = b[column].toLowerCase();
    if (!parseInt(a, 10)) {
      const sortingResult = sort === 'ASC' ? a > b : a < b;
      return (sortingResult ? 1 : minus);
    }
    return (sort === 'ASC' ? a - b : b - a);
  });

  const info = sortedListing.map((planet, index) => {
    const data = headers.map((section) => planet[section]);
    return (
      <tr
        key={ index }
      >
        { data.map((each, i) => (
          <td
            data-testid={ i === 0 ? 'planet-name' : undefined }
            id={ i === 0 ? 'name' : undefined }
            key={ i }
          >
            { each }
          </td>)) }
      </tr>);
  });
  return (
    <table className="table table-bordered">
      <tr>
        {headers.map((title, index) => <th key={ index }>{title}</th>)}
      </tr>
      { info }
    </table>);
}

Table.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
