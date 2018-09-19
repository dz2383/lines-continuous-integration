/* global describe test expect document */

const d3 = require('d3')

/* Fill in our fake web page with our actual index.html */
const fs = require('fs')
document.body.innerHTML = fs.readFileSync('src/index.html')

/* Run the code for our chart */
const chart = require('../src/chart-1')

/* 
  Unit tests
*/

describe('The xPositionScale', () => {
  test('Works for a miscellaneous value', () => {
    const result = chart.xPositionScale(4)
    expect(result).toBe(80)
  })
})

describe('The yPositionScale', () => {
  test('Works for a miscellaneous value', () => {
    const result = chart.yPositionScale(20)
    expect(result).toBe(180)
  })
})

describe('The line generator', () => {
  test('Gives the right results', () => {
    // We'll make some fake temperature data
    const fakeData = [{ day: 1, temperature: 21 }, { day: 4, temperature: 20 }]
    // Feed it to the line generator
    const d = chart.line(fakeData)

    // And see if it gives us the d value
    expect(d).toBe('M0,174L80,180')
  })
})

/*
  Functional tests
*/

describe('The drawn line', () => {
  test('There should only be one', () => {
    const lines = d3.selectAll('#chart-1 svg > g > path')

    expect(lines.size()).toBe(1)
  })

  test('It has 25 days of data associated with it', () => {
    const line = d3.select('#chart-1 svg > g > path')
    expect(line.datum().length).toBe(25)
  })
})

