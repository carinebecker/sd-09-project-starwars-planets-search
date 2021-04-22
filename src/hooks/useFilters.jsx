import { useState } from 'react';

export default function useFilters() {
  const [numericFilters, setNumericFilters] = useState([]);
  // const [nameQuery, setNameQuery] = useState('');

  function addFilter(filter) {
    const currFilters = numericFilters;
    setNumericFilters([...currFilters, filter]);
  }

  return { numericFilters, addFilter };
}
