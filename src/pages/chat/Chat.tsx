import { useAuth, useChat } from "hooks";
import { ReactElement, useState } from "react";
import ChatBox from "./Chatbox";

type MessageFormData = {
  text: string;
  createdAt: number;
  attachment: {
    type: string;
    url: string;
  } | null;
};

const Chat = (): ReactElement => {
  const [text, setText] = useState<string>("");
  const { userInfo } = useAuth();
  const { sendMessage } = useChat();

  const handleSubmitMessage = (message: MessageFormData) => {
    if (userInfo) {
      sendMessage({
        ...message,
        sender: {
          uid: userInfo.uid,
          displayName: userInfo.displayName,
        },
      });
      setText("");
    }
  };

  const handleOnEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitMessage({
        text: text,
        createdAt: new Date().valueOf(),
        attachment: null,
      });
    }
  };

  return (
    <div className={"flex flex-col gap-2 h-[90vh] justify-center"}>
      <header className={`flex flex-col gap-4`}>
        <div
          className={
            "flex flex-row bg-gray-100 gap-2 py-2 px-3 justify-between rounded-lg"
          }
        >
          <div className={"flex gap-2"}>
            {/* Avatar */}
            <div className={"w-10 h-10 rounded-full bg-gray-300"}>
              {userInfo?.avatar ? (
                <img
                  referrerPolicy={"no-referrer"}
                  src={userInfo?.avatar}
                  alt={userInfo?.displayName}
                  className={"w-full h-full rounded-full"}
                />
              ) : (
                <div
                  className={
                    "w-full h-full rounded-full flex justify-center items-center"
                  }
                >
                  <span className={"text-2xl font-bold text-black"}>
                    {userInfo?.displayName?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className={"flex flex-col justify-between"}>
              {/* Name */}
              <h4
                className={"text-base font-semibold text-ellipsis line-clamp-1"}
              >
                Group Chat
              </h4>
              {/* Status */}
              <span className={"text-xs text-gray-500"}>
                {userInfo?.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat box */}
      <ChatBox />
      {/* Chat input */}

      <div className={"flex flex-col gap-2"}>
        <div className={"flex flex-col gap-2 p-2 bg-gray-100 rounded-xl"}>
          <div
            className={
              "flex flex-row gap-2 bg-white items-center w-full rounded-xl"
            }
          >
            <input
              onKeyDown={handleOnEnterPress}
              autoFocus={true}
              placeholder={"Type a message..."}
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              className={
                "flex-1 py-2 px-3 rounded-lg border-none focus:outline-none focus:border-none"
              }
            />
            <button
              className={
                "mr-2 bg-white border border-gray-300 hover:bg-gray-300 hover:bg-gray-300"
              }
              onClick={() => {
                handleSubmitMessage({
                  text: text,
                  createdAt: new Date().valueOf(),
                  attachment: null,
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
