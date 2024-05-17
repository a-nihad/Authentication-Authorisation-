import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";

function Header() {
  const { userData } = useAuth();
  return (
    <header className="bg-blue-500 text-white px-10 py-5 flex justify-between items-center">
      <h1 className="uppercase"> Hello {userData?.fullName} </h1>
      <Logout />
    </header>
  );
}

export default Header;
