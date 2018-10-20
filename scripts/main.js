console.clear();

// setting up plot config constants for sizes/margins
var margin = {top: 20, right: 20, bottom: 50, left: 100}; // beware of comma
    	width = 400 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

// add the graph canvas to the body of the webpage



var svg2 = d3.select('#g2').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background-color', '#ffffff')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    
    
var svg = d3.select('#g1').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background-color', '#ffffff')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

d3.csv(
  'data/coffee_date.csv', function(error, rawData) {
  // group the data by regions
    const data = d3.nest()
    .key(function(d){return d.region})
    .rollup(function(s) {
      return d3.sum(s, function(v) {return v.sales;});
    })
  .entries(rawData);
  console.log(data);
  
    d3.scaleBand().rangeRound([0, width])
 
    var xScale = d3.scalePoint()
      .domain(data.map(d => d.key))
      .range([0, width])
      .padding(.1);
  
    var xScale = d3.scaleBand()
          .domain(data.map(d => d.key))
          .range([0, width])
          .padding(.5);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) + 1])
      .range([height, 0]) // value -> display

    // setup fill color
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // draw bars
    svg.selectAll(".bar")
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.key))
        .attr('y', d => yScale(d.value))
        .attr('height', d => height - yScale(d.value))
        .attr('width', 40)
        .style('fill', d => colorScale(d.key));

    // x-axis
    var xAxis = d3.axisBottom().scale(xScale);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
      .append("text")
        .attr("class", "label")
        .attr("x", width/2)
        .attr("y", 40)
        .style("text-anchor", "end")
        .text("Region");
    // text label for the x axis
    svg.append("text")             
       .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Region");

    // y-axis
    var yAxis = d3.axisLeft().scale(yScale);
  
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale))
      .append("text")
        .attr("class", "label")
        .text("Coffee Sales (USD)")
        .attr("transform", "translate(-60, 120), rotate(-90)")
        .style("text-anchor", "end")
    
     // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.right - 100)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Coffee Sales (USD)");  
     
    //label for 1st chart
     svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (margin.top - 28) + ")")
      .style("text-anchor", "middle")
      .text("Coffee Sales By Region (USD)");
});

d3.csv(
  'data/coffee_date.csv', function(error, rawData) {
  // group the data by product
    const data = d3.nest()
    .key(function(d){return d.category})
    .rollup(function(s) {
      return d3.sum(s, function(v) {return v.sales;});
    })
  .entries(rawData);
  console.log(data);
  
    d3.scaleBand().rangeRound([0, width])
 
    var xScale = d3.scalePoint()
      .domain(data.map(d => d.key))
      .range([0, width])
      .padding(.1);
  
    var xScale = d3.scaleBand()
          .domain(data.map(d => d.key))
          .range([0, width])
          .padding(.5);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) + 1])
      .range([height, 0]) // value -> display

    // setup fill color
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // draw bars
    svg2.selectAll(".bar")
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.key))
        .attr('y', d => yScale(d.value))
        .attr('height', d => height - yScale(d.value))
        .attr('width', 40)
        .style('fill', d => colorScale(d.key));
    
    // x-axis
    var xAxis = d3.axisBottom().scale(xScale);

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
      .append("text")
        .attr("class", "label")
        .attr("x", width/2)
        .attr("y", 40)
        .style("text-anchor", "middle")
        .text("Product");
    
    // text label for the x axis
    svg2.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Product");
    
    //label for 2nd chart
    svg2.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (margin.top - 28) + ")")
      .style("text-anchor", "middle")
      .text("Coffee Sales By Product (USD)");

    // y-axis
    var yAxis = d3.axisLeft().scale(yScale);
  
    svg2.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale))
      .append("text")
        .attr("class", "label")
        .text("Coffee Sales (USD)")
        .attr("transform", "translate(-60, 120), rotate(-90)")
        .style("text-anchor", "end")
    // text label for the y axis
    svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.right - 100)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Coffee Sales (USD)");      
});