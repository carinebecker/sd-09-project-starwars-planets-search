import { useContext, useState, useEffect } from 'react';
import { TableContext } from '../contexts/TableContext';

const useFilterName = () => {
  const { data, name } = useContext(TableContext);
  const [filterNameReturn, setFilterNameReturn] = useState([]);

  useEffect(() => {
    const showPlanets = data.filter((planet) => planet.name.includes(name));
    setFilterNameReturn(showPlanets);
    if (name.length === 0) {
      setFilterNameReturn(data);
    }
  }, [data, name]);
  return [filterNameReturn];
};

export default useFilterName;
