import {
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "utils";

interface IUser {
  displayName: string;
  status: string | "online";
  uid: string;
  createdAt: string;
  avatar?: string;
  email?: string;
}

const useAuth = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async (displayName: string) => {
    return new Promise<IUser>((resolve, reject) => {
      signInAnonymously(auth)
        .then((userCredential) => {
          const userRef = doc(db, "users", userCredential.user.uid);
          updateProfile(userCredential.user, {
            displayName: displayName,
          }).then(() => {
            setDoc(userRef, {
              displayName: displayName,
              uid: userCredential.user.uid,
              createdAt: new Date().toISOString(),
              status: "online",
              avatar: userCredential.user.photoURL,
              email: userCredential.user.email,
            }).then(() => {
              getDoc(userRef).then((doc) => {
                if (doc.exists()) {
                  setUserInfo(doc.data() as IUser);
                  resolve(doc.data() as IUser);
                } else {
                  setUserInfo(null);
                }
              });
            });
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setUserInfo(null);
    });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setUserInfo(doc.data() as IUser);
            setLoading(false);
          } else {
            setLoading(false);
            setUserInfo(null);
          }
        });
      } else {
        setLoading(false);
        setUserInfo(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    userInfo,
    signIn,
    signOut,
    loading,
  };
};

export { useAuth };
export type { IUser };
