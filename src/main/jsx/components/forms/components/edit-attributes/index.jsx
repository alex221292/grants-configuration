import React, {Component} from "react";
import plusIcon from "./images/plus.png";
import removeIcon from "./images/rubbish.png";

export default class EditAttributesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attributes: props.attributes || []
    }
  }

  addAttribute() {
    let {attributes} = this.state
    attributes.push({})
    this.setState(
      {
        ...this.state,
        attributes: attributes
      }
    )
  }

  deleteAttribute(idx) {
    let {attributes} = this.state
    attributes.splice(idx, 1)
    this.setState(
      {
        ...this.state,
        attributes: attributes
      }
    )
  }

  changeCode(idx, value) {
    const {attributes} = this.state
    let attribute = attributes[idx]
    if (attribute) {
      attribute.code = value
    }
    this.setState(
      {
        ...this.state,
        attributes: attributes
      }
    )
  }

  changeValue(idx, value) {
    const {attributes} = this.state
    let attribute = attributes[idx]
    if (attribute) {
      attribute.value = value
    }
    this.setState(
      {
        ...this.state,
        attributes: attributes
      }
    )
  }

  renderAttribute(attribute, idx) {
    return (
      <div>
        Code: <input type="text" name="code" value={attribute.code} onChange={(event => this.changeCode(idx, event.target.value))}/>
        Value: <input type="text" name="value" value={attribute.value} onChange={(event => this.changeValue(idx, event.target.value))}/>
        <img src={removeIcon} alt={"remove"} onClick={() => this.deleteAttribute(idx)}/>
      </div>
    )
  }

  render() {
    const {operationCode, rankCode} = this.props
    return (
      <form>
        <h3>Edit Grant Attributes</h3>
        <h4>{operationCode}/{rankCode}</h4>
        {this.state.attributes.map((attribute, idx) => {
          return this.renderAttribute(attribute, idx)
        })}
        <div>
          <img src={plusIcon} alt={"plus"} onClick={() => this.addAttribute()}/>
        </div>
        <button type="button" onClick={() => {
          this.props.submitAction(operationCode, rankCode, this.state.attributes);
          this.props.closeAction();
        }
        }>
          Сохранить!
        </button>
      </form>
    );
  }

}