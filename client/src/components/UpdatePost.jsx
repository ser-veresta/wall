import { XIcon } from "@heroicons/react/outline";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton } from "../styles";
import * as yup from "yup";
import { setOpen } from "../redux/ducks/modal";
import TextField from "./utils/TextField";
import { updatePost } from "../redux/ducks/posts";

const validationSchema = yup.object({
  title: yup.string().required("title is required"),
  message: yup.string().required("message is required"),
  tags: yup.string().required("Enter atleast one tag"),
  image: yup.string(),
});

const UpdatePost = () => {
  const dispatch = useDispatch();
  const { currentId, posts } = useSelector((state) => state.postsReducer);

  const post = posts.filter((ele) => ele._id === currentId)[0];

  const handleSubmit = (values, { resetForm }) => {
    const { title, message, tags, image } = values;

    const newPost = { ...post, title, message, tags: tags.split(","), image };

    dispatch(updatePost(newPost));
    resetForm();
    dispatch(setOpen({ open: false, type: "" }));
  };

  const formik = useFormik({
    initialValues: {
      title: post.title,
      message: post.message,
      tags: post.tags.join(","),
      image: post.image,
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
      <h3 className="text-3xl text-center mt-3">Update Post</h3>
      <form
        className="flex flex-col gap-3 mt-3 w-10/12 m-auto justify-center items-center"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.touched.title && formik.errors.title}
        />
        <TextField
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          error={formik.touched.message && formik.errors.message}
        />
        <TextField
          name="tags"
          onChange={formik.handleChange}
          value={formik.values.tags}
          error={formik.touched.tags && formik.errors.tags}
        />
        <TextField
          name="image"
          onChange={formik.handleChange}
          value={formik.values.image}
          error={formik.touched.image && formik.errors.image}
        />
        <Button disabled={formik.isSubmitting} className="!text-lg" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default UpdatePost;
