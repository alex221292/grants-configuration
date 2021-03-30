export const columnsConfig = (ranks = []) => {
  let mainColumns = [];
  mainColumns.push(
    {
      Header: 'Operations',
      columns: [
        {
          Header: 'Codes',
          accessor: 'operationCode'
        },
      ],
    }
  )
  let rankColumns = [];
  ranks.map(rank => {
    rankColumns.push(
      {
        Header: rank,
        accessor: rank,
      }
    )
  })
  mainColumns.push(
    {
      Header: 'Ranks',
      columns: rankColumns
    }
  )

  return mainColumns;
}