import { useAuth, useChat } from "hooks";
import { useEffect, useRef } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./Message";

const ChatBox = () => {
  const { userInfo } = useAuth();
  const { messages, fetchNext, hasMore, scrollToLatest } = useChat();
  const messagesRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollToLatest) {
      messagesRef.current?.firstElementChild?.scrollIntoView();
    }
  }, [scrollToLatest, messages]);

  return (
    <div
      id="scrollableDiv"
      className={`flex flex-col-reverse h-[100vh] overflow-auto w-[500px]`}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchNext}
        hasMore={hasMore}
        loader={<p className="text-center m-5">Loading...</p>}
        endMessage={
          <p className="text-center m-5">{`${
            messages.length === 0 ? `Start conversation` : `End of conversation`
          }`}</p>
        }
        className="flex flex-col-reverse"
        style={{ overflow: `visible` }}
        scrollableTarget="scrollableDiv"
        inverse={true}
      >
        <div
          ref={messagesRef}
          className="flex flex-col-reverse overflow-visible"
        >
          {messages &&
            messages.map((msg) => (
              <Message
                key={`message-${msg.createdAt}`}
                message={msg}
                user={userInfo}
              />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ChatBox;
