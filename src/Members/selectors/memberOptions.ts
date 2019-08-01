import { createSelector } from 'reselect';

import { IGlobalState } from '../../reducers';

const getMembers = (state: IGlobalState) => state.member.data;

export const memberOptions = createSelector(
  getMembers,
  (members) => {
    return members.map((member) => ({ value: member, label: member.name }));
  }
)