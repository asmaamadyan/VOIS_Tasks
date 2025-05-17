import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import React, { useEffect } from "react";
import { RootState } from "../store";

const MainNavigation : React.FC=()=> {
  const token = useRouteLoaderData("root") as string | null;
  const dispatch = useDispatch();
  const login = useSelector((state : RootState)=>state.auth.isAuthenticated)
  console.log('auth?',login);
  useEffect(()=>{

    if(token){
      dispatch(authActions.login())
    }
  },[token,dispatch])
  function handleLogout(){
    dispatch(authActions.logout())
  }
  console.log('auth?',login);
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
        {!token &&  <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>}
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Auth
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                to="dashboard"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                to="posts"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                All posts
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                to="newpost"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New post
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button className={classes.button} onClick={handleLogout}>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
