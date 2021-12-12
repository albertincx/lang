import produce from 'immer';

const initialState = {
  loading: false,
  error: false,
  task_result: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'task_error':
        draft.task_result = false;
        draft.loading = false;
        break;
      case 'task_success':
        draft.task_result = action.data;
        draft.loading = false;
        break;
      case 'task_loading':
        // draft.error = action.error;
        draft.loading = true;
        break;
    }
  });

export default appReducer;
