import { useDispatch } from 'react-redux';
import { constants } from '../../../constants';
import { appActions } from '../../../actions/appActions';
import { closeSidebar, toggleSubitem } from "../../../helper";
export default function MenuSidebar() {
  const dispatch = useDispatch();
  function handleLoginClick() {
    dispatch(appActions.changePopup(constants.POPUP_LOGIN));
  }
  function handleCloseSidebar() {
    closeSidebar();
  }
  function handleToggle() {
    toggleSubitem()
  }
  return (
    <div id="menuSidebar" className="menu-sidebar">
      <div style={{ height: "3em" }}>
        <button onClick={handleCloseSidebar} id="closeSidebarBtn">
          <img src="/img/close_icon.png" alt="" />
        </button>
      </div>
      <div className="item-container">
        <div className="sidebar-item" style={{ display: "flex", justifyContent: "space-between" }}>
          <a href="/de-thi">
            Kiểm tra
          </a>
          <button onClick={handleToggle} style={{ marginRight: "1em", padding: "0" }}>
            <img src="/img/down.png" alt="" />
          </button>
        </div>
        <div id="sidebarSubitem" className="sidebar-subitem">
          <a href="/de-thi?type=mini" className="sub-item">
            Minitest
          </a>
          <a href="/de-thi?type=part1" className="sub-item">
            Part I:  Hình ảnh
          </a>
          <a href="/de-thi?type=part2" className="sub-item">
            Part II: Hội thoại
          </a>
          <a href="/de-thi?type=part5" className="sub-item">
            Part V: Điền khuyết
          </a>
        </div>
        <div className="sidebar-item">
          <a href="/thong-tin">
            Thông tin Toeic
          </a>
        </div>
        <div className="sidebar-item">
          <a href="/thao-luan">
            Thảo luận
          </a>
        </div>
        <button className="close-sidebar-btn" onClick={handleLoginClick}>
          Đăng nhập
        </button>
      </div>
    </div>
  )
}