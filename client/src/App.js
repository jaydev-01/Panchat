import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Panchat from "./components/panchatForm";
import Chatroom from "./components/Chatroom"

// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import { nanoid } from "nanoid";

// const socket = io.connect("http://localhost:3032");
// const userName = nanoid(4);

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Chatroom />} />
        <Route exact path="/login" element={<Panchat type='login' />} />
        <Route exact path="/sign-up" element={<Panchat type='signup' />} />
        <Route exact path="/forget-password" element={<Panchat type='forgetpassword' />} />
        <Route exact path="/upload-profile" element={<Panchat type='profile' />} />
        <Route exact path="/reset-password" element={<Panchat type='reset' />} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
