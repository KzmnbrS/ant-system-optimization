import React from "react";
import {idForLabel} from "../util";


class Input extends React.Component {
  constructor(props) {
    super(props);

    this.label = props.label;
    this.id = idForLabel(props.label);
  }

  render() {
    const {value, handleChange, inputProps} = this.props;

    return (
      <>
        <label htmlFor={this.id}>
          {this.label}
        </label>

        <input
          id={this.id}

          value={value}
          onChange={event => handleChange(event.target.value)}

          {...inputProps}
        />
      </>
    )
  }
}

export default Input;
