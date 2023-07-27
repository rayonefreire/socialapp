import { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { User, onAuthStateChanged } from "firebase/auth";

import { auth } from "../../config/firebase";

import { HomeRoutes } from './home.routes';
import { AuthRoutes } from './auth.routes';
import { Context } from '../context';

export function RoutesApp() {
  const [user, setUser] = useState<User>();
  const { setUserId } = useContext(Context);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      { user ? <HomeRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  );
}