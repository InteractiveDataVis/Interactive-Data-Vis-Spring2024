/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = 20;
  radius = 3;
let svg;
let xScale;
let yScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedParty: "All" 
};

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  console.log("init is run")

  // + SCALES
  xScale = d3.scaleLinear()
  .domain([0, 1])
  .range([0, width])

  yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0])

  // + AXES

  // + UI ELEMENT SETUP
  const dropdown = d3.select("#dropdown")
  
  const options = dropdown
    .selectAll("option")
    .data(["All", "R", "D"])
    .join("option")
    .attr("value", d => d)
    .text(d => d)

  dropdown
    .on("change", (event) => {
      // console.log(event.target.value)
      state.selectedParty = event.target.value;
      console.log(state)
      draw();
    })

  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("overflow", "visible")

  // + CALL AXES

  draw();
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {
  console.log("draw is run")

  const filteredData = state.data.filter(d => 
    state.selectedParty === "All" || d.Party === state.selectedParty
  )

  // + FILTER DATA BASED ON STATE
  const circles = svg.selectAll(".circle")
    .data(filteredData, d => d.BioID)
    .join(
      enter => enter.append("circle")
        .attr("cx", d => xScale(d.ideologyScore2020))
        .attr("cy", d => yScale(d.envScore2020)),
      update => update
        .call(sel => sel.transition()
          .attr("cx", d => xScale(d.ideologyScore2020))
          .attr("cy", d => yScale(d.envScore2020))),
      exit => exit.remove()
    )
    .attr("class", "circle")
    .attr("r", radius)
  
}