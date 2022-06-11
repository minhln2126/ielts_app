import { useDispatch, useSelector } from "react-redux";
import { postActions as a } from "../../../actions/postActions";
export default function CommentCard(props) {
  const dispatch = useDispatch();

  const profile = useSelector(store => store.authentication.user);

  const { user, content, like, dislike, date } = props;

  const frames = {
    rook: "/img/9csaYrM.png",
    bishop: "/img/XAXA03P.png",
    knight: "/img/Lwsg9sd.png",
    pawn: "/img/f1qYFeh.png"
  }

  function handleLike() {
    if (profile && like.indexOf(profile._id) !== -1)
      return;
    dispatch(a.likeComment(props._id));
  }

  function handleDislike() {
    if (profile && dislike.indexOf(profile._id) !== -1)
      return;
    dispatch(a.dislikeComment(props._id));
  }

  return (
    <div className="comment-card">
      <div>
        <div className="avt">
          <img src={frames[user.badge]} alt="" />
          {user.name[0]}
        </div>
        <div className="action">
          <span onClick={handleLike}>
            <i
              style={
                profile && like.indexOf(profile._id) !== -1
                  ?
                  {
                    color: "rgb(210, 210, 210)"
                  }
                  :
                  {}
              }
              className="fas fa-caret-up"></i>
          </span>
          <p>{like.length - dislike.length}</p>
          <span onClick={handleDislike}>
            <i
              style={
                profile && dislike.indexOf(profile._id) !== -1
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
        <span>
          {user.name}
        </span>
        &nbsp;
        <label>vào {date}</label>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }}>
        </div>
      </div>
    </div>
  )
}