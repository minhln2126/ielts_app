export default function Post(props) {
  const { title, dislike, like, content, view, user, comments, _id, date } = props;
  const frames = {
    rook: "/img/9csaYrM.png",
    bishop: "/img/XAXA03P.png",
    knight: "/img/Lwsg9sd.png",
    pawn: "/img/f1qYFeh.png"
  }
  function handleClick() {
    window.location.href = `/bai-viet/${_id}`;
  }
  console.log(user);
  return (
    <div className="post" onClick={handleClick}>
      <div className="show_flex w100">
        <div className="post__avt" >
          <img src={frames[user.badge]} alt="" />
          {user.name[0]}
        </div>
        <div className="post__main-info">
          <h4>{title}</h4>
          <div className="show_flex">
            <div className="show_flex">
              <p>Tác giả: </p>
              &nbsp;
              <span>{user.name}</span>
            </div>
            <div className="show_flex">
              <span><i className="far fa-calendar-alt"></i></span>
              &nbsp;
              <p>{date}</p>
            </div>
          </div>
        </div>
        <div className="show_flex post__counting">
          <div>
            <i className="fas fa-comments"></i>
            &nbsp; {comments.length}
          </div>
          <div>
            <i className="fas fa-eye"></i>
            &nbsp; {view}
          </div>
          <div>
            <i className="fas fa-thumbs-up"></i>
            &nbsp; {like.length - dislike.length}
          </div>
        </div>
      </div>
      <div className="post__preview" dangerouslySetInnerHTML={{ __html: content }}>
      </div>
    </div>
  )
}