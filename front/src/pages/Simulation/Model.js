import React, { createRef, Component } from 'react';

import * as vis from 'vis';
import 'vis/dist/vis.min.css';


class Model extends Component {
  state = {
    network: null
  };

  constructor(props) {
    super(props);

    this.id = props.id;
    this.container = createRef();

    let {vertices, nest, food} = this.props;
    this.nest = vertices.indexOf(nest);
    this.food = vertices.indexOf(food);
  }

  componentDidMount() {
    let network = new vis.Network(
      this.container.current,
      {}, {physics: {enabled: false}}
    );

    network.on('dragEnd', this.onDragEnd);
    this.setState({network});
  }

  onDragEnd = () =>
    captureVertices(this.state.network);

  render() {
    const
      {vertices, weights, pheromones} = this.props,
      {network} = this.state;

    let path;
    if (pheromones) {
      path = extractPath(
        weights, pheromones,
        this.nest, this.food
      );

      if (network !== null) {
        network.setData(adaptToVisJS(
          vertices,
          weights, pheromones
        ));
      }
    }

    return (
      <>
        <div id={this.id}
             ref={this.container}
             style={{
               height: '90%',
               width: '100%'
             }}
        />

        <div className="row pb-5 pl-5 w-100" style={{height: '10%'}}>
          {
            path && pathRepresentation(path, vertices, weights)
            || "There's no path discovered yet"
          }
        </div>
      </>
    )

  }
}

export default Model;


const adaptToVisJS = (vertices, weights, pheromones) => {
  let
    nodes = vertices.map(vertex => {
      let position = {};
      if (localStorage.getItem(vertex) !== null)
        position = JSON.parse(localStorage.getItem(vertex));

      return {
        id: vertices.indexOf(vertex),
        label: vertex,
        ...position
      }
    });

  let
    edges = [],
    dim = weights.length;

  for (let i = 0; i < dim; ++i) {
    for (let j = 0; j < dim; ++j) {
      if (i > j || weights[i][j] === 0)
        continue;

      let width = pheromones[i][j] / 100;
      edges.push({
        id: `${i}.${j}`,
        from: i, to: j,
        label: `${weights[i][j]}w ${pheromones[i][j]}p`,
        width
      })
    }
  }

  return {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
  }
};

const captureVertices = network => {
  let networkNodes = network.body.nodes;
  for (const key in networkNodes) {
    if (key.startsWith('edgeId'))
      continue;

    let node = networkNodes[key];
    localStorage.setItem(
      node.options.label,
      JSON.stringify({
        x: node.x,
        y: node.y
      })
    );
  }
};

function extractPath(weights, pheromones, nest, food) {
  let
    path = [],
    visits = new Set(),
    current = nest;

  while (current !== food) {
    let
      county = adjacentEdges(current, weights)
        .filter(edge => !visits.has(`${edge.i}.${edge.j}`));

    if (county.length === 0)
      return null;

    let maxPh, maxEdge;
    county.forEach(edge => {
      let ph = pheromones[edge.i][edge.j];
      if (maxPh === undefined || ph > maxPh) {
        maxPh = ph;
        maxEdge = edge;
      }
    });

    visits.add(`${maxEdge.i}.${maxEdge.j}`);
    visits.add(`${maxEdge.j}.${maxEdge.i}`);

    current = maxEdge.j;
    path.push(maxEdge);
  }

  return path;
}

function adjacentEdges(i, weights) {
  let result = [];
  for (let j = 0; j < weights.length; ++j) {
    if (weights[i][j] !== 0)
      result.push({i, j})
  }

  return result;
}

function pathRepresentation(path, vertices, weights) {
  let pathVertices = [], length = 0;
  path.forEach(edge => {
    let
      start = vertices[edge.i],
      destination = vertices[edge.j];

    if (!pathVertices.includes(start))
      pathVertices.push(start);

    if (!pathVertices.includes(destination))
      pathVertices.push(destination);

    length += weights[edge.i][edge.j]
  });

  return `| ${pathVertices.join(' → ')} | = ${length}`;
}
