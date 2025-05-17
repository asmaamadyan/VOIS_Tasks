
import { Form, Link, useActionData, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";
import Button from "./Button";

function AuthForm() {

  const[searchParams]=useSearchParams()
  const isLogin = searchParams.get('mode')==='login'
  const data = useActionData();
  console.log('data',data);
  


  return (
    <>
      <Form method="post" className={classes.form}>
        
        <h1>{isLogin ? 'Login':'Create a new user'}</h1>
        {data && data && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
        {data && data.message && <p>{data.message}</p>}
        {!isLogin &&(
          <>
        <p>
          <label htmlFor="name">First Name</label>
          <input id="firstName" type="name" name="firstName" required />
        </p>
        <p>
          <label htmlFor="Name">Last Name</label>
          <input id="lastName" type="name" name="lastName" required />
        </p>
          </>
        )}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />

        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin?'signup' : 'login'}`} >
          {isLogin ? 'Create a new user':'Login'}
          </Link>
          <Button>{isLogin ? 'Login' : 'Save'}</Button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
