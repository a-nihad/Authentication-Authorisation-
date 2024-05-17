import { useAuth } from "../context/AuthContext";

function Logout() {
  const { logout } = useAuth();
  return (
    <button
      className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full hover:scale-105"
      onClick={logout}
    >
      Logout
    </button>
  );
}

export default Logout;
