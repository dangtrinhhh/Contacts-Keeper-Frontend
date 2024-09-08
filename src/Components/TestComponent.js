import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from '../Context/AuthProvider';

const TestComponent = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const login = () => {
    const newUserData = { user: { name: "Test User" }, accessToken: "testToken" };
    console.log("🚀 ~ Logging in with data:", newUserData);
    setAuth(newUserData);  // Call setAuth
  };

  console.log("🚀 ~ Current auth state in TestComponent:", auth);

  return (
    <div>
      <button onClick={login}>Login</button>
      <div>Current Auth: {JSON.stringify(auth)}</div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <TestComponent />
  </AuthProvider>
);

export default App;