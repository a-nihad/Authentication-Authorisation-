import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <div className="w-80 text-center flex flex-col gap-2 ">
      <span className="flex justify-center mb-5 text-blue-500">
        <FaRegUser size={55} />
      </span>

      <h1 className="text-2xl font-semibold"> Create an account! </h1>
      <h2 className="text-slate-500 text-sm">
        Create an Account to access datas
      </h2>

      <SignupForm />

      <p className="text-slate-500 text-sm">
        Alredy have an account?
        <NavLink className="text-blue-500 underline pl-2" to="/">
          Login
        </NavLink>
      </p>
    </div>
  );
}

export default Signup;
