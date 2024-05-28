import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { SignIn, Chat } from "pages";
import { useAuth } from "hooks";
import { AuthContext } from "context";
import { useContext } from "react";

const PrivateRoutes = () => {
  const { userInfo } = useContext(AuthContext);

  if (!userInfo) return <Navigate to="/" replace />;

  return <Outlet />;
};

const Logout = () => {
  const { signOut, userInfo } = useAuth();
  if (userInfo) {
    signOut();
    return <Navigate to="/" replace />;
  }
};

function Routes() {
  return (
    <Router>
      <Route path="/" element={<SignIn />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/Logout" element={<Logout />} />
      </Route>
    </Router>
  );
}

export default Routes;
