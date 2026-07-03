import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDelayedNavigate } from './useDelayedNavigate';

export default function TransitionLink({ to, children, ...props }) {
  const delayedNavigate = useDelayedNavigate();

  const handleNavigation = (e) => {
    e.preventDefault(); // Stop instant routing
    delayedNavigate(to);
  };

  return (
    <NavLink to={to} onClick={handleNavigation} {...props}>
      {children}
    </NavLink>
  );
}