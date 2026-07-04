// useDelayedNavigate.js
import { useNavigate, useLocation } from 'react-router-dom';
import { usePageTransition } from './PageTransitionContext';

export function useDelayedNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerTransition, isAnimating } = usePageTransition();

  const delayedNavigate = (to) => {
    // If the user is already on this page, do nothing
    if (location.pathname === to) return;

    // Block spam clicks if already animating
    if (isAnimating) return;

    // 1. Kick off the black shutter slide up
    triggerTransition();

    // 2. Delay navigation until the screen is fully covered
    setTimeout(() => {
      navigate(to);
    }, 1200);
  };

  return delayedNavigate;
}