import { useAuth } from "hooks";
import { ReactElement, useState } from "react";
// import { useNavigate } from "react-router";

const Chat = (): ReactElement => {
  // const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const { signOut, userInfo } = useAuth();

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate, userInfo]);

  return (
    <>
      <h1> Hi {userInfo?.displayName}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Chat;
