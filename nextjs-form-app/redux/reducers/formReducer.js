import {
  SUBMIT_FORM_REQUEST,
  SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_FAILURE,
  RESET_FORM,
} from '../actions/formActions';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
        error: null,
      };
    case SUBMIT_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default formReducer;
