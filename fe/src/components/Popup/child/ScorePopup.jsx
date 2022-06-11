import { useSelector, useDispatch } from "react-redux"

import { appActions } from "../../../actions/appActions";
import { constants } from "../../../constants";
export default function ScorePopup(props) {
  const dispatch = useDispatch();
  const score = useSelector(state => state.application.popup.additionalInfo.score);
  return (
    <div className="modal active">
      <div className="score-popup">
        <h3>Kết quả làm bài</h3>
        <div className="score">
          <h4>
            {score}
          </h4>
        </div>
        <div className="action">
          <button
            onClick={() => dispatch(appActions.changePopup(constants.NONE))}
          >
            Xem đáp án
          </button>
          <button>
            Làm đề khác
          </button>
        </div>
      </div>
    </div>
  )
}