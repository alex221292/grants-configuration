import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import Row from "./components/operation-row"
import {TYPE_CODES} from "../../const";

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
            <th onClick={() => this.props.togglePopup()}/>
            {
              rankCodes.map(rank => {
                return (
                  <th className={styles.header}>{rank}</th>
                )
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            operations.map((operation) => {
              return (
                <Row operation={operation}/>
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
    togglePopup: () => dispatch({type: TYPE_CODES.TOGGLE_POPUP})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);