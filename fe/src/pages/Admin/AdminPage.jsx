import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import ReportView from "./child/PageOverview";
import TestSection from "./child/SectionTest";
import UserSection from "./child/SectionUser";
import Loading from "../../components/Common/Loading";
function AdminPage() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.application.status);
  const info = useSelector(state => state.application.adminInfo);
  const [currentSection, setCurrentSection] = useState("user");
  const [customStyle, setCustomStyle] = useState({ container: { height: "0" } });
  const sections = {
    "test": <TestSection tests={info ? info.tests : []} />,
    "user": <UserSection users={info ? info.users : []} />
  }
  function handleChangeSection(s) {
    setCurrentSection(s);
    handleToggleSetting();
  }
  function handleToggleSetting() {
    if (customStyle.container.height === "0") {
      setCustomStyle({ container: { height: "90px" } });
      return;
    }
    setCustomStyle({ container: { height: "0" } });
  }
  useEffect(() => {
    if (status === c.LOADING) {
      dispatch(appActions.getAdminInfo());
    }
    document.getElementById("header").style.display = "none";
    document.getElementById("footer").style.display = "none";
  }, [])
  return (
    <div className="admin-page">
      {
        status === c.LOADING ? <Loading />
          :
          <React.Fragment>
            <ReportView
              tests={info.tests.length}
              questions={info.questions}
              users={info.users.length}
              posts={info.posts.length}
            />
            {sections[currentSection]}
            <button className="setting-btn" onClick={handleToggleSetting}>
              <i className="fas fa-cog"></i>
            </button>
            <div className="setting-tab-container" style={{ height: customStyle.container.height }}>
              <div className="setting-tab" onClick={() => handleChangeSection("user")}>
                Quản lý người dùng
              </div>
              <div className="setting-tab" onClick={() => handleChangeSection("test")}>
                Quản lý đề thi
              </div>
              <div className="setting-tab" onClick={() => { window.location.href = "/" }}>
                Về trang chủ
              </div>
            </div>
          </React.Fragment>
      }
    </div>
  )
}

export { AdminPage }