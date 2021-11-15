import Login from "../Login";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../../redux/ducks/modal";
import CreatePost from "../CreatePost";
import UpdatePost from "../UpdatePost";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";

const Modal = () => {
  const { open, type } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  return (
    <div className={open ? "block" : "hidden"}>
      <div
        onClick={(e) => e.target.classList.contains("bg-black") && dispatch(setOpen({ open: false, type: "" }))}
        className="bg-black bg-opacity-50 fixed top-0 bottom-0 left-0 right-0 h-full flex justify-center items-center"
      >
        <div className="bg-primary-light p-4 lg:w-1/4 md:w-1/3 w-2/3 rounded-md shadow-sm">
          {type === "login" && <Login />}
          {type === "register" && <Register />}
          {type === "forgotPassword" && <ForgotPassword />}
          {type === "createPost" && <CreatePost />}
          {type === "updatePost" && <UpdatePost />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
