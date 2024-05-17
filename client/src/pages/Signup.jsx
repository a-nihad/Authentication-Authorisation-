import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <div className="w-[800px] grid grid-cols-2 bg-white p-5 rounded-3xl gap-5 ">
      <div className="text-center flex flex-col gap-2 p-5 ">
        <span className="flex justify-center mb-5 text-blue-400">
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

      <div className="flex items-center justify-center bg-blue-300 rounded-3xl h-full ">
        <img src="/signup.png" alt="signup" className="w-ful h-[450px]" />
      </div>
    </div>
  );
}

export default Signup;
