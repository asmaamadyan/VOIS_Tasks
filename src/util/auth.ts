import { redirect } from "react-router-dom";

export function getTokenDuration():number {
  const storedExpirationDate = localStorage.getItem("expiration");
  if (!storedExpirationDate) {
    return -1; 
  }
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
export function getAuthToken(): string | undefined {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();
  if(!token){
    return;
  }
  if (tokenDuration < 0) {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    return "EXPIRED";
  }
  return token;
}
export function loader(): string | undefined {
  return getAuthToken();
}
export function checkAuthLoader(): null | Response {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}
