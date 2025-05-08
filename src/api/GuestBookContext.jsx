import React, { createContext, useState, useEffect } from "react";

export const GuestbookContext = createContext();

export const GuestbookProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  // Fetch
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("guestbookEntries"));
    if (storedEntries) {
      setEntries(storedEntries);
    }
  }, []);

  // Save
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("guestbookEntries", JSON.stringify(entries));
    }
  }, [entries]);

  return (
    <GuestbookContext.Provider value={{ entries, setEntries }}>
      {children}
    </GuestbookContext.Provider>
  );
};
