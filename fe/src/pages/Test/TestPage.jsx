import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { constants as c } from "../../constants";
import { testActions } from "../../actions/testActions";
import { appActions } from "../../actions/appActions";

import ParagraphDisplay from "./child/ParagraphDisplay";
import Loading from "../../components/Common/Loading";
import Timer from "../../components/Common/Timer";
import Section from "./child/Section";
import ScriptDisplay from "./child/ScriptDisplay";

function TestPage(props) {
  const dispatch = useDispatch();

  const test = useSelector((state) => state.test.test);
  const mode = useSelector((state) => state.test.mode);
  const answer = useSelector((state) => state.test.userAnswers);

  const [currentSection, setCurrentSection] = useState(0);

  //qs: questions, from: star index from ?
  function calNumberOfQuestionsInSection(qs, from) {
    return qs.reduce(
      (rs, v) => {
        let nSubQuestions = 1;
        if (v.type === c.MATCHING_PARAGRAPH) nSubQuestions = v.content.length;
        if (
          [
            c.MULTIPLE_CHOICE,
            c.COMPLETE_TABLE,
            c.COMPLETE_DIAGRAM,
            c.COMPLETE_PARAGRAPH,
          ].includes(v.type)
        )
          nSubQuestions = v.trueAnswers.length;
        if (!rs[v.type])
          rs[v.type] = {
            from: rs.to + 1,
            to: rs.to + nSubQuestions,
          };
        else
          rs[v.type] = {
            ...rs[v.type],
            to: rs.to + nSubQuestions,
          };
        rs.to += nSubQuestions;
        return rs;
      },
      { to: from, from: from + 1 }
    );
  }

  //number of questions in each section number of each type of question
  let numberOfQuestions = useMemo(() => {
    if (!test) return [];
    return test.sections.reduce(
      (prev, v, i) => {
        let rs = { ...prev };
        rs.sections[i] = calNumberOfQuestionsInSection(v.questions, prev.total);
        rs.total = rs.sections[i].to;
        return rs;
      },
      {
        sections: [],
        total: 0,
      }
    );
  }, [test]);

  let hints = useMemo(() => {
    if (!test) return [];
    return test.sections[currentSection].questions.reduce((prev, v) => {
      return prev.concat(v.explain);
    }, []);
  }, [test, currentSection]);

  const isTrueAnswer = (arr, a) => {
    return arr.filter(
      (v) =>
        v.replace(/’/g, "'").toLowerCase().trim() === a.toLowerCase().trim()
    )[0];
  };

  const calQuestionScore = (type, userAnswers, trueAnswers) => {
    if (userAnswers.length > trueAnswers.length) return 0;

    let result = { score: 0, total: 0 };

    if (
      [
        c.SENTENCE_COMPLETION,
        c.TRUE_FALSE_NOT_GIVEN,
        c.SINGLE_CHOICE_QUESTION_ANSWERS,
      ].includes(type)
    ) {
      result.total += trueAnswers.length;
      if (userAnswers[0] && isTrueAnswer(trueAnswers, userAnswers[0]))
        result.score++;
    }

    if (
      [
        c.COMPLETE_TABLE,
        c.COMPLETE_DIAGRAM,
        c.COMPLETE_PARAGRAPH,
        c.MATCHING_PARAGRAPH,
      ].includes(type)
    ) {
      result.total += trueAnswers.length;
      userAnswers.forEach((usrAnswer, i) => {
        console.log(trueAnswers[i], usrAnswer);
        if (
          trueAnswers[i].toLowerCase().trim() === usrAnswer.toLowerCase().trim()
        )
          result.score++;
      });
    }

    if (
      [c.MULTIPLE_CHOICE, c.MULTIPLE_CHOICE_QUESTION_ANSWERS].includes(type)
    ) {
      result.total += trueAnswers.length;
      userAnswers.forEach((usrAnswer, i) => {
        console.log(trueAnswers[i], usrAnswer);
        if (usrAnswer && isTrueAnswer(trueAnswers, usrAnswer)) result.score++;
      });
    }

    console.log(type, result);
    return result;
  };

  const calSectionScore = (s, sid) => {
    let result = { score: 0, total: 0 };
    s.questions.forEach((q, i) => {
      let userAnswers = answer[sid] && answer[sid][i] ? answer[sid][i] : [];
      let rs = calQuestionScore(q.type, userAnswers, q.trueAnswers);
      result.score += rs.score;
      result.total += rs.total;
    });
    return result;
  };

  const calScore = () => {
    let result = { score: 0, total: 0 };
    test.sections.forEach((s, i) => {
      let rs = calSectionScore(s, i);
      result.score += rs.score;
      result.total += rs.total;
    });
    console.log(result);
    return result;
  };

  useEffect(() => {
    if (!test) dispatch(testActions.getTestById(props.match.params.id));
    document.getElementById("header").style.display = "none";
    document.getElementById("footer").style.display = "none";
  }, []);

  return test ? (
    <>
      <div className="bottom">
        <h4>{test.name}</h4>
        <button>
          <i className="fas fa-chevron-down"></i>
          &nbsp; Danh sách câu hỏi
        </button>
      </div>
      <div className="test-page container">
        {test.type === c.READING && (
          <ParagraphDisplay
            hints={hints}
            section={currentSection}
            title={test.sections[currentSection].paragraph.title}
            content={test.sections[currentSection].paragraph.content}
            numberOfQuestions={numberOfQuestions.sections[currentSection]}
          />
        )}
        {test.sections &&
          test.sections.map((v, i) => (
            <Section
              sectionId={i}
              type={test.type}
              isActive={currentSection === i}
              questions={test.sections[i].questions}
              numberOfQuestions={numberOfQuestions.sections[i]}
            />
          ))}
        {test.type === c.LISTENING && (
          <ScriptDisplay
            hints={hints}
            script={test.script}
            section={currentSection}
            title={test.sections[currentSection].paragraph.title}
            content={test.sections[currentSection].paragraph.content}
            numberOfQuestions={numberOfQuestions.sections[currentSection]}
          />
        )}
        <div className={`section-control ${test.type}`}>
          <h4>Section {currentSection + 1}</h4>
          <div className="row">
            <button
              disabled={currentSection === 0}
              className={currentSection === 0 ? "disable" : ""}
              onClick={() => setCurrentSection(currentSection - 1)}
            >
              <i className="fas fa-chevron-left"></i>
              &nbsp; Trước
            </button>
            <button
              disabled={currentSection === test.sections.length - 1}
              onClick={() => setCurrentSection(currentSection + 1)}
              className={
                currentSection === test.sections.length - 1 ? "disable" : ""
              }
            >
              Sau &nbsp;
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="top">
        <button
          className="head-home"
          onClick={() => (window.location.href = "/")}
        >
          <i className="fas fa-chevron-left"></i>
          &nbsp; Trang chủ
        </button>
        <Timer time={60} isSubmitted={mode === c.SUBMITED_MODE} />
        <button
          onClick={() => {
            dispatch({ type: c.SUBMIT_TEST });
            let score = calScore();
            dispatch(
              appActions.changePopup(c.SCORE_POPUP, "", {
                score: `${score.score}/${score.total}`,
              })
            );
          }}
          className="submit-btn"
        >
          Nộp bài &nbsp;
          <i className="fas fa-location-arrow"></i>
        </button>
      </div>
    </>
  ) : (
    <div className="test-page">
      <Loading />
    </div>
  );
}

export { TestPage };
