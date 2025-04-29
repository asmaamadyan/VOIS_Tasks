// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDeleteAction
} from "./pages/EventDetailPage";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import Root from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          { path: "", element: <EventsPage />, loader: eventsLoader },
          {
            path: ":eventId",
            id : 'event-detail',
            loader: eventDetailLoader,
            children: [
              {index  : true, element: <EventDetailPage /> , action :eventDeleteAction },
              { path: "edit", element: <EditEventPage /> ,action :manipulateEventAction},
            ],
          },
          { path: "new", element: <NewEventPage /> ,action :manipulateEventAction },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
