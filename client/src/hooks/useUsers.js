import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { axiosPotect } from "../api/axios";

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const { token } = useAuth();
  const authInstence = axiosPotect(token);

  const getUsers = async () => {
    try {
      setIsLoading(true);

      const { data, status } = await authInstence.get("/users");

      if (status == 200) {
        setUsers(data.users);
      }
    } catch (err) {
      console.log(err);
      toast.error(`${err.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUsers, users };
};

export default useUsers;
