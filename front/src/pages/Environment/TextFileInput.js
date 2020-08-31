import React from "react";
import {idForLabel} from "../util";


class TextFileInput extends React.Component {
  constructor(props) {
    super(props);

    this.label = props.label;
    this.id = idForLabel(props.label);
  }

  render() {
    const {handleChange} = this.props;

    return (
      <>
        <label
          className="btn btn-light"
          htmlFor={this.id}
        >
          {this.label}
        </label>

        <input
          id={this.id}

          type="file"
          style={{display: "none"}}

          onChange={event => {
            let
              file = event.target.files[0],
              reader = new FileReader();

            event.target.value = "";
            reader.onloadend = () => {
              handleChange(reader.result);
            };

            reader.readAsText(file);
          }}
        />
      </>
    )
  }
}

export default TextFileInput;
