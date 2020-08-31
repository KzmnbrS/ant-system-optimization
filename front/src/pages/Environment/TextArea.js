import React from "react";
import {idForLabel} from "../util";


class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.label = props.label;
    this.id = idForLabel(props.label);
  }

  render() {
    const {value, handleChange} = this.props;

    return (
      <>
        <label htmlFor={this.id}>
          {this.label}
        </label>

        <textarea
          id={this.id}
          className="form-control"

          rows={10}

          value={value}
          onChange={event => handleChange(event.target.value)}
        />
      </>
    )
  }
}

export default TextArea;
