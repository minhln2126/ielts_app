import { useSelector } from "react-redux";
import { useEffect } from "react";

import { constants as c } from "../../../constants";

export default function ParagraphDisplay(props) {
  const { title, content, hints, section, numberOfQuestions } = props;

  const mode = useSelector(state => state.test.mode);
  const hint = useSelector(state => state.test.hint);

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
    let previousHint = document.querySelectorAll("strong.active");
    previousHint.forEach((e) => e.classList.remove("active"))
    let index = hints.indexOf(hint);
    let id = `hint_${section}_${index}`;
    let tag = document.getElementById(id);
    if (!tag) return
    tag.classList.add("active")
    let offsetTop = tag.offsetTop;
    document.getElementById("paragraph").scrollTop = offsetTop - 50;
  }, [hint])

  return (
    <div className="paragraph-display custom-scroll" id="paragraph">
      <h2>{title}</h2>
      {
        mode !== c.SUBMITED_MODE &&
        content.map(v =>
          <div className="paragraph-content">
            {v}
          </div>
        )
      }
      {
        mode === c.SUBMITED_MODE
        &&
        <div
          className="paragraph-content"
          dangerouslySetInnerHTML={{ __html: createParagraphWithHint() }}
        >
        </div>
      }
    </div>
  )
}