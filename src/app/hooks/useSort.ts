import { useState } from 'react';

export   const useSort = <T extends {}>(defaultSort: keyof T) => {
  const [sort, updateSort] = useState<keyof T>(defaultSort);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const setSort = (col: keyof T) => {
    if (sort === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDir('asc')
    }
    updateSort(col);
  }
  const sorter = (a: T, b: T) => {
    return a[sort] > b[sort] ? 1 : -1;
  }
  return {
    sort,
    setSort,
    sortDir,
    sorter,
  }
}
