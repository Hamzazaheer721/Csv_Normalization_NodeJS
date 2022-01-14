/* Question # 1 */
const process = require('process')
const getResults = require('./utils/helper')

// Filtering process.argv
if (process.argv.length < 3) console.log('Type something in flag section')
switch (process.argv[2]) {
  case '--help':
    console.log(
      '--states\t\tpressing states will print all the states and respective populations'
    )
    console.log(
      '--population\t\tGiving this flag will print all the information related to population'
    )
    break
  case '--states':
    getResults(false, process.argv[2])
    break
  case '--population':
    getResults(false, process.argv[2])
    break
  default:
    break
}
