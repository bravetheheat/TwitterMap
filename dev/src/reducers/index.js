const initialState = {
  tweets: [],
  keyword: ""
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TWEET":
      return {
        ...state,
        tweets: [...state.tweets, action.payload]
      };
    case "ADD_KEYWORD":
      return {
        ...state,
        keyword: action.payload
      };
    default:
      return state;
  }
};
