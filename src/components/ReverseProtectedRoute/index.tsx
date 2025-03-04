import { Navigate, Outlet } from "react-router";
import useUser from "../../hooks/useUser";

export default function ReverseProtectedRoute() {
  const { user } = useUser();
  return user == null ? <Outlet /> : <Navigate to="/" />;
}
