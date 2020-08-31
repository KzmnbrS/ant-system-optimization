import * as $ from './actions';


const initialState = {
  initialPheromone: 1,
  evaporationRate: .2,

  agents: {
    quantity: 1000,
    capacity: 1,

    alpha: 1,
    beta: 2
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case $.SET_INITIAL_PHEROMONE:
      return {...state, initialPheromone: action.payload};

    case $.SET_EVAPORATION_RATE:
      return {...state, evaporationRate: action.payload};

    case $.SET_AGENTS_QUANTITY:
      return {
        ...state,
        agents: {
          ...state.agents,
          quantity: action.payload
        }
      };

    case $.SET_AGENT_CAPACITY:
      return {
      ...state,
      agents: {
        ...state.agents,
        capacity: action.payload
      }
    };

    case $.SET_ALPHA:
      return {
        ...state,
        agents: {
          ...state.agents,
          alpha: action.payload
        }
      };

    case $.SET_BETA:
      return {
        ...state,
        agents: {
          ...state.agents,
          beta: action.payload
        }
      };

    default:
      return state;
  }
}
