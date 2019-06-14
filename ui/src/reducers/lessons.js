import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as action from '../actions';

const lessons = handleActions({
  [action.fetchLessonsSuccess]: (state, { payload: { data } }) => data,
}, []);

const fetchInit = {
  state: 'initial',
  source: null,
  errMessage: '',
};

const fetchLessonsData = handleActions({
  [action.fetchLessonsRequest]: (state, { payload: { source } }) => ({
    state: 'requested',
    source,
    errMessage: '',
  }),
  [action.fetchLessonsSuccess]: () => ({
    state: 'succeed',
    source: null,
    errMessage: '',
  }),
  [action.fetchLessonsFailure]: (state, { payload: { e } }) => ({
    state: 'failed',
    source: null,
    errMessage: e.message,
  }),
}, fetchInit);

const topic = handleActions({
  [action.selectTopic]: (state, { payload: { id } }) => id,
}, null);

const currentLessonId = handleActions({
  [action.getCurrentLessonId]: (state, { payload: { lessonId } }) => lessonId,
},
null);

const currentParagraphId = handleActions({
  [action.getCurrentParagraphId]: (state, { payload: { paragraphId } }) => paragraphId,
},
null);

export default combineReducers({
  fetchLessonsData,
  lessons,
  topic,
  currentParagraphId,
  currentLessonId,
});
