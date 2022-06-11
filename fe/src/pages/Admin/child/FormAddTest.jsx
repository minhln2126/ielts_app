import { useDispatch } from "react-redux";
import { useState } from "react";
import { xlsxToJson } from "../../../helper";
import { constants as c } from "../../../constants";
import { testActions as a } from "../../../actions/testActions";
import { appActions } from "../../../actions/appActions";
export default function AddTestForm() {
  const dispatch = useDispatch();
  const imgLink = {
    "full": "https://i.ibb.co/MpmBCQ3/testbn1.png",
    "mini": "https://i.ibb.co/9HFWnb2/testbn.jpg",
    "part1": "https://i.ibb.co/1bk7ZDC/hqdefault.jpg",
    "part2": "https://i.ibb.co/4RPcTzq/p2bn.png",
    "part5": "https://i.ibb.co/PhJ6rCS/14900.png",
    "part6": "https://i.ibb.co/PhJ6rCS/14900.png",
    "part7": "https://i.ibb.co/PhJ6rCS/14900.png"
  }
  const [info, setInfo] = useState({});

  function extractQuestion(q) {
    console.log(q);
    q["true answers"] = q["true answers"].toString()
    return {
      sectionID: q["section ID"],
      type: q["question type"],
      guild: q["guild"],
      content: q["content"] ? q["content"].split("|") : [],
      answers: q["answers"] ? (q["question type"] !== c.COMPLETE_TABLE ? q["answers"].split("|") : q["answers"].split("/")) : [],
      trueAnswers: q["true answers"] ? q["true answers"].split("|") : [],
      image: q["images"] ? q["images"].split("|") : [],
      explain: q.explain ? q.explain.split("|") : [],
      title: q.title
    }
  }

  function extractSection(s) {
    return {
      paragraph: {
        title: s["section title"] ? s["section title"] : "",
        content: s["section content"] ? s["section content"].split("|") : []
      }
    }
  }

  async function handleFileSelect(e) {
    var rs = await xlsxToJson(e.target.files[0]);
    console.log(rs);
    let addInfo = {
      sections: [],
      questions: [],
    };
    for (let d of rs) {
      if (d["data type"].trim() === "section")
        addInfo.sections.push(extractSection(d))
      if (d["data type"].trim() === "question")
        addInfo.questions.push(extractQuestion(d))
    }

    setInfo({ ...info, ...addInfo })
  }

  function handleSubmit() {
    console.log(info);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }))
    dispatch(a.addTest({ ...info }))
    return;
  }

  function handleInputChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={(e) => { e.preventDefault() }} id="form">
      <h3>Tạo test mới</h3>
      <label htmlFor="name">Tên test:</label>
      <input
        onChange={handleInputChange}
        value={info.name}
        autoComplete="off"
        type="text"
        name="name"
        id="name"
      />
      <label htmlFor="name">Ảnh:</label>
      <input
        onChange={handleInputChange}
        value={info.img}
        autoComplete="off"
        type="text"
        name="img"
        id="img"
      />
      <label htmlFor="name">Link script:</label>
      <input
        onChange={handleInputChange}
        value={info.script}
        autoComplete="off"
        type="text"
        name="script"
        id="script"
      />
      <label htmlFor="time">Thời gian làm bài: </label>
      <input
        onChange={handleInputChange}
        value={info.times}
        type="number"
        name="time"
        id="time"
      />
      <div className="row" style={{ alignItems: "center" }}>
        <label style={{ minWidth: "4.25em" }}>Loại</label>
        <div className="row" style={{ marginTop: 0, margin: "0.25em 0" }}>
          <div className="row" style={{ alignItems: "center", marginTop: 0 }}>
            <input
              type="checkbox"
              checked={info.type === "reading"}
              onChange={handleInputChange}
              name="type"
              id="reading"
              value="reading"
            />
            <label htmlFor="reading" style={{ minWidth: "4em" }}>Reading</label>
          </div >
          <div className="row" style={{ alignItems: "center", marginTop: 0 }}>
            <input
              type="checkbox"
              checked={info.type === "listening"}
              onChange={handleInputChange}
              name="type"
              id="listening"
              value="listening"
            />
            <label htmlFor="listening" style={{ minWidth: "4em" }}>Listening</label>
          </div>
        </div>
      </div>
      <div className="row">
        <label htmlFor="file">Excel file</label>
        <input
          onChange={handleFileSelect}
          type="file"
          name="file"
          id="file"
        />
      </div>
      <button onClick={handleSubmit} id="btnSubmit">Lưu</button>
    </form>
  )
}