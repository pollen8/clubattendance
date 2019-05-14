import styled from 'styled-components';
import { Input } from 'fab-ui';

export const Table = styled.table`

border-spacing: 0;

  th {
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.grey400};
    height: 2.4rem;
    text-transform: uppercase;
    padding: 0 0 0.15rem 0;
    color: #AEBECD;
    font-size: 0.9rem;
    font-weight: normal;
  }

  tbody tr {
    cursor: pointer;
    : hover {
      background-color: ${({ theme }) => theme.blue100};
    }
  }

  td {
    height:2rem;
    border-bottom: 1px solid ${({ theme }) => theme.grey100};
    padding: 0 0.5rem;
  }
`;

export const Checkbox = styled(Input)`
  margin-left: 0 !important;
`;