import { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../../actions/userActions";
import { appActions } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
export default function AddUserForm(props) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  function handleSubmit(e) {
    e.preventDefault();
    console.log(info);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }))
    dispatch(userActions.addOne(info));
  };
  function handleInputChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={props.handleSubmit} id="form">
      <h3>Thêm người dùng</h3>
      <label htmlFor="name">Tên:</label>
      <input
        id="name"
        type="text"
        name="name"
        autoComplete="off"
        value={info.name}
        onChange={handleInputChange}
      />
      <label htmlFor="img">Email:</label>
      <input
        type="text"
        name="email"
        id="email"
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
              name="role"
              id="guest"
              value="guest"
              checked={info.role === "guest"}
              onChange={handleInputChange}
            />
            <label htmlFor="guest">Học viên</label>
          </div >
          <div className="row">
            <input
              name="role"
              id="admin"
              value="admin"
              type="checkbox"
              onChange={handleInputChange}
              checked={info.role === "admin"}
            />
            <label htmlFor="admin">Quản trị viên</label>
          </div>
        </div>
      </div>
      <label htmlFor="img">Mật khẩu:</label>
      <input
        autoComplete="off"
        type="text"
        name="password"
        id="pasword"
        value={info.password}
        onChange={handleInputChange}
      />
      <button id="btnSubmit" onClick={handleSubmit}>Lưu</button>
    </form>
  )
}