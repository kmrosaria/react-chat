import { Message as MessageInterface, User } from "utils";

type MessageType = {
  message: MessageInterface;
  user: User | undefined;
};

const style = {
  message: `flex items-center shadow-lg m-3
     py-2 px-3 rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-55px] ml-[-10px]
         text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse 
         text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black
             float-left rounded-br-full`,
};

const Message = ({ message, user }: MessageType) => {
  if (!user) {
    return;
  }

  const messageClass =
    message.sender.uid === user.uid ? `${style.sent}` : `${style.received}`;

  return (
    <div className="relative">
      <div
        className={`${style.message} 
      ${messageClass}`}
      >
        <p className={style.name}>{message.sender.displayName}</p>

        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
