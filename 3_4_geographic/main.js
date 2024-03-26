/** CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7;
let svg;

/** APPLICATION STATE */
let state = {
  geojson: null,
  hover_state_name: null,
  hover_lat: null,
  hover_long: null
};


/** LOAD DATA */
Promise.all([ 
  d3.json("../data/usState.json"),
  // more data to load
]).then(([
  geojson,
  // the next data
]) => {
  state.geojson = geojson;
  console.log("state: ", state);
  init();
});

/** INITIALIZING FUNCTION */
function init() {
  console.log("init is run")

  // define projection and geopath
  const projection = d3.geoAlbersUsa()
    .fitSize([width, height], state.geojson)
  
  const geoPathGen = d3.geoPath()
    .projection(projection)

  // create an svg element in our main `d3-container` element
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // add states from the geojson
  svg.selectAll(".states")
    .data(state.geojson.features)
    .join("path")
    .attr("d", d => {
      // console.log(d, geoPathGen(d))
      return geoPathGen(d)
    })
    .style("stroke", "black")
    .style("fill", "transparent")
  // add mouseover check on the state
    .on("mouseenter", function (mouseEvent, d) {
      // console.log(this)
      const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      // console.log(color)
      // d3.select(this).style("fill",color)
      d3.select(mouseEvent.target).style("fill",color)
      state.hover_state_name = d.properties.NAME
      // console.log("mouseevent", mouseEvent)
      // console.log("d", d)

      // d3.select("#hover-content").text(d.properties.NAME)

      state.mouse_x = mouseEvent.clientX
      state.mouse_y = mouseEvent.clientY

      console.log(state)

      draw();
    })

  // add mouseover check on the svg 
  svg.on("mousemove", (mouseEvent) => {
    // console.log("mousemoved", mouseEvent)
    const longLat = projection.invert([mouseEvent.clientX, mouseEvent.clientY])
    // console.log(longLat)
    state.hover_lat = longLat[1];
    state.hover_long = longLat[0];

    // d3.select("#hover-content").text(`
    //   Longitude: ${longLat[0]}
    //   Latitude: ${longLat[1]}
    // `)

    draw();
  })


  draw(); // calls the draw function
}

/** DRAW FUNCTION */
function draw() {
  console.log("draw is run")

// update hover content'

  d3.select("#hover-content")
    .html(`
      <div>State: ${state.hover_state_name}</div>
      <div>Longitude: ${state.hover_long}</div>
      <div>Latitude: ${state.hover_lat}</div>
    `)
    .style("top", `${state.mouse_y}px`)
    .style("left", `${state.mouse_x}px`)

}