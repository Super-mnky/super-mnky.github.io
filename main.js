// Scrolling Mechanism:
var current_viz = 0
var viz_ids = [
  '#viz_1_1',
  '#viz_1_2',
  '#viz_1_3'
]

d3.graphScroll()
    .graph(d3.selectAll('#graph'))
    .container(d3.select('#main'))
    .sections(d3.selectAll('#sections > div'))
    .on('active', function (i) {
        console.log("At section " + i);
        updateViz(i)
    })

function updateViz(i) {
  d3.select(viz_ids[current_viz]).style('display', 'none')
  d3.select(viz_ids[i]).style('display','block')
  current_viz = i
}

// Getting the data via promise so you can work through irises as well to get the data

var irises = {}

/*
Promise.all([
  d3.csv('iris.csv', function (row) {
    var node = {
        id: +row['Id'], sepalLength: +row['SepalLengthCm'],
        sepalWidth: +row['SepalWidthCm'],petalLength: +row['PetalLengthCm'],
        petalWidth: +row['PetalWidthCm'],species: +row['Species'],
    };
    irises[node-id] = node;

    return node;
  }), 
])
*/

/* Visualizations: */

var width = 680
var widthMargin = 20
var height = 640
var heightMargin = 60

// Display for viz 1.1
function viz11(){

  var lengthScale = d3.scaleLinear()
  .domain([4,8]).range([heightMargin, height-heightMargin]);

  var widthScale = d3.scaleLinear()
  .domain([1.8,4.5]).range([height-heightMargin, heightMargin]);

  function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
  }

  function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
  }

  d3.csv('iris.csv').then(function(dataset) {
    //console.table(dataset)
    var svg = d3.select('#viz_1_1').append('svg')
    .attr('width', width)
    .attr('height', height)

    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
    return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
    })

    svg.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+widthMargin+","+(height-heightMargin)+")")
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

    svg.append('g').attr('class', 'y axis')
    .attr("transform", "translate("+(widthMargin+heightMargin)+",0)")
    .call(d3.axisLeft(widthScale));

    svg.append('text')
      .attr('class', 'label')
      .attr('transform','translate('+((width-widthMargin)/2 - 20)+','+(height-(heightMargin/3))+')')
      .text('Sepal Length');

    svg.append('text')
      .attr('class', 'label')
      .attr('transform','translate('+widthMargin+','+(height - heightMargin)/2+') rotate(90)')
      .text('Sepal Width');

    d3.selectAll('#b2')
    .on('click', function(d){
        // Remove the currently selected classname from that element
          var circles = svg.selectAll("g")
          .data(dataset)
          .enter()
          g.append("circle")
          .attr("r", 3.5)
          .attr('fill', function(d) {
            if (d.Species == 'Iris-virginica') {
              return 'orange';
            } else {
            if (d.Species == 'Iris-versicolor') {
              return 'red';
            } else {
            if (d.Species == 'Iris-setosa') {
              return 'blue';
            }}}})});

    d3.selectAll('#b1')
    .on('click', function(){
        // Remove the currently selected classname from that element
      var circles = svg.selectAll("g")
          .data(dataset)
          .enter()
          g.append("circle")
          .attr("r", 3.5)
          .attr('fill','black')


    });
  });
}

viz11();

function viz12(){

  var lengthScale = d3.scaleLinear()
  .domain([4,8]).range([heightMargin, height-heightMargin]);

  var widthScale = d3.scaleLinear()
  .domain([1.8,4.5]).range([height-heightMargin, heightMargin]);

  function scaleLength(SepalLengthCm) {
    return lengthScale(SepalLengthCm);
  }

  function scaleWidth(SepalWidthCm) {
    return widthScale(SepalWidthCm);
  }

  d3.csv('iris.csv').then(function(dataset) {
    //console.table(dataset)
    var svg = d3.select('#viz_1_2').append('svg')
    .attr('width', width)
    .attr('height', height)


    var g = svg.selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
    return ("translate(" + scaleLength(d.SepalLengthCm) + "," + 325 + ")")  //magic number to bring down dots
    //return ("translate(" + scaleLength(d.SepalLengthCm) + "," + scaleWidth(d.SepalWidthCm) + ")")
    })

    var circles = svg.selectAll("g")
          .data(dataset)
          .enter()
          g.append("circle")
          .attr("r", 3.5)
          .attr('fill', function(d) {
            if (d.Species == 'Iris-virginica') {
              return 'orange';
            } else {
            if (d.Species == 'Iris-versicolor') {
              return 'red';
            } else {
            if (d.Species == 'Iris-setosa') {
              return 'blue';
            }}}})

    svg.append('g').attr('class', 'x axis')
    .attr("transform", "translate("+widthMargin+","+(height-heightMargin)+")")
    .call(d3.axisBottom(lengthScale).tickFormat(function(d){return d;}));

    svg.append('text')
      .attr('class', 'label')
      .attr('id', 'sepal_length_label')
      .attr('transform','translate('+((width-widthMargin)/2 - 20)+','+(height-(heightMargin/3))+')')
      .text('Click Me');



    d3.selectAll('#sepal_length_label')
    .on('click', function(d){
        // Remove the currently selected classname from that element
      console.log("Clicked the animation button")

      svg.selectAll("g")
          .data(dataset)
          .enter()
          svg.selectAll("circle")
          .transition()
          .duration(750)
          .attr("transform", function(d) {
            if (d.Species == 'Iris-virginica') {
              return ("translate(" + 0 + "," + 75 + ")");
            } else {
            if (d.Species == 'Iris-versicolor') {
              return ("translate(" + 0 + "," + 0 + ")");
            } else {
            if (d.Species == 'Iris-setosa') {
              return ("translate(" + 0 + "," + -75 + ")");
            }}}
          })
    });


  });
}

viz12();

function viz13(){
  var svg = d3.select("#viz_1_3")
  .append('svg')
  .attr('width', width)
  .attr('height', height)    
var img = svg.append('image')
   .attr('href', 'static/versicolor-photo.jpg')
   .attr('height', '50%')
   .attr('width', '50%')
   .attr('transform', 'translate(170,120)')

const transitionPath = d3.transition().ease(d3.easeSin).duration(2500);
var sepallaxis = svg.append('line')
    .attr('stroke', 'white').attr('stroke-width', '3')
    .attr('stroke-dashoffset', '30')
    .attr('x1', '325').attr('x2', '320')
    .attr('y1','360').attr('y2', '260')
    .transition(transitionPath)
    .attr('stroke-dashoffset', '0')

var sepalwaxis = svg.append('line')
    .attr('stroke', 'white').attr('stroke-width', '3')
    .attr('x1', '355').attr('x2', '280')
    .attr('y1','290').attr('y2', '290')


svg.append('text').attr('class','label').attr('fill','white')
.attr('transform', 'translate(300,375)').text('Sepal')

}

viz13();


d3.graphScroll()
    .graph(d3.selectAll('#graph'))
    .container(d3.select('#main'))
    .sections(d3.selectAll('#s1_3_text'))
    .on('active', function (i) {
      viz13 ();
    })
