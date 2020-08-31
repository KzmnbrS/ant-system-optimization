import React from "react";
import {connect} from "react-redux";
import {graphUpdate, setNest, setFood} from "../../store/environment/actions";

import TextArea from "./TextArea";
import TextFileInput from "./TextFileInput";
import Select from "./Select";



function Environment(props) {
  const {
    dispatch,
    text,
    vertices,
    nest, food
  } = props;

  return (
    <div className="col-lg-8">
      <form>
        <div className="row">
          <div className="col-lg-9">
            <div className="form-group">
              <TextArea
                label="Graph"
                value={text}
                handleChange={text => dispatch(graphUpdate.request(text))}
              />
            </div>

            <TextFileInput
              label="Load from file"
              handleChange={text => dispatch(graphUpdate.request(text))}
            />
          </div>

          <div className="col-lg-3">
            <div className="form-group">
              <Select
                label="Nest"

                value={nest}
                options={vertices}
                omit={[food]}

                handleChange={value => dispatch(setNest(value))}
              />

              <Select
                label="Food"

                value={food}
                options={vertices}
                omit={[nest]}

                handleChange={value => dispatch(setFood(value))}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}


export default connect(state => ({...state.environment}))(Environment);
