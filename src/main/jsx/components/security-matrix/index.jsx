import React, {Component} from "react";
import {connect} from "react-redux";
import {readGrants, toggleGrant} from '../../api';
import {columnsConfig} from "./columnsConfig";
import styled from 'styled-components'
import Loader from "react-loader-spinner";
import {TYPE_CODES} from "../../const";
import Table from "../table";

const Styles = styled.div`
  padding: 1rem;

  .user {
    background-color: blue;
    color: white;
  }

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

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
    if (this.props.data) {
      return (
        <Styles>
          <Table
            columns={columns}
            data={this.props.data}
            getRowProps={row => ({
              style: {
                background: row.index % 2 === 0 ? 'rgba(0,0,0,.1)' : 'white',
              },
            })}
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
        </Styles>
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