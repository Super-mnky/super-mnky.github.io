//_4_comparison

function sec4_2_1(loaded){

  var svg;
  if (loaded){
      svg = d3.select("#sec4_2").select("svg")
  } else {
    svg = d3.select('#sec4_2').append('svg')
    .attr('width', width)
    .attr('height', height)
  }
  

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

  var tooltip = floatingTooltip('gates_tooltip', 240);

  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    var content = '<span class="name">Sepal Length: </span><span class="value">' +
      addCommas(d.SepalLengthCm) +
      'cm</span><br/>' +
      '<span class="name">Sepal Width: </span><span class="value">' +
      addCommas(d.SepalWidthCm) +
      'cm</span><br/>' +
      '<span class="name">Species: </span><span class="value">' +
      d.Species +
      '</span>';

    tooltip.showTooltip(content, d3.event);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    tooltip.hideTooltip();
  }

  d3.csv('iris.csv').then(function(dataset) {
    //console.table(dataset)

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

    var circles = svg.selectAll("g")
          console.log('showing dots')
          g.append("circle")
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail)    
          .transition()
              .delay(function(d,i) {return i * 20;})
              .duration(750)
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

  });
}

//display chart
//var myChart421 = sec4_2_1(); @@JJ4 removed to load with scrolly telly

function display_sec4_2_1(error, data) {
  sec4_2_1()
  if (error) {
    console.log(error);

  }
}
