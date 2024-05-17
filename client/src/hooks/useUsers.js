import { useState } from "react";
import axios from "axios";

const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    try {
      setIsLoading(true);

      const { data, status } = await axios.get(
        "http://127.0.0.1:8000/api/users"
      );

      if (status == 200) {
        setUsers(data.users);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUsers, users };
};

export default useUsers;
