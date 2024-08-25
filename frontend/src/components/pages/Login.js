import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../store/auth";
import NavBar from "../utils/NavBar";


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const { isLoggedIn, saveTokenInLocalStr } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const currentUrl = window.location.href;
  ////console.log(currentUrl);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const responseData = await response.json();
        saveTokenInLocalStr(responseData.token);
        navigate("/");
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMsg(responseData.msg);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      //console.log(error);
      setErrorMsg("Service is down....try again later");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        navigate("/")
      ) : (
        <div className="full-page">
          <NavBar />
          <div className="login-container">
            <div className="form-header">
              <h1>Login</h1>
            </div>
            <form onSubmit={handleFormSubmit} className="login-form">
              <div className="form-group">
                {/* <label htmlFor="email">Email</label> */}
                <input
                  type="text"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required // Added required attribute for better UX
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="password">Password</label> */}
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Password "
                  required // Added required attribute for better UX
                />
              </div>
              {errorMsg && <p className="error-message">{errorMsg}</p>}
              <button type="submit" className="submit-button">
                Login Now
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
