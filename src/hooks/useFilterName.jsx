import { useContext, useState, useEffect } from 'react';
import { TableContext } from '../contexts/TableContext';

const useFilterName = () => {
  const [nameSearch, setNameSearch] = useState('');
  const [filterNameReturn, setFilterNameReturn] = useState([]);
  const { data } = useContext(TableContext);

  useEffect(() => {
    // falto aumentar o array de retorno
    // data.forEach((planet) => {
    //   if (planet.name.includes(nameSearch)) {
    //     console.log(planet.name);
    //   //   // setFilterNameReturn([...filterNameReturn, planet]);
    //   //   // console.log(filterNameReturn);
    //   // }
    // });
    const showPlanets = data.filter((planet) => planet.name.includes(nameSearch));
    setFilterNameReturn(showPlanets);
    if (nameSearch === '') {
      setFilterNameReturn(data);
    }
    // ainda nao descobri pq da dependencia nameSearch
  }, [data, nameSearch]);

  return [setNameSearch, filterNameReturn];
};

export default useFilterName;
