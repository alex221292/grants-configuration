import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import OperationRow from "./components/operation-row"
import PopupWrapper from "../popup/components/popup-wrapper";
import Rank from "./components/rank";
import CreateRankForm from "../forms/components/create-rank";
import CreateOperationForm from "../forms/components/create-operation";
import {addOperation, addRank, deleteRank} from "../../actions";
import AdditionalButton from "../buttons/additional-button";

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {rankCodes, operations} = this.props;
    if (rankCodes) {
      return (
        <div className={styles.grants_box}>
          <div className={styles.buttons_box}>
            <AdditionalButton caption={'CREATE RANK'}>
              <PopupWrapper>
                <CreateRankForm submitAction={(rankCode) => this.props.addRank(rankCode)}/>
              </PopupWrapper>
            </AdditionalButton>
            <AdditionalButton style={{marginLeft: 55 + 'px'}} caption={'CREATE OPERATION'}>
              <PopupWrapper>
                <CreateOperationForm
                  submitAction={(operationCode, enabled) => this.props.addOperation(operationCode, enabled)}/>
              </PopupWrapper>
            </AdditionalButton>
          </div>
          <div className={styles.table_box}>
            <table className={styles.table}>
              <thead>
              <tr>
                <th/>
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
          </div>
        </div>
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