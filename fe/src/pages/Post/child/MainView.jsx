import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { constants as c } from "../../../constants";
import { postActions as a } from "../../../actions/postActions";
import Loading from "./Loading";
import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";
export default function MainView(props) {
  const dispatch = useDispatch();

  //store
  const info = useSelector(state => state.post.info);
  const user = useSelector(store => store.authentication.user);
  const comments = useSelector(state => state.post.info.data.comments);

  const frames = {
    rook: "/img/9csaYrM.png",
    bishop: "/img/XAXA03P.png",
    knight: "/img/Lwsg9sd.png",
    pawn: "/img/f1qYFeh.png"
  }

  function handleLike() {
    if (user && info.data.like.indexOf(user._id) !== -1)
      return;
    dispatch(a.likePost(props.id));
  }

  function handleDislike() {
    if (user && info.data.dislike.indexOf(user._id) !== -1)
      return;
    dispatch(a.dislikePost(props.id));
  }

  useEffect(() => {
    console.log(info);
    if (info.status === c.LOADING)
      dispatch(a.getPostById(props.id));
    else {
      document.title = info.data.title
    }
  }, [info])

  return (
    <div className="main-view show_flex">
      {
        info.status === c.SUCCESS
          ?
          <>
            <div>
              <div className="main-view__post__avt">
                <img src={frames[info.data.user.badge]} alt="" />
                {info.data.user.name[0]}
              </div>
              <div className="main-view__post__action">
                <span
                  onClick={handleLike}
                >
                  <i
                    style={
                      user && info.data.like.indexOf(user._id) !== -1
                        ?
                        {
                          color: "rgb(210, 210, 210)"
                        }
                        :
                        {}
                    }
                    className="fas fa-caret-up"></i>
                </span>
                <p>
                  {info.data.like.length - info.data.dislike.length}
                </p>
                <span onClick={handleDislike}>
                  <i
                    style={
                      user && info.data.dislike.indexOf(user._id) !== -1
                        ?
                        {
                          color: "rgb(210, 210, 210)"
                        }
                        :
                        {}
                    }
                    className="fas fa-caret-down"></i>
                </span>
              </div>
            </div>
            <div>
              <h3>{info.data.title}</h3>
              <div className="show_flex">
                <span>Tác giả: </span>
                &nbsp;
                <label>
                  {info.data.user.name}
                </label>
                &nbsp;
                <span>vào {info.data.date}</span>
              </div>
              <div className="content" dangerouslySetInnerHTML={{ __html: info.data.content }}>
              </div>
              <div className="main-view__comments">
                <h4>{info.data.comments.length} Bình luận</h4>
                <CommentInput id={props.id} />
                {
                  comments
                  && comments.length > 0
                  && info.data.comments.map((v) => <CommentCard {...v} key={v._id} />)
                }
              </div>
            </div>
          </>
          : <Loading />
      }
    </div>
  )
}