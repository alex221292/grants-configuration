import React, {Component} from "react";
import {connect} from "react-redux";
import {readGrants, toggleGrant} from '../../api';
import {columnsConfig} from "./columnsConfig";
import Loader from "react-loader-spinner";
import {TYPE_CODES} from "../../const";
import Table from "../table";
import CssBaseline from '@material-ui/core/CssBaseline'

class SecurityMatrix extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchGrants();
  }

  fetchGrants() {
    readGrants()
      .then(res => {
        this.props.loadGrants(res);
      });
  }

  renderTable() {
    if (this.props.rankCodes) {
      if (this.props.grants) {
        return (
          <div>
            <CssBaseline/>
            <Table
              columns={columnsConfig(this.props.rankCodes)}
              data={this.props.grants}
              getCellProps={cellInfo => ({
                style: {
                  background: cellInfo.value === true ? 'linear-gradient(135deg, #009b0a, #eae215, white)' : null,
                  borderRadius: '0 30px 30px 0'
                },
                onClick: () => {
                  if (cellInfo.column.Header !== 'Codes') {
                    toggleGrant(
                      cellInfo.row.values.operationCode,
                      cellInfo.column.Header
                    )
                      .then(res => {
                        this.props.loadGrants(res);
                      });
                  }
                }
              })}
            />
          </div>
        )
      } else {
        return (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
          />
        )
      }
    } else {
      return (
        <div>
          PLEASE INIT DATA
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grants: state.grants,
    rankCodes: state.rankCodes,
    hashCode: state.hashCode
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadGrants: (res) => dispatch({type: TYPE_CODES.LOAD_GRANTS, data: res.data})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecurityMatrix);