const simple = type => payload => ({
  type, payload
});

export const
  SET_INITIAL_PHEROMONE = '@opt/set_initial_pheromone',
  setInitialPheromone = simple(SET_INITIAL_PHEROMONE),

  SET_EVAPORATION_RATE = '@opt/set_evaporation_rate',
  setEvaporationRate = simple(SET_EVAPORATION_RATE),

  SET_AGENTS_QUANTITY = '@opt/set_agents_quantity',
  setAgentsQuantity = simple(SET_AGENTS_QUANTITY),

  SET_AGENT_CAPACITY = '@opt/set_agent_capacity',
  setAgentCapacity = simple(SET_AGENT_CAPACITY),

  SET_ALPHA = '@opt/set_alpha',
  setAlpha = simple(SET_ALPHA),

  SET_BETA = '@opt/set_beta',
  setBeta = simple(SET_BETA);
