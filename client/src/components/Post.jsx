import { ArrowCircleUpIcon, ArrowCircleDownIcon, TrashIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import { ArrowCircleDownIcon as ArrowSolidDown, ArrowCircleUpIcon as ArrowSolidUp } from "@heroicons/react/solid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/ducks/modal";
import { deletePost, likePost, setId } from "../redux/ducks/posts";
import { IconButton } from "../styles";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  return (
    <section className="bg-primary-dark flex items-start rounded-md shadow-md">
      <div className="p-2 flex flex-col items-center">
        <IconButton onClick={() => dispatch(likePost(post._id, "incre"))}>
          {!post.voteId?.incre.includes(user.name) ? (
            <ArrowCircleUpIcon className="h-7 w-7" />
          ) : (
            <ArrowSolidUp className="h-7 w-7" />
          )}
        </IconButton>
        <p className={post.vote < 0 ? "text-lg text-red-700" : "text-lg"}>{Math.abs(post.vote)}</p>
        <IconButton onClick={() => dispatch(likePost(post._id, "decre"))}>
          {!post.voteId?.decre.includes(user.name) ? (
            <ArrowCircleDownIcon className="h-7 w-7" />
          ) : (
            <ArrowSolidDown className="h-7 w-7" />
          )}
        </IconButton>
      </div>
      <div className="p-2">
        <div className="flex items-end gap-2 mb-2">
          <h4 className="md:text-2xl text-xl capitalize font-semibold">{post.title}</h4>
          <h6 className="font-semibold text-sm text-secondary-text">
            Posted by{" "}
            <span className="text-primary-text text-xs sm:text-base cursor-pointer hover:brightness-125">
              {post.createdBy}
            </span>
          </h6>
          <h6 className="font-semibold text-xs sm:text-sm text-secondary-text">{moment(post.createdAt).fromNow()}</h6>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {post.tags.map((tag, i) => (
              <p
                key={i}
                className="px-1.5 py-0.5 text-xs rounded-xl bg-primary-light hover:brightness-75 cursor-pointer"
              >
                {tag}
              </p>
            ))}
          </div>
          <p>{post.message}</p>
          {post.image && (
            <div className="rounded-md overflow-hidden w-1/2">
              <img src={post.image} alt={post.title} />
            </div>
          )}
        </div>
        {post.createdBy === user.name && (
          <div className="h-7 flex gap-4 items-start my-2 ml-6">
            <IconButton onClick={() => dispatch(deletePost(post._id))}>
              <TrashIcon className="w-7 h-7" />
            </IconButton>
            <IconButton>
              <DotsVerticalIcon
                onClick={() => {
                  dispatch(setId(post._id));
                  dispatch(setOpen({ open: true, type: "updatePost" }));
                }}
                className="w-7 h-7"
              />
            </IconButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default Post;
