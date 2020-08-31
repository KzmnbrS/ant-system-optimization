import React from 'react';
import {connect} from "react-redux";

import Model from './Model';
import ACOSeries from './series';


function squareMatrix(size, initialValue) {
  return Array(size).fill(
    Array(size).fill(initialValue)
  )
}

class Simulation extends React.Component {
  state = {
    pheromones: null,
    series: null,
    isActive: false,
    intervalId: null
  };

  componentWillMount() {
    const
      {
        vertices, weights,
        nest, food
      } = this.props.environment,

      {
        evaporationRate, initialPheromone
      } = this.props.optimization,

      {
        alpha, beta,
        quantity,
        capacity,
      } = this.props.optimization.agents,

      pheromones = squareMatrix(
        vertices.length, initialPheromone
      );

    this.setState({
      pheromones,

      series: ACOSeries({
        environment: {
          vertices,
          weights,
          pheromones,

          nest: vertices.indexOf(nest),
          food: vertices.indexOf(food)
        },

        optimization: {
          evaporationRate,
          quantity,
          capacity,

          alpha, beta
        },
      }, 10)
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.invertPlayingState)
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  tick = async () => {
    let {series} = this.state;
    this.setState({
      pheromones: (await series.next()).value
    });
  };

  invertPlayingState = () => {
    let {intervalId} = this.state;

    if (intervalId !== null) {
      clearInterval(intervalId);
      this.setState({
        isActive: false,
        intervalId: null
      });
    } else {
      this.setState({
        isActive: true,
        intervalId: setInterval(this.tick, 100)
      })
    }
  };

  render() {
    const
      {vertices, weights, nest, food} = this.props.environment;

    return (
      <div className="row h-100 w-100">
        <Model
          id="network"
          vertices={vertices}
          weights={weights}
          pheromones={this.state.pheromones}
          nest={nest}
          food={food}
        />
      </div>
    )
  }
}

export default connect(state => ({
  environment: state.environment,
  optimization: state.optimization
}))(Simulation);
