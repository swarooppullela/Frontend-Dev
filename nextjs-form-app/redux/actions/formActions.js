// Redux action types
export const SUBMIT_FORM_REQUEST = 'SUBMIT_FORM_REQUEST';
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
export const SUBMIT_FORM_FAILURE = 'SUBMIT_FORM_FAILURE';
export const RESET_FORM = 'RESET_FORM';

// Action creators
export const submitFormRequest = (formData) => ({
  type: SUBMIT_FORM_REQUEST,
  payload: formData,
});

export const submitFormSuccess = (data) => ({
  type: SUBMIT_FORM_SUCCESS,
  payload: data,
});

export const submitFormFailure = (error) => ({
  type: SUBMIT_FORM_FAILURE,
  payload: error,
});

export const resetForm = () => ({
  type: RESET_FORM,
});
