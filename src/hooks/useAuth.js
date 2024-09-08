import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  const { auth, setAuth } = context;

  return { auth, setAuth };
};

export default useAuth;

// const useAuth = () => {
//   const { auth, setAuth } = useContext(AuthContext);

//   useEffect(() => {
//     console.log("🚀 ~ auth state changed:", auth);

//     if (auth?.user) {
//       console.log("🚀 ~ User is logged in. Saving to localStorage:", auth.user);
//       localStorage.setItem("user_data", JSON.stringify(auth.user));
//     } else {
//       console.log("🚀 ~ No user found. Removing from localStorage.");
//       localStorage.removeItem("user_data");
//     }
//   }, [auth]); // Re-run effect when 'auth' changes

//   useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

//   return { auth, setAuth };
// };


// import { useContext, useDebugValue } from "react";
// import AuthContext from "../Context/AuthProvider";

// const useAuth = () => {
//     const { auth } = useContext(AuthContext);
//     console.log("🚀 ~ auth:", auth)

//     if (auth.user) {
//         // Save access token and user data to localStorage
//         // localStorage.setItem('access_token', response.data.accessToken);
    
//         localStorage.setItem('user_data', JSON.stringify(auth.user));
//     }

//     useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
//     return useContext(AuthContext);
// }

// export default useAuth;