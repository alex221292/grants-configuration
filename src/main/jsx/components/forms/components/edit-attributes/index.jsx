import React, {Component} from "react";

export default class EditAttributesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attributes: []
    }
  }

  render() {
    const {operationCode, rankCode} = this.props
    return (
      <form>
        <h3>Edit Grant Attributes</h3>
        <h4>{operationCode}/{rankCode}</h4>
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