import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { testActions } from "../../../actions/testActions";
import { constants as c } from "../../../constants";

export default function TrueFalseQuestion(props) {
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
    section,
    index,
    from } = props;

  const result = useMemo(() => {
    if (mode === c.DO_TEST_MODE)
      return [];
    if (!userAnswers[section]) return [false];
    if (!userAnswers[section][index]) return [false];
    return [trueAnswers.includes(userAnswers[section][index][0])]
  }, [mode]);

  function findHint() {
    dispatch({
      type: c.VIEW_HINT,
      hint: explain[0]
    })
  }

  function handleAnswers(a) {
    dispatch(testActions.answerQuestion(
      section,
      index,
      {
        type: c.TRUE_FALSE_NOT_GIVEN,
        value: a
      }
    )
    )
  }

  function createResultRow() {
    return (
      <>
        <div className="result">
          <label>Answers:</label>
          <div className="row">
            <div className="true-answers">
              {
                trueAnswers.map((v, i) =>
                  <strong className={result[i] ? "true" : "false"}>
                    {v}
                  </strong>
                )
              }
            </div>
            <div className="explain">
              <button
                onClick={findHint}
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
          </div>
        </div>
      </>
    )
  }

  function createContentRow(c) {
    return (
      <div className="row">
        <select
          onChange={(e) => handleAnswers(e.target.value)}
        >
          <option value={""}></option>
          {
            answers.map(v => <option value={v}>{v}</option>)
          }
        </select>
        <div className="content">{c}</div>
      </div>
    )
  }

  return (
    <div className="question true-false-question">
      {
        guild &&
        <>
          <h3>Questions {nQuestions.from}-{nQuestions.to}</h3>
          <div className="guild">{guild}</div>
          <div className="table">
            <div className="row odd">
              <span>TRUE</span>
              <label>if the statement agrees with the information</label>
            </div>
            <div className="row even">
              <span>FALSE</span>
              <label>if the statement contradicts the information</label>
            </div>
            <div className="row odd">
              <span>NOT GIVEN</span>
              <label>If there is no information on this</label>
            </div>
          </div>
        </>
      }
      {createContentRow(content[0])}
      {
        mode === c.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}