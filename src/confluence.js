const request = require('request-promise')
const config = require('../config.json')

const commonOption = {
  method: 'GET',
  auth: {
    username: config.user,
    password: config.token
  },
  headers: {
    'Accept': 'application/json'
  }
}

exports.getContents = async (type) => {
  const options = {...commonOption, ...{
    url: `${config.url}/wiki/rest/api/content?type=${type}&expand=history&limit=10000`
  }}
  const results = await requestWrapper(options);
  const createPageCount = {};
  results.forEach(item => {
    const user = item.history.createdBy.displayName;
    if (!createPageCount[user]) {
      createPageCount[user] = 0;
    }
    createPageCount[user]++
  })
  return createPageCount;
}

async function requestWrapper(options) {
  return await request (options)
    .then(res => {
      const body = JSON.parse(res);
      return body.results;
    })
    .catch(err => {
      throw new Error(err);
    });
}