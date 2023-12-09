import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const isAuthenticated = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === null) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export default useAuthCheck;
