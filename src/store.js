export default function handleOrderFilter(planets, { column, sort }) {
  const dataToSort = [...planets];
  const negative = -1;
  let result;
  if (sort === 'ASC') {
    result = dataToSort.sort((a, b) => {
      if (a[column] > b[column]) {
        return 1;
      }
      if (a[column] < b[column]) {
        return negative;
      }
      return 0;
    });
  }

  if (sort === 'DESC') {
    result = dataToSort.sort((a, b) => {
      if (a[column] > b[column]) {
        return negative;
      }
      if (a[column] < b[column]) {
        return 1;
      }
      return 0;
    });
  }
  return result;
}

// export default function handleOrderFilter() {
//   const { column, sort } = order;
//   const dataToSort = [...filteredData];
//   const negative = -1;
//   let result;
//   if (sort === 'ASC') {
//     result = dataToSort.sort((a, b) => {
//       if (a[column] > b[column]) {
//         return 1;
//       }
//       if (a[column] < b[column]) {
//         return negative;
//       }
//       return 0;
//     });
//   }

//   if (sort === 'DESC') {
//     result = dataToSort.sort((a, b) => {
//       if (a[column] > b[column]) {
//         return negative;
//       }
//       if (a[column] < b[column]) {
//         return 1;
//       }
//       return 0;
//     });
//   }
//   setFilteredData(result);
// }
