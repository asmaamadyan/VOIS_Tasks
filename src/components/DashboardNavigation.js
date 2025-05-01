import classes from "./DashboardNavigation.module.css";
import { NavLink } from "react-router-dom";
function DashboardNavigation() {
    return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All posts
            </NavLink>
          </li>
            <li>
              <NavLink
                to="/newpost"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New post
              </NavLink>
            </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default DashboardNavigation;