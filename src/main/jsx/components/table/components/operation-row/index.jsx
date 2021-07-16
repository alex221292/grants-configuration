import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import Cell from "../grant";
import {TYPE_CODES} from "../../../../const";

class OperationRow extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {operation, rankCodes} = this.props;
    return (
      <tr className={styles.row}>
        <td>
          {operation.operationCode}
          <span>
            <button onClick={() => this.props.deleteOperation(operation.operationCode)}>X</button>
          </span>
        </td>
        {
          rankCodes.map(rankCode => {
            return (
              <Cell operationCode={operation.operationCode}
                    rankCode={rankCode}
              />
            )
          })
        }
      </tr>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    rankCodes: state.rankCodes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOperation: (operationCode) => dispatch({type: TYPE_CODES.DELETE_OPERATION, operationCode: operationCode})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationRow);