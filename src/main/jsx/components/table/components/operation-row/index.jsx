import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import Cell from "../grant";

class OperationRow extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {operation, rankCodes} = this.props;
    return (
      <tr className={styles.row}>
        <td>{operation.operationCode}</td>
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

export default connect(mapStateToProps)(OperationRow);