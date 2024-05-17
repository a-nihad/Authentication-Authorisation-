import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function InputForm({ label, name, type, ...rest }) {
  const [show, setShow] = useState(false);
  const inputType = show ? "text" : type || "text";

  return (
    <div className="flex flex-col items-start relative">
      <label className="text-slate-500 text-sm pl-3" htmlFor={name}>
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={inputType}
        {...rest}
        className="border w-full rounded-lg px-3 py-2 outline-blue-500"
      />

      {/* Password show or hide */}
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-5 top-8 text-slate-500"
      >
        {type === "password" ? (
          show ? (
            <FaRegEyeSlash size={20} />
          ) : (
            <FaRegEye size={20} />
          )
        ) : (
          ""
        )}
      </button>

      <span className="text-red-500 text-xs pl-3">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
}

export default InputForm;
