import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { testActions } from "../../../actions/testActions";
import { constants } from "../../../constants";

export default function MultipleChoiceQuestionAnswers(props) {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.test.mode);
  const userAnswers = useSelector(state => state.test.userAnswers);

  const answersLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
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
        <div className="answers">{answersLetters[i]}</div>
        <input
          id={c}
          type="checkbox"
          value={answersLetters[i]}
          disabled={mode === constants.SUBMITED_MODE}
          onChange={() => handleAnswers(answersLetters[i])}
        />
        <label htmlFor={c}>{c}</label>
      </div>
    )
  }

  useEffect(() => { console.log("123") }, [])
  return (
    <div className="question multiple-choice-question-answers">
      {
        guild &&
        <h3>
          Questions {nQuestions.from}-{nQuestions.to}
        </h3>
      }
      <div className="guild">{guild}</div>
      <div className="content">{content}</div>
      {
        answers.map((v, i) => createContentRow(v, i))
      }
      {
        mode === constants.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}