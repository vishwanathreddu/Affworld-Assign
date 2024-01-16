import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SecretForm from "./components/SecretForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/secret-form" element={<SecretForm />} />
        {/* <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/post-secret" component={SecretForm} /> */}
      </Routes>
    </>
  );
}

export default App;
