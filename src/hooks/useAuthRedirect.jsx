import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("grahamUser");

    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
};

export default useAuthRedirect;
