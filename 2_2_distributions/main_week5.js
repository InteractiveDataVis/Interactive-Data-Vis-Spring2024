
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.9,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(data => {
  console.log(data)

  /* SCALES */
  // xscale  - linear,count
  const xScale = d3.scaleLinear()
    .domain([0,1])
    .range([margin.left, width - margin.right])

  // yscale - linear,count
  const yScale = d3.scaleLinear()
    .domain([0, 100])
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

  let currentData = data;

  const obj1 = { key: true }
  const obj2 = { key: true }
  console.log(obj1 === obj2)

  const draw = () => {
    svg.selectAll(".circle")
      .data(currentData, d=> d.BioID)
      .join(
        enter => enter
          .append("circle")
          .attr("class", "circle")
          .attr("r", radius)
          .attr("cx", d => xScale(d.ideologyScore2020))
          .attr("cy", d => yScale(d.envScore2020))
          .attr("fill", d => colorScale(d.Party)),
        update => update
          .call(sel => sel.transition()
          .attr("cx", d => xScale(d.ideologyScore2020))
          .attr("cy", d => yScale(d.envScore2020)))
        , 
        exit => exit
          .call(sel => sel.transition()
            .duration(2500)  
            .attr("r", 0)
            .remove()
          )
      )
  }
  draw();

  setTimeout(() => {
    currentData = data.filter(d => d.Party === "R")
    console.log("its run!", currentData)
    draw();

  }, 3000)

  

  
});