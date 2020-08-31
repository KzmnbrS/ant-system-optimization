const API = 'http://localhost:8080';

async function* ACOSeries(payload, iterations,
                          URL = `${API}/ACOSeries`)
{
  console.log(payload);
  const fetchSeries = async (pheromones) => {
    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        environment: {
          ...payload.environment,
          pheromones
        },

        iterations
      })
    }).then(response => response.json());
  };

  let
    current = await fetchSeries(payload.environment.pheromones),
    lastKey = iterations - 1;


  while (1) {
    let future = fetchSeries(current[lastKey]);
    for (let i = 0; i < iterations; ++i)
      yield current[i];

    current = await future;
  }
}

export default ACOSeries;
