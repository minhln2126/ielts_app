import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { constants } from "../../../constants";
import { testActions } from "../../../actions/testActions";

export default function CompleteParagraphQuestion(props) {
  const dispatch = useDispatch();

  const mode = useSelector(state => state.test.mode);
  const userAnswers = useSelector(state => state.test.userAnswers);

  const {
    title,
    content,
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

  function findHint(i) {
    dispatch({
      type: constants.VIEW_HINT,
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
        type: constants.COMPLETE_PARAGRAPH
      }
    ))
  }

  function createContentRow(c) {
    let contentArr = c.split("_");
    return (
      <div className="content">
        {
          contentArr.map((v, i) => {
            return (
              <>
                {v}
                {
                  i < contentArr.length - 1
                  &&
                  <input
                    type="text"
                    disabled={mode === constants.SUBMITED_MODE}
                    onBlur={(e) => handleAnswers(e.target.value, i)}
                  />
                }
              </>
            )
          })
        }
      </div>
    )
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
                      onClick={() => dispatch({ type: constants.FORWARD_AUDIO, time: from })}
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

  return (
    <div className="question complete-paragraph">
      {
        guild &&
        <h3>Questions {nQuestions.from}-{nQuestions.to}</h3>
      }
      <div className="guild">{guild}</div>
      <div className="wrapper">
        <h5 className="title">{title}</h5>
        {
          content.map(v => createContentRow(v))
        }
      </div>
      {
        mode === constants.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}