import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  onClick?: () => void;
}

export const MenuLinks: FC<IProps> = ({onClick}) => {
  const roles = ['Admin'];
  return (
    <>
      {/* <li>
        <NavLink exact to="/">Dashboard</NavLink>
      </li> */}
      {
        roles.includes('Admin') &&
        <>
          {/* <li>
            <NavLink exact to="/clubs">Clubs</NavLink>
          </li> */}
          <li>
            <NavLink onClick={() => onClick && onClick()} exact to="/">Attendance</NavLink>
          </li>
          <li>
            <NavLink onClick={() => onClick && onClick()} exact to="/members">Members</NavLink>
          </li>

          {/* <li>
            <NavLink exact to="/users">Users</NavLink>
          </li> */}
        </>
      }
      {/* <li>
        <NavLink exact to="/seasons">Seasons</NavLink>
      </li> */}
    </>
  );
}
