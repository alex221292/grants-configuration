export const dataExtractor = (grants) => {
  let data = [];
  grants.map(grant => {
    let row = {
      operationCode: grant.operationCode
    }
    grant.ranks.map(rank => {
      row[rank.rankCode] = rank.enabled;
    })
    data.push(row);
  })
  return data;
}