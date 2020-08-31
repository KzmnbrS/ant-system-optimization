import * as $ from './actions';


const initialState = {
  text: '',
  error: undefined,
  vertices: undefined,
  weights: undefined,

  nest: undefined,
  food: undefined
};

export default function (state = initialState, action) {
  switch (action.type) {
    case $.GRAPH_UPDATE.REQUEST:
      return {
        ...state,
        text: action.text
      };

    case $.GRAPH_UPDATE.SUCCESS:
      return {
        ...state,
        error: undefined,
        vertices: action.vertices,
        weights: action.weights
      };

    case $.GRAPH_UPDATE.FAILURE:
      return {
        ...state,
        error: action.error
      };

    case $.SET_NEST:
      return {
        ...state,
        nest: action.payload
      };

    case $.SET_FOOD:
      return {
        ...state,
        food: action.payload
      };

    default:
      return state;
  }
}
