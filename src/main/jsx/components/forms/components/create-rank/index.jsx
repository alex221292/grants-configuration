import React, {Component} from "react";

export default class CreateRankForm extends Component {

  constructor(props) {
    super(props);
    this.state = {inputValue: ''}
  }

  render() {
    return (
      <form>
        <h3>Create new Rank Code</h3>
        <label>
          Code:
          <input type="text" name="name" onChange={(e) => this.setState({inputValue: e.target.value})}/>
        </label>
        <br/>
        <button type="button" onClick={() => {
          this.props.submitAction(this.state.inputValue);
          this.props.closeAction();
        }
        }>
          Сохранить!
        </button>
      </form>
    );
  }

}
