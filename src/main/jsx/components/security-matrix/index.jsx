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
    readGrants()
      .then(res => {
        this.props.loadGrants(res);
      });
  }

  renderTable(columns) {
    if (this.props.grants) {
      return (
        <div>
          <CssBaseline/>
          <Table
            columns={columns}
            data={this.props.grants}
            getCellProps={cellInfo => ({
              style: {
                backgroundColor: cellInfo.value === true ? 'green' : null
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
  }

  render() {
    const {rankCodes} = this.props;
    const columns = columnsConfig(rankCodes);
    return (
      <div>
        {this.renderTable(columns)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadGrants: (res) => dispatch({type: TYPE_CODES.LOAD_GRANTS, data: res.data}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecurityMatrix);