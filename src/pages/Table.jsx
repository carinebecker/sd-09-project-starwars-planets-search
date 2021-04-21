import React, { useContext } from 'react';
import FilterByName from '../components/FilterByName';
import FilterByNumber from '../components/FilterByNumber';
import TableBody from '../components/TableBody';
import context from '../context/context';

function Table() {
  const { loading } = useContext(context);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section>
      <FilterByName />
      <FilterByNumber />
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Rotation </th>
            <th> Orbital </th>
            <th> Diameter </th>
            <th> Climate </th>
            <th> Gravity </th>
            <th> Terrain </th>
            <th> Surface Water </th>
            <th> Population </th>
            <th> Films </th>
            <th> Created </th>
            <th> Edited </th>
            <th> URL </th>
          </tr>
        </thead>
        <TableBody />
      </table>
    </section>
  );
}

export default Table;
