import classes from "./MainNavigation.module.css";
import { NavLink, useRouteLoaderData } from "react-router-dom";
function DashboardNavigation() {
  return (
    <ul className={classes.list}>
      <li>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          All posts
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/newpost"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          New post
        </NavLink>
      </li>
    </ul>
  );
}

export default DashboardNavigation;
