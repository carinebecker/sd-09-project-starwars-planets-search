import React, { useContext } from 'react';
import StarWarsContext from '../../Context/StarWarsContext';

function TextFilter() {
  const { setText, name } = useContext(StarWarsContext);

  return (
    <section>
      <input
        data-testid="name-filter"
        onChange={ (e) => setText(e.target.value) }
        placeholder="Pesquise"
        type="text"
        value={ name }
      />
    </section>
  );
}

export default TextFilter;
