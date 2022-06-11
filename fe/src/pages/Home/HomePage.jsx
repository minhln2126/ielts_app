import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import Banner from './child/Banner';
import SectionTest from "./child/SectionTest";
import SectionIntro from "./child/SectionInro";
import Loading from '../../components/Common/Loading';
function HomePage() {
  let dispatch = useDispatch();
  let homeInfo = useSelector(state => state.application.home);
  const [currentLevel, setCurrentLevel] = useState("reading");
  const tests = useMemo(() => {
    return homeInfo.data[currentLevel] ? homeInfo.data[currentLevel] : []
  },
    [homeInfo, currentLevel]
  );
  function handleChangeLevel(lv) {
    setCurrentLevel(lv);
  }
  useEffect(() => {
    document.title = "The Mockingbird - Luyện thi ielts trực tuyến"
    if (homeInfo.status === c.LOADING)
      dispatch(appActions.getHomeInfo());
    console.log(homeInfo)
  }, [homeInfo]);
  console.log(homeInfo)
  return (
    <React.Fragment>
      <div className="home container">
        {
          homeInfo.status === c.LOADING
            ?
            <Loading />
            :
            <div className="main-view">
              <Banner />
              <SectionIntro />
              <div className="row">
                <span>LUYỆN THI IELTS MIỄN PHÍ</span>
                <div className="flex">
                  <button
                    className={currentLevel === "reading" ? "active" : ""}
                    onClick={() => handleChangeLevel("reading")}>
                    Reading
                  </button>
                  <button
                    className={currentLevel === "listening" ? "active" : ""}
                    onClick={() => handleChangeLevel("listening")}>
                    Listening
                  </button>
                </div>
              </div>
              <SectionTest tests={tests} />
            </div>
        }
      </div>
    </React.Fragment >
  )
}
export { HomePage }