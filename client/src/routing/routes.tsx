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

const Home = Loadable(lazy(() => import('../pages/Home')));
const Detail = Loadable(lazy(() => import('../pages/Detail')));

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
        path: '/:page',
        element: <Home />
      },
      {
        path: '/detail/:id',
        element: <Detail />
      }
    ]
  }
];
