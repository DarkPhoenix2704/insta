import * as Yup from "yup";

export const LoginValidator = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export const RegisterValidator = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  slug: Yup.string().required("Required"),
});
