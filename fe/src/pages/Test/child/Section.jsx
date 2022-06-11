import { useEffect } from "react";
import { constants as c } from "../../../constants";
import CompleteDiagramQuestion from "./CompleteDiagramQuestion";
import CompleteParagraphQuestion from "./CompleteParagraphQuestion";
import CompleteTableQuestion from "./CompleteTableQuestion";
import MatchingQuestion from "./MatchingQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import MultipleChoiceQuestionAnswers from "./MultipleChoiceQuestionAnswers";
import SentenceCompletionQuestion from "./SentenceCompletionQuestion";
import SingleChoiceQuestionsAnswers from "./SingleChoiceQuestionsAnswers";
import TrueFalseQuestion from "./TrueFalseQuestion";
export default function Section(props) {
  let { sectionId, questions, numberOfQuestions, isActive } = props;
  function createMultipleChoice(q, i) {
    return (
      <MultipleChoiceQuestion
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.MULTIPLE_CHOICE]}
      />
    )
  }
  function createMultipleChoiceQA(q, i) {
    return (
      <MultipleChoiceQuestionAnswers
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.MULTIPLE_CHOICE_QUESTION_ANSWERS]}
      />
    )
  }
  function createMatchingParagraph(q, i) {
    return (
      <MatchingQuestion
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.MATCHING_PARAGRAPH]}
      />
    )
  }
  function createSingleChoiceQA(q, i) {
    return (
      <SingleChoiceQuestionsAnswers
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.SINGLE_CHOICE_QUESTION_ANSWERS]}
      />
    )
  }
  function createSentenceCompletion(q, i) {
    return (
      <SentenceCompletionQuestion
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.SENTENCE_COMPLETION]}
      />
    )
  }
  function createTrueFalseQuestion(q, i) {
    return (
      <TrueFalseQuestion
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.TRUE_FALSE_NOT_GIVEN]}
      />
    )
  }
  function createCompleteDiagram(q, i) {
    return (
      <CompleteDiagramQuestion
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.COMPLETE_DIAGRAM]}
      />
    )
  }
  function createCompleteTable(q, i) {
    return (
      <CompleteTableQuestion
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.COMPLETE_TABLE]}
      />
    )
  }
  function createCompleteParagraph(q, i) {
    return (
      <CompleteParagraphQuestion
        {...q}
        index={i}
        section={sectionId}
        nQuestions={numberOfQuestions[c.COMPLETE_PARAGRAPH]}
      />
    )
  }
  let questionCreator = {
    [c.COMPLETE_TABLE]: (q, i) => createCompleteTable(q, i),
    [c.MULTIPLE_CHOICE]: (q, i) => createMultipleChoice(q, i),
    [c.COMPLETE_DIAGRAM]: (q, i) => createCompleteDiagram(q, i),
    [c.COMPLETE_PARAGRAPH]: (q, i) => createCompleteParagraph(q, i),
    [c.MATCHING_PARAGRAPH]: (q, i) => createMatchingParagraph(q, i),
    [c.TRUE_FALSE_NOT_GIVEN]: (q, i) => createTrueFalseQuestion(q, i),
    [c.SENTENCE_COMPLETION]: (q, i) => createSentenceCompletion(q, i),
    [c.SINGLE_CHOICE_QUESTION_ANSWERS]: (q, i) => createSingleChoiceQA(q, i),
    [c.MULTIPLE_CHOICE_QUESTION_ANSWERS]: (q, i) => createMultipleChoiceQA(q, i),
  }
  useEffect(() => { console.log(sectionId) }, [])
  return (
    <div
      className={
        "section "
        + (isActive ? " active " : " ")
        + props.type
      }>
      <h4>Section {sectionId + 1}: QUESTIONS {numberOfQuestions.from}-{numberOfQuestions.to}</h4>
      {
        questions.map((v, i) => questionCreator[v.type] && questionCreator[v.type](v, i))
      }
    </div>
  )
}