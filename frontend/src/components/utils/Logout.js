import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    LogoutUser();
    navigate("/login");
  }, [LogoutUser, navigate]);

  return null; // No need to render anything
};

export default Logout;
