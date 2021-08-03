import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./styles.less"
import confirmationIcon from "./images/confirm.png"
import {applyOperationCodeFilter} from "../../../../actions";

class OperationFilterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredOperationCode: ''
    }
  }

  render() {
    return (
      <div className={styles.flex}>
        <input type="text" name="filteredOperationCode" onChange={(e) => this.setState({filteredOperationCode: e.target.value})}/>
        <img src={confirmationIcon} alt={'ok'} onClick={() => this.props.applyOperationCodeFilter(this.state.filteredOperationCode)}/>
      </div>
    )
  }

}

const mapStateToProps = () => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    applyOperationCodeFilter: (operationCode) => applyOperationCodeFilter(dispatch, operationCode)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationFilterForm);