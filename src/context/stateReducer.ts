import type { Action, State } from "../types";

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_EVENTS':
      return {
        ...state,
        loading: true,
      };
    case 'SET_EVENTS':
      return {
        ...state,
        events: [...state.events, ...action.payload.events],
        currentPage: state.currentPage + 1,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    case 'RESET_EVENTS':
      return {
          ...state,
          events: [],
          currentPage: 0,
          totalPages: 0,
      };
    default:
      return state;
  }
};

export default stateReducer;