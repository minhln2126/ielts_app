import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../../../actions/testActions";
import { appActions } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
export default function UpdateTestForm(props) {
  console.log(props);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ ...props.test });
  console.log(info)
  const typeName = {
    "reading": "Reading Test",
    "listening": "Listening Test",
  }
  function handleInputChange(e) {
    console.log({
      [e.target.name]: e.target.value
    });
    setInfo({ ...info, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    console.log(info);
    dispatch(testActions.updateTest(props.test._id, info));
  }
  return (
    <div className="modal active">
      <div className="info-popup">
        <form id="updateForm" encType="multipart/form-data" style={{ minHeight: "unset" }}>
          <h3>Thông tin test</h3>
          <div className="main-info-view">
            <div className="col">
              <label htmlFor="new-name">Tên test:</label>
              <input
                id="new-name"
                type="text"
                name="name"
                value={info.name}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <label htmlFor="new-img">Loại:</label>
              <input
                type="text"
                name="img"
                id="new-img"
                value={typeName[info.type]}
                autoComplete="off"
                readOnly={true}
                disabled={true}
                onChange={handleInputChange}
              />
              <label htmlFor="new-img">Link script:</label>
              <input
                type="text"
                name="script"
                id="new-script"
                value={info.script}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <label htmlFor="questions">Số lượng section: </label>
              <input
                type="text"
                name="questions"
                id="questions"
                readOnly="readonly"
                disabled={true}
                value={info.sections ? info.sections.length : 0}
              />
              <label htmlFor="questions">Ảnh: </label>
              <input
                type="text"
                name="img"
                id="img"
                value={info.img ? info.img : ""}
              />
              <label htmlFor="new-time">Thời gian làm bài: </label>
              <input
                type="number"
                name="time"
                id="new-time"
                value={info.time}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <button onClick={handleSubmit} id="btnSubmit">Lưu</button>
            <button onClick={props.onClose} className="cancel-btn">Đóng</button>
          </div>
        </form>
      </div>
    </div>
  )
}