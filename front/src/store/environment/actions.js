import {parseGraph} from "./parseGraph";


export const
  GRAPH_UPDATE = {
    SUCCESS: '@env/graph_update.success',
    FAILURE: '@env/graph_update.failure',
    REQUEST: '@env/graph_update.request'
  },

  graphUpdate = {
    success: ({vertices, weights}) => ({
      type: GRAPH_UPDATE.SUCCESS,
      vertices, weights
    }),

    failure: error => ({
      type: GRAPH_UPDATE.FAILURE,
      error
    }),

    request: text => dispatch => {
      dispatch({
        type: GRAPH_UPDATE.REQUEST,
        text
      });

      try {
        dispatch(graphUpdate.success(parseGraph(text)))
      } catch (error) {
        dispatch(graphUpdate.failure(error))
      }
    }
  },

  SET_NEST = '@env/set_nest',
  setNest = payload => ({type: SET_NEST, payload}),

  SET_FOOD = '@env/set_food',
  setFood = payload => ({type: SET_FOOD, payload});
