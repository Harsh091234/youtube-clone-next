import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { provider, auth } from "../lib/firebase";
import axiosInstance from "../lib/axiosInstance";

interface User {
  _id?: string;
  name: string;
  email: string;
  image: string;
}

interface UserContextType {
  user: User | null;
  login: (userdata: User) => void;
  logout: () => Promise<void>;
  handlegooglesignin: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userdata: User): void => {
    setUser(userdata);
    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem("user");

    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const handlegooglesignin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseuser: FirebaseUser = result.user;

      const payload = {
        email: firebaseuser.email!,
        name: firebaseuser.displayName!,
        image: firebaseuser.photoURL || "https://github.com/shadcn.png",
      };

      const response = await axiosInstance.post("/user/login", payload);

      login(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseuser: FirebaseUser | null) => {
        if (firebaseuser) {
          try {
            const payload = {
              email: firebaseuser.email!,
              name: firebaseuser.displayName!,
              image:
                firebaseuser.photoURL || "https://github.com/shadcn.png",
            };

            const response = await axiosInstance.post(
              "/user/login",
              payload
            );

            login(response.data.result);
          } catch (error) {
            console.error(error);
            await logout();
          }
        }
      }
    );

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, logout, handlegooglesignin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};