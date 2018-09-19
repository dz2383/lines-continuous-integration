import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 300 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-4')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Normal scales
const xPositionScale = d3
  .scaleLinear()
  .domain([1, 25])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([10, 50])
  .range([height, 0])

const line = d3
  .line()
  .x(d => {
    return xPositionScale(d.day)
  })
  .y(d => {
    return yPositionScale(d.temperature)
  })

d3.csv(require('./data-singleline-cimmeria.csv'))
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

function ready(datapoints) {
  /* Draw your area */

  /* Draw a single line */
  svg
    .append('path')
    .datum(datapoints)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', 'black')

  /* Add in your axes */

  const xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  const yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
}
