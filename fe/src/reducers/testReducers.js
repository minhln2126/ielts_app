import { constants as c } from "../constants";

let initialState = {
  status: c.LOADING,
  tests: [],
  userAnswers: [],
  mode: c.DO_TEST_MODE,
  hint: "",
  audioTime: 0,
};

//ca: current answers sheet, s: sectionID, q: question index, a: answers
function answerQuestion(ca, s, q, a) {
  console.log(ca, s, q, a);
  let rs = [...ca];

  //init state
  if (!rs[s]) rs[s] = [];
  if (!rs[s][q]) rs[s][q] = [];

  if (
    [
      c.MATCHING_PARAGRAPH,
      c.COMPLETE_DIAGRAM,
      c.COMPLETE_TABLE,
      c.COMPLETE_PARAGRAPH,
    ].includes(a.type)
  ) {
    console.log(a);
    rs[s][q][a.index] = a.value;
    return rs;
  }

  if (
    [
      c.SINGLE_CHOICE_QUESTION_ANSWERS,
      c.TRUE_FALSE_NOT_GIVEN,
      c.SENTENCE_COMPLETION,
    ].includes(a.type)
  ) {
    rs[s][q] = [a.value];
    return rs;
  }

  let index = rs[s][q].indexOf(a);
  if (index !== -1) rs[s][q].splice(index, 1);
  else rs[s][q].push(a);
  return rs;
}

export function test(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_TEST_PAGE":
      return {
        ...state,
        test: [],
        status: c.LOADING,
      };
    case c.GET_TEST_SUCCESS:
      return {
        ...state,
        test: action.test,
        status: c.SUCCESS,
      };
    case c.GET_TEST_FAILURE:
    case c.GET_TESTS_FAILURE: {
      return {
        ...state,
        status: c.FAILURE,
      };
    }
    case c.GET_TESTS_SUCCESS:
      return {
        ...state,
        status: c.SUCCESS,
        tests: action.tests,
        totalPage: action.totalPage,
      };
    case c.ANSWER_QUESTION:
      return {
        ...state,
        userAnswers: answerQuestion(
          state.userAnswers,
          action.s,
          action.q,
          action.a
        ),
      };
    case c.SUBMIT_TEST:
      return {
        ...state,
        mode: c.SUBMITED_MODE,
      };
    case c.VIEW_HINT:
      return {
        ...state,
        hint: action.hint,
      };
    case c.FORWARD_AUDIO: {
      console.log(action.time);
      return {
        ...state,
        audioTime: action.time,
      };
    }
    default:
      return state;
  }
}
