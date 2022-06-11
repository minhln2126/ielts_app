import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { constants as c } from "../../../constants";
import { testActions } from "../../../actions/testActions";

export default function SingleChoiceQuestionsAnswers(props) {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.test.mode);
  const userAnswers = useSelector(state => state.test.userAnswers);

  const answerLetters = ["A", "B", "C", "D"];
  const { content, answers, guild, trueAnswers, explain, nQuestions, index, section, from } = props;

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
        type: c.SINGLE_CHOICE_QUESTION_ANSWERS,
        value: a
      }
    )
    )
  }

  function createContentRow(content, i) {
    return (
      <div className="row">
        <div className="answers">{answerLetters[i]}</div>
        <input
          type="radio"
          value={answerLetters[i]}
          id={section + "_" + index + "_" + i}
          name={section + "_" + index}
          disabled={mode === c.SUBMITED_MODE}
          onChange={(e) => handleAnswers(e.target.value)}
          style={{ height: "16px", width: "16px", verticalAlign: "middle" }}
        />
        <label htmlFor={section + "_" + index + "_" + i}>
          {content}
        </label>
      </div>
    )
  }

  return (
    <div className="question single-choice-question-answers">
      {
        guild &&
        <h3>Questions {nQuestions.from}-{nQuestions.to}</h3>
      }
      <div className="guild">{guild}</div>
      <div className="content">{content}</div>
      {
        answers.map((v, i) => createContentRow(v, i))
      }
      {
        mode === c.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}