import React, {Component} from "react";
import {connect} from "react-redux";
import styles from './styles.less';
import {readGrants, toggleGrant} from '../../api';
import {columnsConfig} from "./columnsConfig";
import styled from 'styled-components'
import {useTable} from 'react-table'
import Loader from "react-loader-spinner";
import {TYPE_CODES} from "../../const";

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

const defaultPropGetter = () => ({})

// Expose some prop getters for headers, rows and cells, or more if you want!
function Table({
                 columns,
                 data,
                 getHeaderProps = defaultPropGetter,
                 getColumnProps = defaultPropGetter,
                 getRowProps = defaultPropGetter,
                 getCellProps = defaultPropGetter,
               }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              // Return an array of prop objects and react-table will merge them appropriately
              {...column.getHeaderProps([
                {
                  className: column.className,
                  style: column.style,
                },
                getColumnProps(column),
                getHeaderProps(column),
              ])}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          // Merge user row props in
          <tr {...row.getRowProps(getRowProps(row))}>
            {row.cells.map(cell => {
              return (
                <td
                  // Return an array of prop objects and react-table will merge them appropriately
                  {...cell.getCellProps([
                    {
                      className: cell.column.className,
                      style: cell.column.style,
                    },
                    getColumnProps(cell.column),
                    getCellProps(cell),
                  ])}
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    readGrants()
      .then(res => {
        this.props.initGrants(res);
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
                      this.props.initGrants(res);
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
        <h1>Demo Component</h1>
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
    initGrants: (res) => dispatch({type: TYPE_CODES.INIT_GRANTS, data: res.data}),
    updateGrant: (operationCode, rankCode) => dispatch(
      {
        type: TYPE_CODES.UPDATE_GRANT,
        operationCode: operationCode,
        rankCode: rankCode
      }
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);