import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { testActions } from "../../../actions/testActions";
import { constants as c } from "../../../constants";

export default function MatchingQuestion(props) {
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

    if (!userAnswers[section]) return [];
    if (!userAnswers[section][index]) return [];

    if (userAnswers[section][index].length > trueAnswers.length) return [];

    return trueAnswers.map(v => userAnswers[section][index].includes(v));
  }, [mode]);

  function handleAnswers(a, i) {
    let answers = {
      index: i,
      value: a,
      type: c.MATCHING_PARAGRAPH
    }
    dispatch(testActions.answerQuestion(section, index, answers))
  }

  function findHint(i) {
    dispatch({
      type: c.VIEW_HINT,
      hint: explain[i]
    })
  }

  function createResultRow() {
    return (
      <>
        <div className="result">
          <label>Answers:</label>
          {
            trueAnswers.map((v, i) =>
              <div className="row">
                <div className="true-answers">
                  <strong className={result[i] ? "true" : "false"}>
                    {v}
                  </strong>
                </div>
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
              </div>
            )
          }
        </div>
      </>
    )
  }

  function createContentRow(c, i) {
    return (
      <div className="row" key={nQuestions.from + i + "_" + i}>
        <select answers_for={i} onChange={(e) => handleAnswers(e.target.value, i)}>
          <option value={""}></option>
          {
            answers.map(v => <option value={v}>{v}</option>)
          }
        </select>
        <label>{c}</label>
      </div>
    )
  }

  return (
    <div className="question matching">
      <h3>
        Questions {nQuestions.from}-{nQuestions.to}
      </h3>
      <div className="guild">
        {guild}
      </div>
      {
        content.map((v, i) => createContentRow(v, i))
      }
      {
        mode === c.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}