/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(data => {
  console.log(data)

  /* SCALES */
  // xscale  - linear,count
  const xScale = d3.scaleLinear()
    .domain([0,1])
    // .range([0, width])
    // .range([margin, width - margin])
    .range([margin.left, width - margin.right])

  // yscale - linear,count
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    // .range([height, 0])
    .range([height - margin.bottom, margin.top])

  // color scale
  const colorScale = d3.scaleOrdinal()
    .domain(["D", "R"])
    .range(["blue", "red"])

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // axis scales
  const xAxis = d3.axisBottom(xScale)
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis)

  const yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis)

  /* DRAW CIRCLES */

  // svg.selectAll(".circle")
  //   .data(data)
  //   .join("circle")
  //   .attr("cx", (d, i) => xScale(d.ideologyScore2020))
  //   .attr("cy", (d, i) => yScale(d.envScore2020))
  //   .attr("r", radius)
  //   .attr("fill", (d, i) => {
  //     if (d.Party === 'D') return "blue"
  //     else if (d.Party === 'R') return "red"
  //     else return "purple"
  //   })
    

  // 1. Grow from a radius of 0 to radius

  // svg.selectAll(".circle")
  //   .data(data)
  //   .join("circle")
  //   .attr("cx", (d, i) => xScale(d.ideologyScore2020))
  //   .attr("cy", (d, i) => yScale(d.envScore2020))
  //   .attr("r", 0) // initial value
  //   .attr("fill", (d, i) => {
  //     if (d.Party === 'D') return "blue"
  //     else if (d.Party === 'R') return "red"
  //     else return "purple"
  //   })
  //   .call(sel => sel.transition()
  //     .delay(500)
  //     .duration(1500)
  //     .attr("r", radius)) // final value


  // 2. Change from black to its given color
  // svg.selectAll(".circle")
  //   .data(data)
  //   .join("circle")
  //   .attr("cx", (d, i) => xScale(d.ideologyScore2020))
  //   .attr("cy", (d, i) => yScale(d.envScore2020))
  //   .attr("r", radius)
  //   .style("fill", "gray") // initial value
  //   .call(sel => sel.transition()
  //     .delay(500)
  //     .duration(1500)
  //     .style("fill", d => colorScale(d.Party))) // final value

  // 3. Move from the bottom up, left to right, top to bottom, right to left.
  // svg.selectAll(".circle")
  //   .data(data)
  //   .join("circle")
  //   .attr("cx", xScale(0.5)) // initial value
  //   .attr("cy", (d, i) => yScale(d.envScore2020))
  //   .attr("r", radius)
  //   .style("fill", d => colorScale(d.Party))
  //   .call(sel => sel.transition()
  //     .delay(500)
  //     .duration(1500)
  //     .attr("cx", (d, i) => xScale(d.ideologyScore2020))) // final value
  

    svg.selectAll(".circle")
      .data(data)
      .join("circle")
      .attr("cx", xScale(0.5)) 
      .attr("cy", yScale(50)) // initial value
      .attr("r", radius)
      // .style("fill", d => colorScale(d.Party))
      .call(sel => sel.transition()
        .delay((d, i) => 50 * i)
        .duration(1500)
        .attr("cx", (d, i) => xScale(d.ideologyScore2020))
        .attr("cy", (d, i) => yScale(d.envScore2020))) // final value

});