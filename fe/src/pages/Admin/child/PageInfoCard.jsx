export default function InfoCard(props) {
  return (
    <div className="info">
      <div className="icon" style={{ background: props.color }}>
        <i className={props.icon}></i>
      </div>
      <div className="number">
        <div style={{ marginRight: "0.5em" }}>
          <span style={{ fontSize: "13px", color: "rgb(129, 129, 129)" }}>{props.title}</span>
          <br />
          <span style={{ fontSize: "23px", textAlign: "right" }}>{props.number}</span>
        </div>
      </div>
      <div className="update-time">
        <i style={{ color: props.color }} className="far fa-calendar-alt"></i>
        29/12/2021
      </div>
    </div>
  )
}