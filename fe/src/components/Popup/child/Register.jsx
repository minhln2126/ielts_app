import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from '../../../constants';
import { appActions } from '../../../actions/appActions';
import { userActions } from "../../../actions/userActions";
import Input from "./Input";
export default function Register(props) {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { email, password, name } = inputs;
  const dispatch = useDispatch();
  const message = useSelector(store => store.authentication.message);
  function validate() {
    let err = {};
    if (!email)
      err.email = "Vui lòng nhập email!";
    if (!name)
      err.name = "Vui lòng nhập tên!";
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
    if (Object.keys(error).length) {
      setErrors(error);
      return;
    }
    dispatch(
      userActions.register(name, email, password)
    );
  }
  function handleCloseForm() {
    dispatch(appActions.changePopup(c.NONE));
  }
  function handleLoginClick() {
    dispatch(appActions.changePopup(c.POPUP_LOGIN))
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
          <form className="form center">
            <div className="center-text">
              <h2>Edulogy - Đăng ký tài khoản</h2>
              <div>Vui lòng cung cấp các thông tin dưới đây để đăng ký tài khoản</div>
            </div>
            <div className="input-container">
              <Input
                type="text"
                name="name"
                value={name}
                placeholder="Họ và tên"
                error={errors.name}
                handleChange={handleInputChange}
              />
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
              <button
                onClick={handleSubmit}
                id="signup-btn">
                Tạo tài khoản
              </button>
              {message &&
                <div
                  className="center-text text-error">
                  {message}
                </div>
              }
              <div
                className='center-text'>
                Bạn đã có tài khoản?&nbsp;
                <button onClick={handleLoginClick}>
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}