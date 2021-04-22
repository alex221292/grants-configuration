import {useTable} from "react-table";
import React from "react";
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const defaultPropGetter = () => ({})

export default function Table({
                                columns,
                                data,
                                getHeaderProps = defaultPropGetter,
                                getColumnProps = defaultPropGetter,
                                getRowProps = defaultPropGetter,
                                getCellProps = defaultPropGetter,
                              }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps(
                [
                  getColumnProps(column),
                  getHeaderProps(column),
                ]
              )}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow hover {...row.getRowProps(getRowProps(row))}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps(
                    [
                      getColumnProps(cell.column),
                      getCellProps(cell),
                    ]
                  )}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}