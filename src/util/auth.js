import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";

// export function getTokenDuration() {
//   const storedExpirationDate = localStorage.getItem("expiration");
//   const expirationDate = new Date(storedExpirationDate);
//   const now = new Date();
//   const duration = expirationDate.getTime() - now.getTime();
//   return duration;
// }
export function getAuthToken() {
  const token = localStorage.getItem("token");
    // const dispatch =useDispatch()
    // if(token){
    //     dispatch(login())
    // }else{
    //     dispatch(logout())
    // }
  return token;
}
export function loader() {
  return getAuthToken();
}
export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}
