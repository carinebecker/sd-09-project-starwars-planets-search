import React, { useContext } from 'react';
import Filters from '../components/Filters';
import SortData from '../components/SortData';
import TableBody from '../components/TableBody';
import context from '../context/context';
import '../style/Table.css';
import '../style/TableBody.css';

function Table() {
  const { loading } = useContext(context);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="tablePage">
      <Filters />
      <SortData />
      <table className="table">
        <thead>
          <tr className="tableHeaders">
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
    </div>
  );
}

export default Table;
