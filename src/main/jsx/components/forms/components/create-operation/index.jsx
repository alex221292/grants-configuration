import React, {Component} from "react";

export default class CreateOperationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      enabled: false
    }
  }

  render() {
    return (
      <form>
        <h3>Create new Operation</h3>
        Code:
        <input type="text" name="operationCode" onChange={(e) => this.setState({inputValue: e.target.value})}/>
        Enabled:
        <input type="checkbox" name="enabled" onChange={(e) => this.setState({enabled: e.target.checked})}/>
        <button type="button" onClick={() => {
          this.props.submitAction(this.state.inputValue, this.state.enabled);
          this.props.closeAction();
        }
        }>
          Сохранить!
        </button>
      </form>
    );
  }

}
