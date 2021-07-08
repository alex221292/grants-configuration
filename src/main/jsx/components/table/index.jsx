import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import cn from "classnames";
import Row from "./components/row"

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
            <th/>
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

export default connect(mapStateToProps)(Table);