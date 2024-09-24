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

    useEffect(() => {
        // No state setting or logic for handling auth state here.
        // Only AuthProvider should handle auth state changes.

        if (auth?.user) {
            // User is logged in. Saving to localStorage
            localStorage.setItem("auth", JSON.stringify(auth));
            localStorage.setItem("user_data", JSON.stringify(auth.user));
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
