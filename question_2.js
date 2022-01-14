/* Question # 2 */
const process = require('process')

const getResults = require('./utils/helper')

const runQuestion_2 = async () => {
  /* Process argv filtering */
  if (process.argv[2] === '--help') {
    console.log('HELP')
  }
  const res = await getResults(true)
  console.log(res)
  const { pop_total_by_state } = res
  console.log()
  console.log(
    `CREATE TABLE pop_total_by_state (name text, population integer);`
  )
  console.log()
  for (let val of pop_total_by_state) {
    for (let [keys, value] of Object.entries(val)) {
      console.log(
        `INSERT INTO pop_total_by_state (name, population) VALUES (${keys}, ${value})`
      )
    }
  }
}

runQuestion_2()
