import { useContext, useState, useEffect } from 'react';
import { TableContext } from '../contexts/TableContext';

const useFilterName = () => {
  const { data } = useContext(TableContext);
  const [nameSearch, setNameSearch] = useState('');
  const [filterNameReturn, setFilterNameReturn] = useState([]);

  useEffect(() => {
    const showPlanets = data.filter((planet) => planet.name.includes(nameSearch));
    setFilterNameReturn(showPlanets);
    if (nameSearch.length === 0) {
      setFilterNameReturn(data);
    }
    // ainda nao descobri pq da dependencia nameSearch
    // removi o data dessa dependencia amarelinhas
  }, [data, nameSearch]);
  // coloquei o nameSearch no começo do return bugo tudo pq faltava chama ele no Table.jsx
  // mais se ponho no final ta de boa mesmo se nao chamar la
  // porem no useFilterChoice nao coloquei o setNameSearch priemeiro e nao quebro
  return [nameSearch, setNameSearch, filterNameReturn];
};

export default useFilterName;
