/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  radius = 5;

const data = [
  { x: 0.4, y: 0.6 },
  { x: 0.1, y: 0.2 },
  { x: 0.8, y: 0.9 },
  { x: 0.6, y: 0.4 },
  { x: 0.2, y: 0.3 },
  { x: 0.9, y: 0.1 },
  { x: 0.6, y: 0.8 },
]

// 1. make x scale
const xScale = d3.scaleLinear()
  .domain([0, 1])
  .range([0, width]);

// 2. make y scale
const yScale = d3.scaleLinear()
  .domain([0, 1])
  .range([height, 0]);

// 3. append svg
const svg = d3.select("#container")
  .append('svg')
  .attr("width", width)
  .attr("height", height)
  .style("overflow", "visible");

// 4. create axes
const xAxis = d3.axisBottom(xScale)
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis)

const yAxis = d3.axisLeft(yScale)
svg.append("g")
  // .attr("transform", `translate(0, ${height})`)
  .call(yAxis)


// 5. create circles
const circles = svg.selectAll('.circle')
  .data(data)
  .join("circle")
  .attr("class", "circle")
  .attr("r", radius)
  .attr("cx", (d, i) => {
    // console.log(d)
    // console.log(i)
    return xScale(d.x)
  })
  .attr("cy", d => yScale(d.y))

  // (booger, index) => xScale(booger.x)