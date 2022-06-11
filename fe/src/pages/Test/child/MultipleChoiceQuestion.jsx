import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { testActions } from "../../../actions/testActions";
import { constants } from "../../../constants";

export default function MultipleChoiceQuestion(props) {
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

  const result = useMemo(() => {
    if (mode === constants.DO_TEST_MODE)
      return [];

    if (!userAnswers[section]) return [];
    if (!userAnswers[section][index]) return [];

    if (userAnswers[section][index].length > trueAnswers.length) return [];

    return trueAnswers.map(v => userAnswers[section][index].includes(v));
  }, [mode]);

  function handleAnswers(a) {
    dispatch(testActions.answerQuestion(section, index, a));
  }

  function findHint(i) {
    dispatch({
      type: constants.VIEW_HINT,
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
                      onClick={() => dispatch({ type: constants.FORWARD_AUDIO, time: from })}
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
      <div className="row">
        <div className="answers">{answers[i]}</div>
        <input
          type="checkbox"
          value={answers[i]} id={c}
          onChange={() => handleAnswers(answers[i])}
          disabled={mode === constants.SUBMITED_MODE}
        />
        <label htmlFor={c}>{c}</label>
      </div>
    )
  }

  return (
    <div className="question multiple-choice">
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
        mode === constants.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}