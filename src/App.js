import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Authentication from "./pages/Authentication";
import DashboardPage from "./pages/Dashboard";
import PostsPage from "./pages/Posts";
import NewPostPage from "./pages/NewPost";
import DashboardLayout from "./pages/DashboardLayout";
import HomePage from "./pages/Home";
import { action as authAction } from "./pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <Authentication />,
        action: authAction,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          {
            path: "dashboardlayout",
            element: <DashboardLayout />,
            children: [
              { path: "posts", element: <PostsPage /> },
              { path: "newpost", element: <NewPostPage /> },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
