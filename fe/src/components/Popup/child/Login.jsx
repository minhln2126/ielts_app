import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { constants as c } from "../../../constants";
import { appActions } from '../../../actions/appActions';
import { userActions } from '../../../actions/userActions';
import Input from './Input';
function Login(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { email, password } = inputs;
  const popupInfo = useSelector(state => state.application.popup);
  const message = useSelector(store => store.authentication.message);
  function validate() {
    let err = {};
    if (!email)
      err.email = "Vui lòng nhập email!";
    if (!password)
      err.password = "Vui lòng nhập mật khẩu!";
    return err;
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let error = validate();
    console.log(popupInfo);
    if (Object.keys(error).length) {
      setErrors(error);
      return;
    }
    dispatch(appActions.changePopup(c.POPUP_LOGIN, "", { status: c.LOADING }));
    dispatch(
      userActions.login(email, password)
    );
  }
  function forgotPass() {
    dispatch(appActions.changePopup(c.POPUP_FORGOTPASS));
  }
  function handleCloseForm() {
    dispatch(appActions.changePopup(c.NONE));
  }
  function handleRegisClick() {
    dispatch(appActions.changePopup(c.POPUP_REGISTER));
  }
  return (
    <div className="modal active">
      <div className="login-container form-container">
        <button
          className="close-btn"
          onClick={handleCloseForm}>
          <i className="far fa-times-circle"></i>
        </button>
        <div className="img-container">
          <img src="/login_banner.png" className='center' alt="#" />
        </div>
        <div className="form-container">
          <form className="form center " onSubmit={handleSubmit}>
            <div className="center-text">
              <h2>Edulogy - Đăng nhập</h2>
              <div>Xin chào, vui lòng nhập thông tin đăng nhập.</div>
            </div>
            <div className="input-container">
              <Input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                error={errors.email}
                handleChange={handleInputChange}
              />
              <Input
                type="password"
                name="password"
                value={password}
                placeholder="Mật khẩu đăng nhập"
                error={errors.password}
                handleChange={handleInputChange}
              />
              <a href="/quen-mat-khau">Quên mật khẩu</a>
              {
                popupInfo.additionalInfo.status !== c.LOADING
                  ?
                  <button
                    id="login-btn"
                    onClick={handleSubmit}>
                    Đăng nhập
                  </button>
                  :
                  <button id="login-btn">
                    Đăng nhập
                  </button>
              }
              {
                popupInfo.additionalInfo.status === c.LOADING
                &&
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{
                    margin: "auto",
                    display: "block",
                    shapeRendering: "auto"
                  }}
                  width="80px"
                  height="80px"
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
              {popupInfo.msg && <div className="center-text text-error">{popupInfo.msg}</div>}
              <div>
                Chưa có tài khoản?&nbsp;
                <button onClick={handleRegisClick}>
                  Đăng ký ngay
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login