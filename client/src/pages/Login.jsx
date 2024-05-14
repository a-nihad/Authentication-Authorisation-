import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="w-80 text-center flex flex-col gap-2 ">
      <span className="flex justify-center mb-5 text-blue-500">
        <FaRegUser size={55} />
      </span>

      <h1 className="text-2xl font-semibold"> Hello Again! </h1>
      <h2 className="text-slate-500 text-sm"> Sign in to your Account </h2>

      <LoginForm />

      <p className="text-slate-500 text-sm">
        Don't have an account yet?
        <NavLink className="text-blue-500 underline pl-2" to="/signup">
          Sign up
        </NavLink>
      </p>
    </div>
  );
}

export default Login;
