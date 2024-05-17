import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="w-[800px] grid grid-cols-2 bg-white p-5 rounded-3xl gap-8 ">
      <div className="flex items-center justify-center bg-blue-300 rounded-3xl h-full ">
        <img src="/login.png" alt="signup" className="w-ful h-[450px]" />
      </div>

      <div className="text-center flex flex-col gap-2 p-5 py-10">
        <span className="flex justify-center mb-5 text-blue-400">
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
    </div>
  );
}

export default Login;
