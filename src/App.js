import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Authentication from "./pages/Authentication";
import DashboardPage from "./pages/Dashboard";
import PostsPage from "./pages/Posts";
import NewPostPage from "./pages/NewPost";
import HomePage from "./pages/Home";
import { action as authAction } from "./pages/Authentication";
import { loader as tokenLoader, checkAuthLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement : <ErrorPage />,
    loader: tokenLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <Authentication />,

        action: authAction,
      },

      {
        path: "dashboard",
        element: <DashboardPage />,
        loader: checkAuthLoader,
      },
      {
        path: "posts",
        element: <PostsPage />,
        loader: checkAuthLoader,
      },
      {
        path: "newpost",
        element: <NewPostPage />,
        loader: checkAuthLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
