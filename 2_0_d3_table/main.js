/* CONSTANTS AND GLOBALS */

// console.log(d3)

/* LOAD DATA */
d3.csv('./roster.csv')
  .then(students => {
    console.log("students", students)

    const container = d3.select("#container")
    console.log("container", container)

    // container
    //   .selectAll(".student")
    //   .data(students)
    //   .join("div")
    //   .attr("class", "student")
    //   .text((d) => d.First) //  d["First"]

    const table = container
      .append("table")
      .attr("class", "roster")

    const rows = table.selectAll(".student")
      .data(students)
      .join("tr")
      .attr("class", "student")

    rows
      .append("td")
      .text(d => d.First)

    rows
      .append("td")
      .text(d => d.Last)

    console.log("rows", rows)

    // rows.selectAll("td.cell")
    //   .data(d => {
    //     console.log(d)
    //     return [d.First, d.Last]
    //   })
    //   .join("td")
    //   .attr("class", "cell")
    //   .html(d => d)





  })