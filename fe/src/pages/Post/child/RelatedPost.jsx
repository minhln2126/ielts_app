export default function RelatedPost(props) {
  const { title, content, user, date } = props;
  return (
    <div className="related-post show_flex">
      <div className="related-post__avt">
        {user.name[0]}
      </div>
      <div className="related-post__info">
        <h4>{title}</h4>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }}>
        </div>
        <div className="show_flex">
          <span><i className="far fa-calendar-alt"></i></span>
          &nbsp;
          <label>{date}</label>
        </div>
      </div>
    </div>
  )
}