/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = 400;
const margin = 40;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.activity))
      .range([margin, width - margin])
      .paddingInner(0.1)
      .paddingOuter(0.2)

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...data.map(d => d.count))])
      .range([height - margin, margin])

    const xAxis = d3.axisBottom(xScale)
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale)
    svg.append("g")
      .attr("transform", `translate(${margin}, 0)`)
      .call(yAxis)

    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.activity))
      .attr("y", d => yScale(d.count))
      .attr("width", xScale.bandwidth)
      .attr("height", d => height - yScale(d.count) - margin)
})