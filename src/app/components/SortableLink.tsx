import { PropsWithChildren } from 'react';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';
import { styled } from 'styled-components';

import { IMember } from '../../Members/Members';

type SortableProps = {
  name: keyof IMember;
  setSort: (sort: keyof IMember) => void;
  sort: keyof IMember; sortDir: 'asc' | 'desc';
};

const HeadButton= styled.button`
  background: transparent;
  border: 0;
  padding:  0;
  height: 2.4rem;
  text-transform: uppercase;
  color: #AEBECD;
`;

export const Sortable = ({
  name,
  setSort,
  sort,
  sortDir,
  children,
}: PropsWithChildren<SortableProps>) => {
  return (
    <HeadButton onClick={() => setSort(name)}>
      {
        sort === name && 
       ( sortDir === 'asc'
        ?<MdKeyboardArrowUp />
        :<MdKeyboardArrowDown />)
       } {children}</HeadButton>
  )
}
