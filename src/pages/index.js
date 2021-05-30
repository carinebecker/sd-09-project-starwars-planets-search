import React, { useContext } from 'react';
import { Context } from '../context/Context';
import planetsDataAPI from '../services/StarWarsAPI';

function Index() {
  const { data, setData } = useContext(Context);

  return (
    <table>
      <input
        value={ data }
        onChange={ ({ target }) => setData(target.value) }
        type="text"
      />
      <button type="submit" onClick={ () => planetsDataAPI(data) }>Submit</button>
    </table>
  );
}

export default Index;
