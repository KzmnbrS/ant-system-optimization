import React from 'react';
import classNames from 'classnames';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Switch, Route, Redirect, withRouter} from "react-router";

import './App.scss';

import Environment from './pages/Environment';
import Optimization from './pages/Optimization';
import Simulation from './pages/Simulation';


// Routing table index
const PATH = 0;

class App extends React.Component {
  render() {
    const
      steps = getSteps(),
      routes = getRoutes(),
      startPage = routes[0][PATH],
      {location, state} = this.props;

    return (
      <>
        <header className="row pt-3 justify-content-center">
          <ul className="nav">
            {steps
              .map((step, index) => {
                const
                  isActive =
                    routes[index][PATH] === location.pathname,
                  isReachable = isStepReachable(index, state);

                return (
                  <li key={step} className="nav-item">
                    <Link
                      className={
                        classNames('nav-link', {
                          active: isActive,
                          disabled: !isReachable
                        })
                      }

                      to={routes[index][PATH]}
                    >
                      {step}
                    </Link>
                  </li>
                )
              })}
          </ul>
        </header>

        <main className="row p-3 justify-content-center">
          <Switch>
            {
              routes
                .filter((_, index) => isStepReachable(index, state))
                .map(([path, component]) => (
                  <Route
                    key={path}
                    exact path={path}
                    render={() => component}
                  />
                ))
            }

            <Redirect from='/' to={startPage}/>
          </Switch>
        </main>
      </>
    );
  }
}

export default withRouter(connect(state => ({state}))(App));

function getSteps() {
  return [
    'Environment',
    'Optimization',
    'Simulation'
  ];
}

function getRoutes() {
  return [
    ['/environment', <Environment/>],
    ['/optimization', <Optimization/>],
    ['/simulation', <Simulation/>]
  ];
}

function isStepReachable(index, state) {
  if (index === 2 /* Simulation */) {
    const
      env = state.environment,
      opt = state.optimization,
      {quantity, capacity, alpha, beta} = opt.agents;

    return (
      (env.nest && env.food) &&
      (opt.initialPheromone > 0
        && quantity > 0
        && capacity > 0
        && (alpha > 0 && beta >= 0) || (alpha >= 0 && beta > 0)
      )
    );
  }

  return true;
}