import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import NewEvent from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import eventsLoader from './helpers/eventsLoader';
import ErrorPage from './pages/Error';
import eventDetailLoader from './pages/EventDetail/loaderHelper';
import deleteAction from './pages/EventDetail/action';
import action from './helpers/action';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteAction,
              },
              {
                path: 'edit',
                element: <EditEvent />,
                action: action,
              },
            ],
          },
          { path: 'new', element: <NewEvent />, action: action },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div></div>
    </RouterProvider>
  );
}

export default App;
