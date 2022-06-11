import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postActions as a } from '../../../actions/postActions';
import { getCurrentDate } from "../../../helper"
export default function CommentInput(props) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  function handleSubmit() {
    dispatch(a.commentPost(
      props.id,
      {
        content,
        date: getCurrentDate()
      }))
  }
  return (
    <div className="comment-input">
      <ReactQuill
        placeholder="Bình luận của bạn..."
        value={content}
        onChange={(v) => setContent(v)} />
      <button onClick={handleSubmit} id="submit-btn">Gửi bình luận</button>
    </div>
  )
}