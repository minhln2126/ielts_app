import { useState } from "react";
import { useDispatch } from "react-redux";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
export default function UpdateUserForm(props) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ ...props.user });
  function handleInputChange(e) {
    let { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  }
  function handleSubmit(e) {
    console.log(info);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(userActions.update(props.user._id, info));
    e.preventDefault();
  }
  return (
    <div className="modal active">
      <form id="form">
        <h3>Thông tin người dùng</h3>
        <label htmlFor="new-name">Tên:</label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          id="new-name"
          value={info.name}
          onChange={handleInputChange}
        />
        <label htmlFor="new-email">Email:</label>
        <input
          type="text"
          name="email"
          id="new-email"
          autoComplete="off"
          value={info.email}
          onChange={handleInputChange}
        />
        <div className="row">
          <label>Phân quyền</label>
          <div>
            <div className="row">
              <input
                type="checkbox"
                checked={info.role === "guest"}
                onChange={handleInputChange}
                name="role"
                id="new-guest"
                value="guest"
              />
              <label htmlFor="new-guest">Học viên</label>
            </div >
            <div className="row">
              <input
                type="checkbox"
                checked={info.role === "admin"}
                onChange={handleInputChange}
                name="role"
                id="new-admin"
                value="admin"
              />
              <label htmlFor="new-admin">Quản trị viên</label>
            </div>
          </div>
        </div>
        <label>Năng động:</label>
        <input
          autoComplete="off"
          disabled={true}
          type="number"
          readOnly="readOnly"
          value={info.score}
          name="score"
        />
        <div className="row">
          <label>Huy hiệu: </label>
          <div>
            <div className="row">
              <input
                type="checkbox"
                checked={info.badge === "rook"}
                onChange={handleInputChange}
                name="badge"
                id="rook"
                value="rook"
              />
              <label htmlFor="knight">Rook</label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                checked={info.badge === "knight"}
                onChange={handleInputChange}
                name="badge"
                id="knight"
                value="knight"
              />
              <label htmlFor="knight">Knight</label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                checked={info.badge === "bishop"}
                onChange={handleInputChange}
                name="badge"
                id="bishop"
                value="bishop"
              />
              <label htmlFor="bishop">Bishop</label>
            </div>
            <div className="row">
              <input
                type="checkbox"
                checked={info.badge === "pawn"}
                onChange={handleInputChange}
                name="badge"
                id="pawn"
                value="pawn"
              />
              <label htmlFor="pawn">Pawn</label>
            </div >
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <button onClick={handleSubmit} id="btnSubmit">Lưu</button>
          <button onClick={props.onClose} className="cancel-btn">Đóng</button>
        </div>
      </form>
    </div>
  )
}