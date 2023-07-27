import { ReactNode, createContext, useEffect, useState } from "react";
import { auth, database } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

type Props = {
  userId: string;
  setUserId:  React.Dispatch<React.SetStateAction<string>>;
  user: UserProps | undefined;
}

export type UserProps = {
  username: string;
  avatar_url: string;
}

type PropsProvider = {
  children: ReactNode;
}

export const Context = createContext({} as Props);

export function Provider({ children } : PropsProvider) {
  const [userId, setUserId] = useState(String);
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    if (userId) {
      const docRef = doc(database, 'users', userId);
      const unsubscribe = onSnapshot(docRef, querySnapshot => {
        const data = querySnapshot.data() as UserProps;
        if (data) {
          setUser(data);
        }
      });
      return unsubscribe;
    }
  }, [userId]);
  
  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        user,
      }}
    >
      { children }
    </Context.Provider>
  );
}