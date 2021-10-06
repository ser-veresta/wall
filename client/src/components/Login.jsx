import { XIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setOpen } from "../redux/ducks/modal";
import { loginUser } from "../redux/ducks/user";
import { Button, IconButton } from "../styles";
import TextField from "./utils/TextField";

const validationSchema = yup.object({
  name: yup.string("Should be characters").min(4, "Should be min of 4 characters").required("Name is required"),
});

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { name } = values;

    dispatch(loginUser(name));
    resetForm();
    dispatch(setOpen({ open: false, type: "" }));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
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
          name="name"
          type="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
        />
        <Button className="!text-lg" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
