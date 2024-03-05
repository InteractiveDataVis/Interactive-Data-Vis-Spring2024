/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7;
  // margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/stateCapitals.csv", d3.autoType),
]).then(([geojson, capitals]) => {
  console.log(geojson)
  console.log(capitals)

  const svg = d3
    .select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  // SPECIFY PROJECTION
  const projection = d3.geoAlbersUsa()
    .fitSize(
      [width, height],
      geojson
    );

  // DEFINE PATH FUNCTION
  const geoPathGen = d3.geoPath(projection)

  // APPEND GEOJSON PATH  
  svg.selectAll(".us-state")
    .data(geojson.features)
    .join("path")
    .attr("class", "us-state")
    .attr("stroke", "black")
    .attr("fill", "transparent")
    .attr("d", d => {
      return geoPathGen(d)
    })
  
  // APPEND DATA AS SHAPE
  svg.selectAll(".us-capital")
    .data(capitals)
    .join("circle")
    .attr("class", "us-capital")
    .attr("r", 3)
    // .attr("cx", 20)
    // .attr("cy", 20)
    .attr("transform", d => {
      const point = projection([d.longitude, d.latitude])
      return `translate(${point[0]},${point[1]})` 
    })


});