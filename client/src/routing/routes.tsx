import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationManager from './NavigationManager';

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback="Loading...">
      <Component {...props} />
    </Suspense>
  );
};

const Home = Loadable(lazy(() => import('../components/Home')));
const Home2 = Loadable(lazy(() => import('../components/Home2')));

export const routes = [
  {
    path: '/',
    element: (
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/home2',
        element: <Home2 />
      }
    ]
  }
];
