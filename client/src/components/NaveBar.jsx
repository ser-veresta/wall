import { useHistory } from "react-router-dom";
import { Button } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/ducks/modal";
import { logoutUser } from "../redux/ducks/user";

const NaveBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.userReducer);

  return (
    <>
      <header className="flex fixed w-full min-h-[60px] items-center justify-start py-2 bg-white shadow-md">
        <div
          onClick={() => history.push("/")}
          className="flex-grow ml-10 md:text-4xl sm:text-3xl text-xl cursor-pointer"
        >
          The Wall
        </div>
        {!user?.name ? (
          <>
            <div className="flex items-center gap-3 mr-2">
              <Button onClick={() => dispatch(setOpen({ open: true, type: "login" }))}>login</Button>
            </div>
            <div className="flex items-center gap-3 mr-5">
              <Button onClick={() => dispatch(setOpen({ open: true, type: "register" }))}>register</Button>
            </div>
          </>
        ) : (
          <>
            <p className="font-semibold text-xl mr-2">{user.name}</p>
            <div className="flex items-center gap-3 mr-5">
              <Button onClick={() => dispatch(logoutUser())}>logout</Button>
            </div>
          </>
        )}
      </header>
      <div className="min-h-[60px]"></div>
    </>
  );
};

export default NaveBar;
