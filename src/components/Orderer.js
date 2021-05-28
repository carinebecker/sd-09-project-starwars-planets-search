import React, { useContext } from 'react';
import { Context } from '../context/Provider';

export default function Orderer() {
  const { data } = useContext(Context);
  const headers = Object.keys(data[0]);
  const filteredHeaders = headers.filter((header) => header !== 'residents');
  return (
    <div>
      <select data-testid="column-sort">
        {
          filteredHeaders.map((header) => <option key={ header }>{header}</option>)
        }
      </select>
    </div>
  );
}
