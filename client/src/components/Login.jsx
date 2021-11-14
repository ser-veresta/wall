import { XIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setOpen } from "../redux/ducks/modal";
import { loginUser } from "../redux/ducks/user";
import { Button, IconButton } from "../styles";
import TextField from "./utils/TextField";

const validationSchema = yup.object({
  username: yup.string("Should be characters").required("Username is required"),
  password: yup
    .string("Should be characters")
    .min(6, "Should be of min 6 characters.")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { username, password } = values;

    dispatch(loginUser({ username, password }));
    resetForm();
    dispatch(setOpen({ open: false, type: "" }));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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
      <h3 className="text-3xl text-center mt-3">Login</h3>
      <div className="p-6 bg-gray-200 flex flex-col rounded-lg">
        <p>Test User</p>
        <p>username: test</p>
        <p>password: 123123</p>
      </div>
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
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <p
          onClick={() => dispatch(setOpen({ open: true, type: "register" }))}
          className="underline font-semibold w-full cursor-pointer"
        >
          Don't have an account?
        </p>
        <p
          onClick={() => dispatch(setOpen({ open: true, type: "forgotPassword" }))}
          className="underline font-semibold w-full cursor-pointer mb-2"
        >
          Forgot Password?
        </p>
        <Button className="!text-lg" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
