import {
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { User, auth, db } from "utils";

const useAuth = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = async (displayName: string) => {
    return new Promise<User>((resolve, reject) => {
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
                  setUserInfo(doc.data() as User);
                  resolve(doc.data() as User);
                } else {
                  setUserInfo(undefined);
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
      setUserInfo(undefined);
    });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setUserInfo(doc.data() as User);
            setLoading(false);
          } else {
            setLoading(false);
            setUserInfo(undefined);
          }
        });
      } else {
        setLoading(false);
        setUserInfo(undefined);
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
