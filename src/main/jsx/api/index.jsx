export function readGrants() {
  return fetch(
    '/data/grants/read'
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('failed to read grants with status: ' + res.status);
    }
  }).catch(e => console.log(e))
}

export function toggleGrant(operationCode, rankCode) {
  return fetch(
    '/data/grant/toggle', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operationCode: operationCode,
        rankCode: rankCode
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
    '/data/sql/generate'
  ).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject('failed to get generated sql scripts with status: ' + res.status);
    }
  }).catch(e => console.log(e))
}