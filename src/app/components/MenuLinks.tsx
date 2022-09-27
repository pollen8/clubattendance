import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  onClick?: () => void;
}

export const MenuLinks: FC<IProps> = ({ onClick }) => {
  return (
    <>
      <li>
        <NavLink onClick={() => onClick && onClick()} to="/">Attendance</NavLink>
      </li>
      <li>
        <NavLink onClick={() => onClick && onClick()} to="/members">Members</NavLink>
      </li>
      {/* <li>
        <NavLink onClick={() => onClick && onClick()}
          exact to="/teams">Teams</NavLink>
      </li>
      <li>
        <NavLink onClick={() => onClick && onClick()}
          exact to="/matches">Matches</NavLink>
      </li>
      <li>
        <NavLink onClick={() => onClick && onClick()}
          exact to="/clubs">Clubs</NavLink>
      </li> */}
    </>
  );
}
