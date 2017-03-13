/This IIFE will contain all of the logic required to build the polling line chart
  // http://stackoverflow.com/questions/37252425/d3-js-d3-min-js1-error-path-attribute-d-expected-number-mnan-nanlnan-na

// const pollChart = (function(window, d3) {
//
//   var svg, data, x, y, xAxis, yAxis, dim, chartWrapper, line, path, margin = {},
//     width, height;
//
//   d3.tsv('./data/2016ElectionData.csv', convert, init); //load data, convert, then initialize chart
//
//   function convert(d) {
//     return {
//       date: new Date(d.end_date),
//       valueTrump: +d.Trump,         // convert string to number
//       valueClinton: +d.Clinton         // convert string to number
//     };
//   }
//
//   //called once the data is loaded
//   function init(csv) {
//     data = csv;
//
//     //initialize scales
//     xExtent = d3.extent(data, function(d, i) {
//       return d.date;
//     });
//     yExtent = d3.extent(data, function(d, i) {
//       return d.value;
//     });
//     var x = d3.scaleTime().domain(xExtent)
//     var y = d3.scaleLinear().domain(yExtent);
//
//     // x = d3.time.scale().domain(xExtent); v3 syntax
//     // y = d3.scale.linear().domain(yExtent); v3 syntax
//
//     //initialize axis
//     // xAxis = d3.svg.axis().orient('bottom');
//     // yAxis = d3.svg.axis().orient('left');
//
//     var xAxis = d3.axisBottom()
//       .scale(x);
//
//     var yAxis = d3.axisLeft()
//       .scale(y);
//
//     //the path generator for the line chart
//     line = d3.line()
//       .x(function(d) {
//         return x(d.date)
//       })
//       .y(function(d) {
//         return y(d.valueTrump)
//       });
//
//     //initialize svg
//     svg = d3.select('#pollChartLocation').append('svg');
//     chartWrapper = svg.append('g');
//     path = chartWrapper.append('path').datum(data).classed('line', true);
//     chartWrapper.append('g').classed('x axis', true);
//     chartWrapper.append('g').classed('y axis', true);
//
//     //render the chart
//     render();
//   }
//
//   function render() {
//
//     //get dimensions based on window size
//     updateDimensions(window.innerWidth);
//
//     //update x and y scales to new dimensions
//     x.range([0, width]);
//     y.range([height, 0]);
//
//     //update svg elements to new dimensions
//     svg
//       .attr('width', width + margin.right + margin.left)
//       .attr('height', height + margin.top + margin.bottom);
//     chartWrapper.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//
//     //update the axis and line
//     xAxis.scale(x);
//     yAxis.scale(y);
//
//     svg.select('.x.axis')
//       .attr('transform', 'translate(0,' + height + ')')
//       .call(xAxis);
//
//     svg.select('.y.axis')
//       .call(yAxis);
//
//     path.attr('d', line);
//   }
//
//   function updateDimensions(winWidth) {
//     margin.top = 20;
//     margin.right = 50;
//     margin.left = 50;
//     margin.bottom = 50;
//
//     width = winWidth - margin.left - margin.right;
//     height = 500 - margin.top - margin.bottom;
//   }
//
//   return {
//     render: render
//   }
// })(window, d3);
