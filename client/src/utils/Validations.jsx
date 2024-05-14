import * as Yup from "yup";

export const signupValidation = Yup.object({
  fullName: Yup.string().min(3).required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password is too short - should be 4 chars minimum")
    .max(10)
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginValidation = Yup.object({
  email: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required").min(4).max(10),
});
