import { ReactElement } from 'react';
import ScrollToTop from '../utils/ScrollToTop';
import MenuBar from './MenuBar';

interface NavigationManagerProps {
  children: ReactElement;
}

const NavigationManager: React.FC<NavigationManagerProps> = ({ children }) => {
  return (
    <ScrollToTop>
      <div>
        <MenuBar />
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </ScrollToTop>
  );
};

export default NavigationManager;
