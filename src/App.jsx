import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/AdminLogin";
import GuestForm from "./pages/GuestForm";
import AdminData from "./pages/AdminData";
import { GuestbookProvider } from "./api/GuestBookContext.jsx";
import { ToastContainer } from "react-toastify";

const AppRouter = () => {
  return (
    <GuestbookProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GuestForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/guestbook" element={<AdminData />} />
          
          <Route path="*" element={<div>Routes Not Found!</div>} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </GuestbookProvider>
  );
};

export default AppRouter;
