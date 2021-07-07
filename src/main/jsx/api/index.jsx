export function updateDataBySql(query, sessionKey) {
  return fetch(
    '/cib-grants/data/sql/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        sessionKey: sessionKey
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

export function getGeneratedSqlScripts(grants, rankCodes, operationCodes) {
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
          operationCodes: operationCodes
        }
      })
    }
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('failed to get generated sql scripts with status: ' + res.status);
    }
  }).catch(e => console.log(e))
}