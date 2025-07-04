import React, { createContext, useState, useEffect } from "react";

export const GuestbookContext = createContext();

export const GuestbookProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // save login state in localstorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Fetch entry
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("guestbookEntries"));
    if (storedEntries) {
      setEntries(storedEntries);
    }
  }, []);

  // Save entry
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("guestbookEntries", JSON.stringify(entries));
    }
  }, [entries]);

  // Save login
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <GuestbookContext.Provider
      value={{ entries, setEntries, isLoggedIn, login, logout }}
    >
      {children}
    </GuestbookContext.Provider>
  );
};
