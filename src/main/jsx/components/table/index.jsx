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
    const {rankCodes, grants, operationCodes} = this.props;
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
                    rankCodes.map(rank => {
                      return (
                        <Cell isActive={grants[operationCode][rank]}
                              onClick={() => this.props.toggleGrant(operationCode, rank)}/>
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
    grants: state.grants,
    rankCodes: state.rankCodes,
    operationCodes: state.operationCodes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleGrant: (operationCode, rankCode) => dispatch({type: TYPE_CODES.TOGGLE_GRANT, operationCode: operationCode, rankCode: rankCode})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);