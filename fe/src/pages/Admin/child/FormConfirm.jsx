export default function ConfirmForm(props) {
  return (
    <div className="modal active">
      <div className="confirm-popup">
        <div>{props.msg}</div>
        <div>
          <button onClick={props.onConfirm} className="confirm-btn">Xác nhận</button>
          <button onClick={props.onCancel} className="cancel-btn">Hủy</button>
        </div>
      </div>
    </div>
  )
}