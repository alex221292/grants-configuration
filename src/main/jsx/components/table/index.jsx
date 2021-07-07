import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import cn from "classnames";
import Cell from "./components/cell";
import {TYPE_CODES} from "../../const";

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {rankCodes, operationCodes} = this.props;
    if (rankCodes) {
      return (
        <table>
          <thead>
          <tr>
            <th/>
            {
              rankCodes.map(rank => {
                return (
                  <th>{rank}</th>
                )
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            operationCodes.map((operationCode) => {
              return (
                <tr>
                  <td>{operationCode}</td>
                  {
                    rankCodes.map(rankCode => {
                      return (
                        <Cell operationCode={operationCode}
                              rankCode={rankCode}
                        />
                      )
                    })
                  }
                </tr>
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
    operationCodes: state.operationCodes
  }
};

export default connect(mapStateToProps)(Table);