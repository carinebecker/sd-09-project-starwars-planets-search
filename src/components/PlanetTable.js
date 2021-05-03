import React from 'react';
import PropTypes from 'prop-types';

export default function Table({ list }) {
  const headers = Object.keys(list[0]).filter((item) => item !== 'residents');
  const info = list.map((planet, index) => {
    const data = headers.map((section) => planet[section]);
    return (
      <tr
        key={ index }
      >
        { data.map((each, i) => <td key={ i }>{ each }</td>) }
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
