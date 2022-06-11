import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../../constants";
import { appActions as a } from "../../../actions/appActions";
export default function Autohide() {
  const dispatch = useDispatch();
  const msg = useSelector(state => state.application.popup.msg);
  setTimeout(() => {
    dispatch(a.changePopup(c.NONE))
  }, 1000);
  return (
    <div className="modal active" style={{ background: "transparent" }}>
      <div className="autohide-popup">
        {msg}
      </div>
    </div>
  )
}