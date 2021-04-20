import { useState } from 'react';

export default function useFilter({ filterByName: { name } }) {
  const [filters, setFilters] = useState({ filterByName: { name } });
  return [filters, setFilters];
}
