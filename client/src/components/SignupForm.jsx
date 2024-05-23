import { Formik, Form } from "formik";
import Button from "./Button";
import InputForm from "./InputForm";
import useSignup from "../hooks/useSignup";
import { signupValidation } from "../utils/Validations";

function SignupForm() {
  const { isLoading, registerUser } = useSignup();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const submitForm = (values) => {
    registerUser(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupValidation}
      onSubmit={submitForm}
    >
      <Form className="grid gap-2">
        <InputForm
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Full Name"
        />
        <InputForm label="Email" type="mail" name="email" placeholder="Email" />
        <InputForm
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <InputForm
          label="Confirm Password"
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
        />

        <Button type="submit" className="bg-blue-600 mt-5 text-white">
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </Form>
    </Formik>
  );
}

export default SignupForm;
