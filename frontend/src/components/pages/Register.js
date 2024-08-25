import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import NavBar from "../utils/NavBar"; // Import NavBar

const Register = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState([]);
  const [doubleCheckPassword, setDoubleCheckPassword] = useState(""); // Correct password confirmation state
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handlePasswordConfirmation = (e) => {
    setDoubleCheckPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== doubleCheckPassword) {
      setErrorMsg(["Passwords do not match."]);
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Registration successful");
        setUser({ firstname: "", lastname: "", email: "", password: "" });
        navigate("/");
      } else if (response.status === 400) {
        const responseData = await response.json();
        setErrorMsg(responseData.msg); // Set the error message from the backend
      } else {
        ////console.log("Error inside response");
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
      //console.log("checking pass", doubleCheckPassword == user.password);
    } catch (err) {
      // console.err("Error", err);
      setErrorMsg("An error occurred while registering. Please try again later.");
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
              <h1>Registration Form</h1>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInput}
                  placeholder="Fisrt Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInput}
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={doubleCheckPassword}
                  onChange={handlePasswordConfirmation}
                  placeholder="Confirm Password"
                />
              </div>
              {/* {errorMsg && <p className="error-message">{errorMsg}</p>} */}
              {errorMsg.length > 0 && (
                <ul className="error-message">
                  {errorMsg.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
              <button type="submit" className="submit-button">
                Register Now
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
