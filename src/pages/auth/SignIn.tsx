import { Loader } from "components";
import { useAuth } from "hooks";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";

import reactLogo from "assets/react.svg";

const SignIn = (): ReactElement => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { userInfo, signIn, loading: authLoading } = useAuth();

  const handleFormOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (username.length > 2) {
      signIn(username).then(() => {
        setLoading(false);
        setUsername("");
        navigate("/chat");
      });
    }
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/chat");
    }
  }, [navigate, userInfo]);

  if (authLoading) {
    return <Loader />;
  }

  return (
    <div className={"flex"}>
      <div className={"flex flex-row items-center justify-center h-screen"}>
        <div className={"grid grid-cols-2 xs:grid-cols-1 rounded-lg shadow-md"}>
          <section className={"bg-purple-500 rounded-tl-lg rounded-bl-lg p-10"}>
            <div className={"flex flex-col gap-4 justify-center items-center"}>
              <img src={reactLogo} alt="React logo" className={"w-76 h-70"} />
              <div className={"flex flex-col gap-2 items-center"}>
                <h1 className={"text-3xl text-white font-bold"}>
                  Welcome to React Chat App
                </h1>
              </div>
            </div>
          </section>
          <section className={"flex flex-col gap-4 p-10 justify-center"}>
            <h2 className={"text-2xl font-bold"}>Sign in</h2>
            <p className={"text-gray-500 text-lg"}>type username</p>
            <div
              className={
                "text-gray-500 before:bg-orange-300 before:p-2 flex flex-row gap-4 bg-orange-100"
              }
            ></div>
            <form
              onSubmit={handleFormOnSubmit}
              className={"flex flex-col gap-4"}
            >
              <div className={"flex flex-col gap-2"}>
                <label htmlFor={"username"} className={"text-lg text-gray-500"}>
                  Username
                </label>
                <input
                  onChange={handleChangeUsername}
                  value={username}
                  required={true}
                  placeholder={"Enter your username"}
                  type={"text"}
                  id={"username"}
                  name={"username"}
                  className={
                    "border-2 border-gray-300 rounded-lg p-2 transition-all"
                  }
                />
              </div>
              <button
                disabled={loading}
                className={
                  "bg-purple-500 text-white rounded-lg p-2 disabled:bg-purple-100"
                }
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
