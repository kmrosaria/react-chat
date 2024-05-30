import {
  DocumentData,
  QuerySnapshot,
  // addDoc,
  collection,
  doc,
  // getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Message, db } from "utils";

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastKey, setLastKey] = useState<number>(0);
  const [scrollToLatest, setScrollToLatest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    initMessages();
  }, []);

  const initMessages = () => {
    const transformData = (snapshot: QuerySnapshot<DocumentData>) => {
      const data: Message[] = [];
      snapshot.forEach((document) => {
        const msg = document.data() as Message;
        data.push(msg);
        setLastKey(msg.createdAt);
      });

      setMessages(data);
      setScrollToLatest(true);
      setLoading(false);
      data.length > 0 ? setHasMore(true) : setHasMore(false);
    };
    const messageRef = query(
      collection(db, "chats2"),
      orderBy("createdAt", "desc"),
      limit(15)
    );
    onSnapshot(messageRef, (snapshot) => {
      transformData(snapshot);
    });
  };

  const fetchNext = () => {
    setLoading(true);
    const transformData = (snapshot: QuerySnapshot<DocumentData>) => {
      const data: Message[] = [];
      snapshot.forEach((document) => {
        const msg = document.data() as Message;
        data.push(msg);
        setLastKey(msg.createdAt);
      });

      setMessages((messages) => [...messages, ...data]);
      setScrollToLatest(false);
      setLoading(false);
      data.length > 0 ? setHasMore(true) : setHasMore(false);
    };
    const messageRef = query(
      collection(db, "chats2"),
      orderBy("createdAt", "desc"),
      startAfter(lastKey),
      limit(10)
    );
    onSnapshot(messageRef, (snapshot) => {
      transformData(snapshot);
    });
  };

  /**
   *
   * @param user User this is the user that is receiving the message
   * @param message the message that is being sent
   */
  const sendMessage = (message: Message) => {
    if (!message?.text) return;
    if (message?.text.trim().length === 0) {
      return;
    } else {
      const chatRef = collection(db, "chats2");
      setDoc(doc(chatRef), message)
        .then(() => {
          setScrollToLatest(true);
          console.log("message send");

          // getDocs(chatRef).then((snapshot) => {
          //   snapshot.forEach((item) => {
          //     const messageRef = collection(db, "chats2", item.id, "message");
          //     addDoc(messageRef, { message }).then(() => {
          //       console.log("message send");
          //       setScrollToLatest(true);
          //     });
          //   });
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return {
    sendMessage,
    fetchNext,
    messages,
    scrollToLatest,
    loading,
    lastKey,
    hasMore,
  };
};

export { useChat };
