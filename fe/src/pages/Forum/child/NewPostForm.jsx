import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { postActions as a } from '../../../actions/postActions';
import { constants as c } from '../../../constants';
import { getCurrentDate } from '../../../helper';
export default function NewPostForm(props) {
  const myInput = useRef(null);
  const actionStatus = useSelector(state => state.post.action.create);
  const dispatch = useDispatch();
  const [postInfo, setPostInfo] = useState({ title: "", content: "" });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesUrl, setSelectedFilesUrl] = useState([]);
  function handleFileSelect(e) {
    if (!e.target.files)
      return;
    const fileList = Array.prototype.slice.call(e.target.files);
    setSelectedFiles(fileList);
  };
  function handleSubmit() {
    if (actionStatus.status === c.LOADING)
      return;
    dispatch({ type: c.SEND_CREATE_POST_REQUEST });
    dispatch(a.createPost({
      ...postInfo,
      date: getCurrentDate()
    }));
  };
  function handleInputChange(name, value) {
    setPostInfo({
      ...postInfo,
      [name]: value
    })
  }
  useEffect(() => {
    if (!selectedFiles.length)
      return;
    let imagesUrl = [];
    imagesUrl = selectedFiles.map((v) => URL.createObjectURL(v));
    setSelectedFilesUrl(imagesUrl);
    return () => URL.revokeObjectURL(imagesUrl);
  }, [selectedFiles]);
  return (
    <div className="modal active">
      <div className="new-post-form">
        <h4>Bài viết mới</h4>
        <input
          onChange={(e) => handleInputChange("title", e.target.value)}
          type="text"
          placeholder="Tiêu đề"
        />
        <div className="quill-container">
          <ReactQuill
            placeholder="Nội dung..."
            value={postInfo.content}
            onChange={(v) => handleInputChange("content", v)} />
        </div>
        <div className="images">
          {
            selectedFilesUrl.length > 0
            && selectedFilesUrl.map((v, i) =>
              <div className="image" key={i}>
                <div className="img-container">
                  <img src={v} alt="" />
                </div>
              </div>
            )
          }
          <button onClick={() => { myInput.current.click() }}>
            <div className="image">
              <div className="img-container">
                <img src="/img/add_img.png" alt="" />
              </div>
            </div>
          </button>
          <input
            type="file"
            ref={myInput}
            multiple={true}
            onChange={handleFileSelect}
            style={{ display: "none" }}
            accept="image/jpeg, image/jpg, image/png"
          />
        </div>
        {
          actionStatus.msg &&
          <p className="action-msg">{actionStatus.msg}</p>
        }
        {
          actionStatus.status === c.LOADING &&
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{
              margin: "auto",
              display: "block",
              shapeRendering: "auto"
            }}
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(60 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(120 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.5s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(180 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(240 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(300 50 50)">
              <rect x="47" y="26" rx="3" ry="6" width="6" height="12" fill={"#333"}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.5s" begin="0s" repeatCount="indefinite"></animate>
              </rect>
            </g>
          </svg>
        }
        <div className="action">
          <button id="submit-btn" onClick={handleSubmit}>Đăng bài</button>
          <button id="cancel-btn" onClick={props.onClose}>Hủy</button>
        </div>
      </div>
    </div>
  )
}