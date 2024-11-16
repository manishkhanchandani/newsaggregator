import { ReactElement } from 'react';
import ScrollToTop from '../utils/ScrollToTop';

interface NavigationManagerProps {
  children: ReactElement;
}

const NavigationManager: React.FC<NavigationManagerProps> = ({ children }) => {
  return (
    <ScrollToTop>
      <div>
        <h1>Header</h1>
        {children}
        <h1>Footer</h1>
      </div>
    </ScrollToTop>
  );
};

export default NavigationManager;
