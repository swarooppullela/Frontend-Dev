import { all } from 'redux-saga/effects';
import { watchFormSubmit } from './formSaga';

export default function* rootSaga() {
  yield all([
    watchFormSubmit(),
  ]);
}
