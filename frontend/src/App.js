
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import EventDetailPage from "./pages/EventDetailPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import Root from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
const router = createBrowserRouter([
  {path :'/',element :<Root/>, children : [
    {index : true, element : <HomePage/>},
    {path : 'events', element : <EventsRoot/> ,children : [

      {path : '', element : <EventsPage/>},
      {path : ':eventId', element : <EventDetailPage/>},
      {path : 'new', element : <NewEventPage/>},
      {path : ':eventId/edit', element : <EditEventPage/>},
    ]},
  ],} 
])
function App() {
  return <RouterProvider router={router} />;
}

export default App;
