const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');

exports.output = async (src, dest) => {
  await fs.mkdir('./output/', err => {
    if (err) {
      console.log('Error: failed to make dir. path: ./output/')
    }
  });
  let list = []
  if ( typeof src === 'object' ) {
    for (key in src) {
      list.push( { user: key, count: src[key] } );
    }
  } else if (Array.isArray(src)) {
    list = src;
  } else {
    throw new Error('Error: src is invalid. src must be array or object.');
  }
  const writer = createObjectCsvWriter({
    path: dest,
    encoding: 'utf8',
    header: [
      { id: 'user', title: 'User Name'},
      { id: 'count', title: 'Count'}],
    append: false
  })
  await writer.writeRecords(list)
    .then(() => {
      console.log(`write done. path: ${dest}`)
    })
    .catch(err => {
      console.log(err)
    })
}