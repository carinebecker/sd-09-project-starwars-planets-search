import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

export default function Table() {
  const { data } = useContext(StarWarsContext);
  console.log(data);
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <table>
        <thead />
        <tbody />
      </table>
    </div>
  );
}
