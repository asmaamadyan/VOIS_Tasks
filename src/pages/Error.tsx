import React from "react";
import MainNavigation from "../components/MainNavigation";

const ErrorPage : React.FC=()=> {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An error occurred!</h1>
        <p>Could not find the page you are looking for.</p>
      </main>
    </>
  );
}

export default ErrorPage;
