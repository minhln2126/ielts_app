import { useState, useEffect } from "react";
export default function Timer(props) {
  let { time, isSubmitted } = props;
  const [timer, setTimer] = useState({
    remain: time * 60,
    minute: time < 10 ? `0${time}` : time,
    second: "00",
  });
  function calcTimer() {
    if (isSubmitted) return;
    if (timer === 0) {
      props.onTimeOut();
      return;
    }
    let remain = timer.remain - 1;
    let hour = Math.floor(remain / 3600);
    let minute = Math.floor((remain - Math.floor(remain / 3600) * 3600) / 60);
    let second = remain % 60;
    setTimer({
      remain,
      hour: hour < 10 ? "0" + hour : hour,
      minute: minute < 10 ? "0" + minute : minute,
      second: second < 10 ? "0" + second : second,
    });
  }
  useEffect(() => {
    setTimeout(calcTimer, 1000);
  });
  return (
    <span className="timer">
      <i className="far fa-clock"></i>
      &nbsp;
      {`${timer.minute} : ${timer.second}`}
    </span>
  );
}
