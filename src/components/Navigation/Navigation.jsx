import React from 'react';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navigationLink, isActive && css.active);
};

const Navigation = () => {
  return (
    <div className={css.navigation}>
      <nav className={css.navigationNav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;