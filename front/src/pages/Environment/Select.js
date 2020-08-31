import React from "react";
import {idForLabel} from "../util";


class Select extends React.Component {
  constructor(props) {
    super(props);

    this.label = props.label;
    this.id = idForLabel(props.label);
  }

  render() {
    let {value, options, omit, handleChange} = this.props;

    return (
      <>
        <label htmlFor={this.id}>
          {this.label}
        </label>

        <select
          id={this.id}
          className="form-control"

          disabled={!options}

          value={value}
          onChange={event => handleChange(event.target.value)}
        >
          {!value && <option value=""/>}

          {
            options &&
            options
              .filter(option => omit ? !omit.includes(option) : true)
              .map(option =>
                <option key={option} value={option}>{option}</option>
              )
          }
        </select>
      </>
    )
  }
}

export default Select;
