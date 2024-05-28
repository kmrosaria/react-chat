// const Chat = lazy(() =>
//   import("./pages").then(({ Chat }) => ({ default: Chat }))
// );
// const SignIn = lazy(() =>
//   import("./pages").then(({ SignIn }) => ({ default: SignIn }))
// );
import { AuthProvider } from "context";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
