export function readGrants(sessionKey) {
  return fetch(
    '/cib-grants/data/grants/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionKey: sessionKey
      })
    }
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('failed to read grants with status: ' + res.status);
    }
  }).catch(e => console.log(e))
}

export function toggleGrant(operationCode, rankCode, sessionKey) {
  return fetch(
    '/cib-grants/data/grant/toggle', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operationCode: operationCode,
        rankCode: rankCode,
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

export function getGeneratedSqlScripts() {
  return fetch(
    '/cib-grants/data/sql/generate'
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('failed to get generated sql scripts with status: ' + res.status);
    }
  }).catch(e => console.log(e))
}