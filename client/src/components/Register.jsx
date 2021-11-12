import { XIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setOpen } from "../redux/ducks/modal";
import { createUser } from "../redux/ducks/user";
import { Button, IconButton } from "../styles";
import TextField from "./utils/TextField";

const validationSchema = yup.object({
  username: yup.string().min(4, "Username should be of minimum 4 characters length").required("Username is required"),
  email: yup.string().email("Enter a valid Email").required("Email is required"),
  password: yup.string().min(6, "Password should be of minimum 6 characters length").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm your password"),
});

const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { username, password, email } = values;

    dispatch(createUser({ username, email, password }));
    resetForm();
    dispatch(setOpen({ open: false, type: "" }));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <>
      <IconButton
        onClick={() => dispatch(setOpen({ open: false, type: "" }))}
        className="block ml-auto bg-primary-dark"
      >
        <XIcon className="w-7 h-7" />
      </IconButton>
      <h3 className="text-3xl text-center mt-3">Register</h3>
      <form
        className="flex flex-col gap-3 mt-3 w-10/12 m-auto justify-center items-center"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && formik.errors.username}
        />
        <TextField
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <TextField
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <p
          onClick={() => dispatch(setOpen({ open: true, type: "login" }))}
          className="underline font-semibold w-full cursor-pointer mb-2"
        >
          Already have an account?
        </p>
        <Button className="!text-lg" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Register;
