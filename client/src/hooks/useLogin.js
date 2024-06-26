import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import Instance from "../api/axios";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const loginUser = async (value) => {
    try {
      setIsLoading(true);

      const { data, status } = await Instance.post("/login", value);

      if (status === 200) {
        toast.success(data.message);
        login(data.token, data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, loginUser };
};

export default useLogin;
