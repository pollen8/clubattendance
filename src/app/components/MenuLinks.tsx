import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  onClick?: () => void;
}

export const MenuLinks: FC<IProps> = ({ onClick }) => {
  return (
    <>
      <li>
        <NavLink onClick={() => onClick && onClick()} exact to="/">Attendance</NavLink>
      </li>
      <li>
        <NavLink onClick={() => onClick && onClick()} exact to="/members">Members</NavLink>
      </li>
    </>
  );
}
