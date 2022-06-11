import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { testActions } from "../../../actions/testActions";
import { constants as c } from "../../../constants";

export default function CompleteTableQuestion(props) {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.test.mode);
  const userAnswers = useSelector(state => state.test.userAnswers);

  const {
    content,
    answers,
    guild,
    trueAnswers,
    explain,
    nQuestions,
    index,
    section,
    from } = props;

  let questionIndex = nQuestions.from - 1;

  const result = useMemo(() => {
    if (mode === c.DO_TEST_MODE)
      return [];

    if (!userAnswers[section]) return [];
    if (!userAnswers[section][index]) return [];

    if (userAnswers[section][index].length > trueAnswers.length) return [];

    return trueAnswers.map(v => userAnswers[section][index].includes(v));
  }, [mode]);

  function findHint(i) {
    dispatch({
      type: c.VIEW_HINT,
      hint: explain[i]
    })
  }

  function handleAnswers(a, i) {
    dispatch(testActions.answerQuestion(
      section,
      index,
      {
        value: a,
        index: i,
        type: c.COMPLETE_TABLE,
      }
    ))
  }

  function createResultRow() {
    return (
      <>
        <div className="result">
          <label>Answers:</label>
          {
            trueAnswers.map((v, i) =>
              <div className="row">
                <div className="explain">
                  <button
                    onClick={() => findHint(i)}
                  >
                    <i className="far fa-compass"></i>
                    &nbsp;
                    Locate
                  </button>
                  {
                    from &&
                    <button
                      onClick={() => dispatch({ type: c.FORWARD_AUDIO, time: from })}
                    >
                      <i className="fas fa-headphones-alt"></i>
                      &nbsp;
                      Listen from here
                    </button>
                  }
                </div>
                <div className="true-answers">
                  <strong className={result[i] ? "true" : "false"}>
                    {v}
                  </strong>
                </div>
              </div>
            )
          }
        </div>
      </>
    )
  }

  function createInputRow(c) {
    let contentArr = c.split("_");
    if (contentArr.length === 1)
      return (
        <td>
          {contentArr[0]}
        </td>
      )
    questionIndex++;
    let indexInType = questionIndex - nQuestions.from;
    return (
      <td>
        <div className="row">
          <div className="number">{questionIndex}</div>
          <div className="content">
            {contentArr[0]}
            <input
              type="text"
              onBlur={(e) => handleAnswers(e.target.value, indexInType)}
            />
            {contentArr[1]}
          </div>
        </div>
      </td>
    )
  }

  function createTableRow(c) {
    let col = c.split("|");
    return (
      <tr>
        {
          col.map(v => createInputRow(v))
        }
      </tr>
    )
  }

  useEffect(() => { console.log("hello") }, [])

  return (
    <div className="question complete-table">
      <h3>Questions {nQuestions.from}-{nQuestions.to}</h3>
      <div className="guild">{guild}</div>
      <table>
        <thead>
          <tr>
            {
              content.map(v => <th>{v}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {answers.map(v => createTableRow(v))}
        </tbody>
      </table>
      {
        mode === c.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}