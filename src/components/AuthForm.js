
import { Form, Link, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {

  const[searchParams]=useSearchParams()
  const isLogin = searchParams.get('mode')==='login'
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Login':'Create a new user'}</h1>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />

        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin?'signup' : 'login'}`} >
          {isLogin ? 'Create a new user':'Login'}
          </Link>
          <button >Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
