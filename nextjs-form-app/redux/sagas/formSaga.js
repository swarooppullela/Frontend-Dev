import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  SUBMIT_FORM_REQUEST,
  submitFormSuccess,
  submitFormFailure,
} from '../actions/formActions';

// API call function
function* submitFormSaga(action) {
  try {
    const response = yield call(axios.post, '/api/submit-form', action.payload);
    yield put(submitFormSuccess(response.data));
  } catch (error) {
    yield put(submitFormFailure(error.response?.data?.message || error.message));
  }
}

// Watcher saga
export function* watchFormSubmit() {
  yield takeLatest(SUBMIT_FORM_REQUEST, submitFormSaga);
}

// Root saga
export default function* rootSaga() {
  yield watchFormSubmit();
}
