import { useState } from 'react';

export default function useFilter() {
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [filterByNumbers, setFilterByNumbers] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  });
  function handleChange({ target }) {
    const { name, value } = target;
    switch (name) {
    case 'name':
      setFilters({ ...filters, filterByName: { [name]: value } });
      break;
    default:
      setFilterByNumbers({ ...filterByNumbers, [name]: value });
      break;
    }
  }
  return [filters, handleChange, filterByNumbers];
}
