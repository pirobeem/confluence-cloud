
const confluence = require('./confluence')
const { output }  = require('./util')

const main = async () => {
  const pagesCounts = await confluence.getContents('page');
  const blogCounts = await confluence.getContents('blogpost');
  const users = [...Object.keys(pagesCounts, ...Object.keys(blogCounts))]
  const allCounts = {}
  users.forEach(user => {
    if (!allCounts[user]) {
      allCounts[user] = 0;
    }
    allCounts[user] += pagesCounts[user] || 0;
    allCounts[user] += blogCounts[user] || 0;
  })
  await output(allCounts, './output/contentsCountByUser.csv')
}
main()