import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks";
import { AuthContext } from "context";
import { Suspense, lazy, useContext } from "react";
import { Loader } from "components";

const SignIn = lazy(() => import("./pages/auth/SignIn"));
const Chat = lazy(() => import("./pages/chat/Chat"));

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
    <Suspense fallback={<Loader />}>
      <Router>
        <Route path="/" element={<SignIn />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/Logout" element={<Logout />} />
        </Route>
      </Router>
    </Suspense>
  );
}

export default Routes;
