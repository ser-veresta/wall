import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import TextField from "../components/utils/TextField";
import { Link, useParams } from "react-router-dom";
import { Button } from "../styles";
import { resetPasswordUser } from "../redux/ducks/user";

const validationSchema = yup.object({
  password: yup.string().min(6, "Password should be of minimum 6 characters length").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm your password"),
});

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { resetToken } = useParams();

  const handleSubmit = (values, { resetForm }) => {
    const { password } = values;

    dispatch(resetPasswordUser({ resetToken, password }));
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <div className="min-h-[calc(90vh-65px)] flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg w-3/12 p-8">
        <h3 className="text-3xl text-center">Reset Password</h3>
        <form
          className="flex flex-col gap-3 mt-6 w-full m-auto justify-center items-center"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
        >
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
          <Link to="/" className="underline font-semibold w-full mb-2">
            Go Back
          </Link>
          <Button className="!text-lg" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
