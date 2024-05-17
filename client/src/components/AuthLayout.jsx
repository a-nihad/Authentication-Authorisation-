import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-300 ">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
