import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="h-screen grid grid-cols-1 grid-rows-[70px_1fr]" >
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
