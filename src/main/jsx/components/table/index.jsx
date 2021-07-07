import React, {Component} from "react";
import {connect} from "react-redux";

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    if (this.props.rankCodes) {
      return (
        <table>
          <thead>
          <tr>
            <th/>
            {
              this.props.rankCodes.map(rank => {
                return (
                  <th>{rank}</th>
                )
              })
            }
          </tr>
          </thead>
          <tbody>
          {
            this.props.grants.map(grant => {
              return (
                <tr>
                  <td>{grant.operationCode}</td>
                  {
                    this.props.rankCodes.map(rank => {
                      return (
                        <td>
                          {grant[rank] === true ? 1 : 0}
                        </td>
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
    rankCodes: state.rankCodes
  }
};

export default connect(mapStateToProps)(Table);