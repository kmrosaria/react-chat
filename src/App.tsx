// const Chat = lazy(() =>
//   import("./pages").then(({ Chat }) => ({ default: Chat }))
// );
// const SignIn = lazy(() =>
//   import("./pages").then(({ SignIn }) => ({ default: SignIn }))
// );
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
