import Button from "../components/Button";
import DisplayUser from "../components/DisplayUser";
import { useAuth } from "../context/AuthContext";
import useUsers from "../hooks/useUsers";

function Dashboard() {
  const { userData } = useAuth();
  const { isLoading, getUsers, users } = useUsers();
  return (
    <div className="w-screen h-full grid grid-cols-[.8fr_1fr]">
      <div className="flex flex-col gap-5 justify-center px-28">
        <h1 className="text-lg font-semibold leading-normal text-slate-500 ">
          <span className="text-3xl text-black">
            Hello {userData.fullName},
          </span>
          <br />
          Welcome to
          <span className="text-blue-500 pl-3">
            Authentication and Authorisation
          </span>
          <br />
          Email :- {userData.email} <br />
          Role :- {userData.role}
        </h1>
        <Button
          className="bg-blue-500 w-max px-10 text-white"
          onClick={getUsers}
        >
          Get Users
        </Button>
      </div>
      <DisplayUser users={users} />
    </div>
  );
}

export default Dashboard;
