import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { constants as c } from "../../../constants";
import { postActions as a } from "../../../actions/postActions";
import { appActions } from "../../../actions/appActions";
import Post from "./Post";
import Loading from "./Loading";
import NewPostForm from "./NewPostForm";
export default function MainView() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.list);
  const user = useSelector(store => store.authentication.user);
  const [currentForm, setCurrentForm] = useState("none");
  const forms = {
    none: <></>,
    post: <NewPostForm onClose={handleCloseForm} />
  };
  function handleCloseForm() {
    setCurrentForm("none");
  }
  function handleNewPostClick() {
    if (!user) {
      dispatch(appActions.changePopup(c.POPUP_LOGIN));
      return;
    }
    setCurrentForm("post");
  }
  useEffect(() => {
    if (posts.status === c.LOADING)
      dispatch(a.getAllPosts());
  }, []);
  return (
    <div className="main-view">
      <div className="filter">
        <button
          onClick={handleNewPostClick}
        >
          Bài viết mới &nbsp;
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="main-view__post-container">
        {
          posts.status === c.LOADING
            ? <Loading />
            :
            <>
              {
                posts.data.map((v) =>
                  <Post key={v._id} {...v} />
                )
              }
            </>
        }
      </div>
      {forms[currentForm]}
    </div>
  )
}