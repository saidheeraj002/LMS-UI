import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";  // Your existing login page
import Home from "./pages/Home";    // The new home page
import Cookies from 'js-cookie';
import ChatInterface from "./pages/Chat";

function App() {
  const [token, setToken] = useState(Cookies.get('authToken'));
  const [tokenExpiredMessage, setTokenExpiredMessage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('tokenExpired') === 'true') {
      setTokenExpiredMessage(true);
    } else {
      setTokenExpiredMessage(false);
    }
  }, [location.search]);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    Cookies.set('authToken', newToken, {secure: true, sameSite: "strict"});
  };

  const handleLogout = () => {
    setToken(null);
    Cookies.remove('authToken');
  };

  const memoizedToken = useMemo(() => token, [token])

  // useEffect (() => {
  //   const storedToken = Cookies.get('authToken');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, [])

  return (
      <div className="flex flex-col min-h-screen">
      {tokenExpiredMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Token Expired!</strong>
          <span className="block sm:inline"> Please log in again.</span>
        </div>
      )}
      <Routes>
        <Route path="/" element={memoizedToken  ? <Navigate to="/home"/> : <Login setToken={handleSetToken}/>} />
        <Route path="/home" element={memoizedToken  ? <Home token={memoizedToken } onLogout={handleLogout} /> : <Navigate to="/" />}/>
        <Route path="/chat" element={memoizedToken  ? <ChatInterface /> : <Navigate to="/" />}/>
      </Routes>
      </div>
  );
}

export default App;
