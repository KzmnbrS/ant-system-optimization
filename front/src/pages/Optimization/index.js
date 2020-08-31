import React from "react";
import {connect} from "react-redux";

import * as actions from "../../store/optimization/actions";
import Input from "./Input";


function Optimization(props) {
  const {
    dispatch,
    initialPheromone, evaporationRate, agents
  } = props;

  return (
    <div className="col-lg-8">
      <form>
        <div className="form-group row">
          <div className="col-md-2 col-sm-12">
            Pheromone
          </div>

          <div className="col">
            <Input
              label="Initial value"

              inputProps={{
                type: "number",
                className: "form-control",

                min: 1
              }}

              value={initialPheromone}
              handleChange={
                value => dispatch(actions.setInitialPheromone(parseInt((value))))
              }
            />
          </div>


          <div className="col">
            <Input
              label="Evaporation rate"

              inputProps={{
                type: "range",
                className: "form-control-range",
                min: 0, max: 95, step: 5
              }}

              value={evaporationRate * 100}
              handleChange={
                value => dispatch(actions.setEvaporationRate(value / 100))
              }
            />

            <div className="row justify-content-between pl-3 pr-3">
              <output>0</output>
              <output>{evaporationRate}</output>
              <output>0.95</output>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-2 col-sm-12">
            Agents
          </div>

          <div className="col">
            <Input
              label="Quantity"

              inputProps={{
                type: "number",
                className: "form-control",

                min: 1
              }}

              value={agents.quantity}
              handleChange={
                value => dispatch(actions.setAgentsQuantity(parseInt((value))))
              }
            />
          </div>

          <div className="col">
            <Input
              label="Single capacity"

              inputProps={{
                type: "number",
                className: "form-control",

                min: 1
              }}

              value={agents.capacity}
              handleChange={
                value => dispatch(actions.setAgentCapacity(parseInt((value))))
              }
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-2 col-sm-12">
            Heuristics
          </div>

          <div className="col">
            <Input
              label="Alpha"

              inputProps={{
                type: "number",
                className: "form-control",

                min: 0
              }}

              value={agents.alpha}
              handleChange={
                value => dispatch(actions.setAlpha(parseFloat((value))))
              }
            />
          </div>

          <div className="col">
            <Input
              label="Beta"

              inputProps={{
                type: "number",
                className: "form-control",

                min: 0
              }}

              value={agents.beta}
              handleChange={
                value => dispatch(actions.setBeta(parseFloat((value))))
              }
            />
          </div>
        </div>
      </form>
    </div>
  )
}


export default connect(state => ({...state.optimization}))(Optimization);
