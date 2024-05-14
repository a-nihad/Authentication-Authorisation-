import { Formik, Form } from "formik";
import Button from "./Button";
import InputForm from "./InputForm";
import { loginValidation } from "../utils/Validations";

function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };

  const submitForm = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={submitForm}
    >
      <Form className="grid gap-3">
        <InputForm
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
        />
        <InputForm
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <Button type='submit' className="bg-blue-600 mt-5 text-white"> Login </Button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
