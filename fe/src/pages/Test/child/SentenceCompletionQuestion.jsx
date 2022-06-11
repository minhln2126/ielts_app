import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { testActions } from "../../../actions/testActions";
import { constants as c } from "../../../constants";

export default function SentenceCompletionQuestion(props) {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.test.mode);
  const userAnswers = useSelector(state => state.test.userAnswers);

  const {
    content,
    guild,
    trueAnswers,
    explain,
    nQuestions,
    index,
    section,
    from } = props;

  const result = useMemo(() => {
    if (mode === c.DO_TEST_MODE)
      return [];
    if (!userAnswers[section]) return [false];
    if (!userAnswers[section][index]) return [false];
    let trAnswers = trueAnswers.map(v => v.trim().toLowerCase().replace(/’/g, "'"));
    return [trAnswers.includes(userAnswers[section][index][0].trim().toLowerCase())]
  }, [mode]);

  function findHint() {
    dispatch({
      type: c.VIEW_HINT,
      hint: explain[0]
    })
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

  function handleAnswers(a) {
    dispatch(testActions.answerQuestion(
      section,
      index,
      {
        type: c.SENTENCE_COMPLETION,
        value: a
      }
    )
    )
  }

  function createContentRow(c) {
    let contentArr = c.split("_");
    return (
      <div className="content">
        {contentArr[0]}
        <input
          type="text"
          onBlur={(e) => handleAnswers(e.target.value)}
        />
        {contentArr[1]}
      </div>
    )
  }

  return (
    <div className="question sentence-completion">
      {
        guild &&
        <h3>Questions {nQuestions.from}-{nQuestions.to}</h3>
      }
      <div className="guild">{guild}</div>
      {createContentRow(content[0])}
      {
        mode === c.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}