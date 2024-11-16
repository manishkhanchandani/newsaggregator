import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children: ReactElement;
}
const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const location = useLocation();
  const { pathname } = location;

  React.useEffect(() => {
    window.scrollTo(0, 0); // this is important to know how we are scrolling to top
  }, [pathname]); // pathname is url which is changed.

  return children;
};

export default ScrollToTop;
