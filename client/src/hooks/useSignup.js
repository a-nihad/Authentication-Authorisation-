import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const registerUser = async (value) => {
    try {
      setIsLoading(true);

      const { data, status } = await axios.post(
        "http://localhost:8000/api/signup",
        value
      );

      if (status === 201) {
        toast.success(data.message);
        login(data.token, data.user);
        navigate("/");
      }
    } catch (err) {
      toast.error("Registration faild ");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, registerUser };
};

export default useSignup;
