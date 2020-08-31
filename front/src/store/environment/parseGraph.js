export function parseGraph(text) {
  let
    vertices = [],
    weights = [];

  text.split('\n').forEach(line => {
    let
      [source, destination] = line.match(verticesPattern),
      [weight] = line.match(parametersPattern),

      edge = {source, destination, weight};

    let [i, j] = pushVertices(
      weights, vertices,
      [edge.source, edge.destination]
    );

    weights[i][j] = weights[j][i] = parseInt(edge.weight);
  });

  return {vertices, weights};
}

const
  verticesPattern = /\w+/g,
  parametersPattern = /\d+/g;

function pushVertices(matrix, header, vertices) {
  return vertices.map(vertex => {
    if (!header.includes(vertex)) {
      header.push(vertex);

      let dim = matrix.length;
      matrix.push(Array(dim).fill(0));
      matrix.forEach(row => row.push(0));
    }

    return header.indexOf(vertex);
  });
}
