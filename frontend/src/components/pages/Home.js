import React from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import TaskBoard from "./TaskBoard";
import NavBar from "../utils/NavBar";
import "./Home.css";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div className="unlogin">
          <button className="unlogin-btn" onClick={handleLoginClick}>
            Login
          </button>
          <button className="unlogin-btn" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      ) : (
        <>
          <div>
            <TaskBoard />
            <NavBar />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
