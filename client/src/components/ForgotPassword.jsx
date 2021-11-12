import { useDispatch } from "react-redux";
import { setOpen } from "../redux/ducks/modal";
import { forgotPasswordUser } from "../redux/ducks/user";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, IconButton } from "../styles";
import { XIcon } from "@heroicons/react/outline";
import TextField from "./utils/TextField";

const validationSchema = yup.object({
  email: yup.string("Should be characters").email("Enter a valid email").required("Username is required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { email } = values;

    dispatch(forgotPasswordUser(email));
    resetForm();
    dispatch(setOpen({ open: false, type: "" }));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
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
      <form
        className="flex flex-col gap-3 mt-3 w-10/12 m-auto justify-center items-center"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
        <p
          onClick={() => dispatch(setOpen({ open: true, type: "register" }))}
          className="underline font-semibold w-full cursor-pointer mb-2"
        >
          Don't have an account?
        </p>
        <Button className="!text-lg" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default ForgotPassword;
