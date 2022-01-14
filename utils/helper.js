const fs = require('fs')
const Papa = require('papaparse')

// format Results
const showFormattedResults = (result, isPopulation = false) => {
  console.log()
  result.pop_total_by_state.forEach((res) => {
    Object.keys(res).forEach((key) => {
      console.log(`${key} ==> ${res[key]}`)
    })
  })
  if (isPopulation) {
    console.log(
      `Average Population per State ==> ${result.average_pop_per_state}`
    )
    console.log(`Average Population per Zip ==> ${result.average_pop_per_zip}`)
  }
  console.log()
}

// Callback Method to obtain the asynchoronous result
const getMethod = (flag, result) => {
  switch (flag) {
    case '--states':
      showFormattedResults(result)
      break
    case '--population':
      showFormattedResults(result, true)
    default:
      break
  }
}

//Reading Files
const readCSV = (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      skipEmptyLines: true,
      header: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        resolve(results.data)
      }
    })
  })
}

const getResults = async (rtn, flag = '') => {
  let states = await readCSV('./csv/states.csv')
  let population = await readCSV('./csv/population-by-zip-code.csv')

  /* Splitting the zip codes with spaces */
  states.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (key === 'Zip Codes') {
        obj[key] = obj[key].split(' ')
      }
    })
  })

  /* Computing the population */
  let result = { pop_total_by_state: [] }
  let sum = 0
  let totalSum = 0
  states.forEach((stateObj) => {
    sum = 0
    stateObj['Zip Codes'].forEach((zip) => {
      population.forEach((populationObj) => {
        if (+populationObj['Zip Code'] === +zip) {
          sum = sum + +populationObj['Population']
          totalSum = totalSum + +populationObj['Population']
        }
      })
    })
    result = {
      ...result,
      pop_total_by_state: [
        ...result.pop_total_by_state,
        { [stateObj['Long']]: sum }
      ]
    }
  })

  /* Calulcation of Avg. population per zip and per states */
  const avg_per_zip = totalSum / population.length
  const avg_per_state = totalSum / states.length
  result = {
    ...result,
    average_pop_per_zip: avg_per_zip,
    average_pop_per_state: avg_per_state
  }

  if (rtn) return result
  getMethod(flag, result)
}

module.exports = readCSV
module.exports = getResults
