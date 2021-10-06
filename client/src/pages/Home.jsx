import { IconButton } from "../styles";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { getPosts } from "../redux/ducks/posts";
import { useEffect } from "react";
import { setOpen } from "../redux/ducks/modal";
import { getUser } from "../redux/ducks/user";

const Home = () => {
  const {
    postsReducer: { posts },
    userReducer: user,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.getItem("token") && dispatch(getUser());
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <div className="max-w-xs sm:max-w-sm md:max-w-screen-sm m-auto flex flex-col gap-5 min-h-[calc(100vh-60px)] pb-10">
        <section className="bg-primary-dark p-2 mt-3 rounded-md shadow-md flex gap-4 items-center justify-center">
          <IconButton className="!bg-opacity-0 px-1">
            <UserCircleIcon className="h-8 w-8" />
          </IconButton>
          <button
            disabled={!user.name}
            onClick={() => {
              dispatch(setOpen({ open: true, type: "createPost" }));
            }}
            className="w-9/12 py-2 px-4 capitalize rounded-[5px] text-left text-primary-text font-semibold bg-gray-50 cursor-text flex-grow mr-5"
          >
            {!user.name ? "login to create posts" : "create post"}
          </button>
        </section>
        {posts.map((ele, i) => (
          <Post key={ele._id || i} post={ele} />
        ))}
      </div>
    </>
  );
};

export default Home;
