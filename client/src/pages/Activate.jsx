import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { activateUser } from "../redux/ducks/user";

const Activate = () => {
  const { activateToken } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activateUser(activateToken));
  }, [dispatch, activateToken]);

  return (
    <div className="min-h-[calc(90vh-65px)] flex justify-center items-center">
      <div className="flex flex-col gap-3 items-center justify-center">
        <h1>Account activation taking place...Please wait.</h1>
        <Link className="underline font-semibold" to="/">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Activate;
