import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

import { testActions } from "../../../actions/testActions";
import { constants as c } from "../../../constants";

export default function CompleteDiagramQuestion(props) {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.test.mode);
  const userAnswers = useSelector(state => state.test.userAnswers);

  const {
    guild,
    images,
    trueAnswers,
    explain,
    nQuestions,
    index,
    section,
    from } = props;

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
        type: c.COMPLETE_DIAGRAM
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

  function createContentRow(i) {
    return (
      <div className="row">
        <div className="number">
          {nQuestions.from + i}
        </div>
        <input
          type="text"
          onBlur={(e) => handleAnswers(e.target.value, i)}
        />
      </div>
    )
  }

  return (
    <div className="question complete-diagram">
      <h3>Questions {nQuestions.from}-{nQuestions.to}</h3>
      <div className="guild">{guild}</div>
      <div className="image">
        <img src={images[0]} alt="" />
      </div>
      {
        trueAnswers.map((v, i) => createContentRow(i))
      }
      {
        mode === c.SUBMITED_MODE
        &&
        createResultRow()
      }
    </div>
  )
}