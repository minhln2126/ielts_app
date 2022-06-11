import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Audio from "../../../components/Common/Audio";
import { constants } from "../../../constants";

export default function ScriptDisplay(props) {
  const dispatch = useDispatch();

  const mode = useSelector(state => state.test.mode);
  const hint = useSelector(state => state.test.hint);
  const audioTime = useSelector(state => state.test.audioTime);

  const audio = useRef(null);

  const { script, content, title, section, hints, numberOfQuestions } = props;
  console.log(script)

  const [audioStatus, setAudioStatus] = useState({
    isPlaying: false,
  });

  function createParagraphWithHint() {
    let c = content.reduce((prev, v) => prev + v + "<br/>", "");
    hints.forEach((v, i) => {
      let id = `hint_${section}_${i}`
      let hintText = `<strong id="${id}">${numberOfQuestions.from + i}</strong><span class='high-light'>${v}</span>`
      c = c.replace(v, hintText)
    });
    return c
  }

  useEffect(() => {
    if (audioTime !== 0) {
      audio.current.listenFrom(Number(audioTime))
      dispatch({
        type: constants.FORWARD_AUDIO,
        time: 0
      })
    }
    let previousHint = document.querySelectorAll("strong.active");
    previousHint.forEach((e) => e.classList.remove("active"))
    let index = hints.indexOf(hint);
    let id = `hint_${section}_${index}`;
    let tag = document.getElementById(id);
    if (!tag) return
    tag.classList.add("active")
    let offsetTop = tag.offsetTop;
    document.getElementById("script").scrollTop = offsetTop - 90;
  }, [hint, audioTime])

  return (
    <div className="script-display custom-scroll" id="script">
      {
        mode === constants.SUBMITED_MODE
          ?
          <>
            <h2>{title}</h2>
            <div
              className="paragraph-content"
              dangerouslySetInnerHTML={{ __html: createParagraphWithHint() }}
            >
            </div>
          </>
          :
          <img className="avt" src="https://i.ibb.co/KsNz19m/b0408710cf3f14c5c6bffe3d19f3c2cb.jpg" alt="" />
      }
      <Audio
        ref={audio}
        source={script}
      />
      <button onClick={() => audio.current.listenFrom(123)}>123</button>
    </div>
  )
}