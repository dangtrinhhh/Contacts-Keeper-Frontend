import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const user_data = JSON.parse(localStorage.getItem("auth"));

        if (user_data?.user) {
            localStorage.setItem("user_data", JSON.stringify(user_data.user));
        }
            
        return user_data ? user_data : {}; // Only init auth when first mount
    });

    console.log("🚀 ~ AuthProvider ~ auth state:", auth);

    useEffect(() => {
        const user_data = JSON.parse(localStorage.getItem("auth"))?.user;
        console.log("🚀 ~ auth state accessed in useAuth:", auth); // This should log when 'auth' is accessed

        // No state setting or logic for handling auth state here.
        // Only AuthProvider should handle auth state changes.
        console.log("🚀 ~ auth state changed:", auth); // This should log when 'auth' changes
        // const user_data = JSON.parse(localStorage.getItem("user_data"));

        if (auth?.user) {
            console.log("🚀 ~ User is logged in. Saving to localStorage:", auth.user);
            localStorage.setItem("auth", JSON.stringify(auth));
            localStorage.setItem("user_data", JSON.stringify(auth.user));
        }
        // else if (user_data) {
        //     console.log("🚀 ~ User logged in. Getting data from from localStorage.");
        // } else {
        //     console.log("🚀 ~ No user found. Removing from localStorage.");
        //     localStorage.removeItem("user_data");
        // }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
