import ToeicLocation from "./child/Location";
import ToeicProcess from "./child/Process";
import ToeicOutcome from "./child/Outcome";
import React, { useEffect, useState } from "react";
function ToeicInfoPage() {
  const [customStyle, setCustomStyle] = useState({ location: "block", process: "none", output: "none" });
  function handleChangeTab(tab) {
    let cStyle = { ...customStyle };
    cStyle.location = "none";
    cStyle.process = "none";
    cStyle.output = "none";
    cStyle[tab] = "block";
    setCustomStyle(cStyle);
  }
  useEffect(() => {
    document.title = "Thông tin IELTS"
  }, [])
  return (
    <React.Fragment>
      <div className="toeic-info container">
        <div className="tab-container">
          <button
            className={customStyle.location === "block" ? "active" : ""}
            onClick={() => handleChangeTab("location")}
          >
            Địa điểm thi IELTS
          </button>
          <button
            className={customStyle.process === "block" ? "active" : ""}
            onClick={() => handleChangeTab("process")}
          >
            Thủ tục đăng ký
          </button>
          <button
            className={customStyle.output === "block" ? "active" : ""}
            onClick={() => handleChangeTab("output")}
          >
            Nhận kết quả thi
          </button>
        </div>
        <div className="info-container">
          <ToeicLocation display={customStyle.location} />
          <ToeicProcess display={customStyle.process} />
          <ToeicOutcome display={customStyle.output} />
        </div>
      </div>
    </React.Fragment>
  )
}
export { ToeicInfoPage }