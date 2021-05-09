export default function handleOrderFilter(planets, { column, sort }) {
  const dataToSort = [...planets];
  return dataToSort.sort((a, b) => {
    if (!Number.isNaN(Number(a[column]))) {
      return sort === 'ASC'
        ? Number(a[column]) - Number(b[column])
        : Number(b[column]) - Number(a[column]);
    }
    if (a[column] === undefined) return 0;
    return sort === 'ASC'
      ? a[column].localeCompare(b[column])
      : b[column].localeCompare(a[column]);
  });
}