import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import Cell from "../grant";
import {deleteOperation} from "../../../../actions";

class OperationRow extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {operation, rankCodes} = this.props;
    return (
      <tr className={styles.row} key={operation.operationCode}>
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
    deleteOperation: (operationCode) => deleteOperation(dispatch, operationCode)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationRow);