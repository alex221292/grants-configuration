export function updateDataBySql(query) {
  return fetch(
    '/cib-grants/data/sql/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    }
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('failed to toggle grant with status: ' + res.status);
    }
  }).catch(e => console.log(e))
}

export function getGeneratedSqlScripts(grants, rankCodes, operations) {
  return fetch(
    '/cib-grants/data/sql/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          grants: grants,
          rankCodes: rankCodes,
          operations: operations
        }
      })
    }
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('failed to get generated sql scripts with status: ' + res.status);
    }
  }).catch(e => {
    console.log("ERROR1")
    console.log(e)
  })
}