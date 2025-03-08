import { LoginBody, Responsive, UserResponsive } from "@/Interfaces/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Toast, useMutation } from "componentsla";
import axios from "axios";
import { env } from "@/Config/Env";
import { useNavigate } from "react-router";

type UserContextType = {
  user: UserResponsive | null;
  login: (user: LoginBody) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserResponsive | null>(null);
  const navigate = useNavigate();
  const { mutate, data } = useMutation<Responsive<UserResponsive>, LoginBody>({
    mutationFn: async (user: LoginBody) => {
      const res = await axios.post(`${env.urlBackNest}/auth/login`, user);

      return res.data;
    },
    onSuccess: () => {
      Toast.success("Login successfully");
      navigate("/");
    },
    onError: () => {
      Toast.error("Login failed");
    },
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.body));
      setUser(data.body);
    }
  }, [data]);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  const login = (user: LoginBody) => {
    mutate(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
}
