import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import OperationRow from "./components/operation-row"
import PopupWrapper from "../popup/components/popup-wrapper";
import Rank from "./components/rank";
import CreateRankForm from "../forms/components/create-rank";
import CreateOperationForm from "../forms/components/create-operation";
import {addOperation, addRank, deleteRank} from "../../actions";

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {rankCodes, operations} = this.props;
    if (rankCodes) {
      return (
        <table className={styles.table}>
          <thead>
          <tr>
            <th className={styles.flex}>
              <div className={styles.flex}>
                <PopupWrapper
                  caption={'Create Rank'}
                  popupCode={"addRank"}
                >
                  <CreateRankForm submitAction={(rankCode) => this.props.addRank(rankCode)}/>
                </PopupWrapper>
              </div>
              <div className={styles.flex}>
                <PopupWrapper
                  caption={'Create Operation'}
                  popupCode={"addOperation"}
                >
                  <CreateOperationForm submitAction={(operationCode, enabled) => this.props.addOperation(operationCode, enabled)}/>
                </PopupWrapper>
              </div>
            </th>
            {
              rankCodes.map(rankCode => {
                return (
                  <Rank rankCode={rankCode} deleteRank={(rankCode) => this.props.deleteRank(rankCode)}/>
                )
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            operations.map((operation) => {
              return (
                <OperationRow operation={operation}/>
              )
            })
          }
          </tbody>
        </table>
      )
    } else {
      return (
        <div>
          Please execute authorization scripts
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  return {
    rankCodes: state.rankCodes,
    operations: state.operations
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRank: (rankCode) => addRank(dispatch, rankCode),
    deleteRank: (rankCode) => deleteRank(dispatch, rankCode),
    addOperation: (operationCode, enabled) => addOperation(dispatch, operationCode, enabled)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);