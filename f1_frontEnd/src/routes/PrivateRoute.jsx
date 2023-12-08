import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../reducers/UserSlice";

export default function PrivateRoute() {
  const users = useSelector(selectAllUsers);
  return users.length !== 0 ? <Outlet /> : <Navigate to={"/login"} />;
}
