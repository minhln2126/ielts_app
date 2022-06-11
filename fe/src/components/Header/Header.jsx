import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showSidebar } from "../../helper";
import { appActions } from '../../actions/appActions';
import { userActions } from '../../actions/userActions';
import { constants as c } from '../../constants';
import Sidebar from "./child/Sidebar";
function Header(props) {
  const dispatch = useDispatch();
  const [currentActive, setCurrentActive] = useState("");
  const user = useSelector(store => store.authentication.user);
  function handleLoginClick() {
    dispatch(appActions.changePopup(c.POPUP_LOGIN, "", {}));
  }
  function handleProfileClick(e) {
    e.preventDefault();
    dispatch(appActions.changePopup(c.POPUP_PROFILE));
  }
  function handleLogoutClick() {
    dispatch(userActions.logout());
  }
  function handleShowSidebar() {
    showSidebar();
  }
  useEffect(() => {
    window.addEventListener("click", function (e) {
      let containers = document.querySelectorAll(".header-dropdown");
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].contains(e.target)) return;
      }
      setCurrentActive("");
    });
  }, [])
  return (
    <React.Fragment>
      <div style={{ background: "white" }}>
        <div className="nav container" id="header">
          <div className="logo">
            <a href="/">
              <img src="/img/logo (1).png" alt="" />
            </a>
          </div>
          <div className="dropdown-container">
            <div className="dropdown">
              <a href="/de-thi" className="dropdown-btn">Đề kiểm tra <i className="fas fa-caret-down"></i></a>
              <div className={
                "dropdown-list"
                +
                (currentActive === "test" ? " active" : "")
              }>
                <a href="/de-thi?type=reading" className="dropdown-item">Reading test</a>
                <a href="/de-thi?type=listening" className="dropdown-item">Listening test</a>
                <a href="/de-thi" className="dropdown-item">Writing test</a>
                <a href="/de-thi" className="dropdown-item">Speaking test</a>
              </div>
            </div>
            <div className="dropdown">
              <a href="/thong-tin" className="dropdown-btn">Thông tin Ielts</a>
            </div>
            <div className="dropdown">
              <a href="/forum" className="dropdown-btn">Diễn đàn</a>
            </div>
            <div className="dropdown mobile-display">
              <button onClick={handleShowSidebar}>
                <img src="/img/menu_icon2.png" alt="" />
              </button>
            </div>
            <div className="dropdown">
              {
                !user
                  ? <button
                    id="account-btn"
                    onClick={handleLoginClick}>
                    Đăng nhập
                  </button>
                  :
                  <div className="account-dropdown">
                    <button
                      id="account-btn"
                      className="dropdown-btn account-btn"
                    >
                      Tài khoản <i className="fas fa-caret-down"></i>
                    </button>
                    <div className="dropdown-list">
                      <a
                        href="/"
                        onClick={handleProfileClick}
                        className="dropdown-item">
                        Thay đổi thông tin
                      </a>
                      <a
                        href="/thong-bao"
                        className="dropdown-item"
                      >
                        Thông báo
                      </a>
                      {
                        user.role === "admin" &&
                        <a href="/quan-ly" className="dropdown-item">
                          Quản lý
                        </a>
                      }
                      <div onClick={handleLogoutClick} className="dropdown-item">Đăng xuất</div>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </React.Fragment>
  )
}
export { Header }