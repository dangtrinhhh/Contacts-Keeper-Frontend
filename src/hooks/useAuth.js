import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  const { auth, setAuth } = context;

  return { auth, setAuth };
};

export default useAuth;