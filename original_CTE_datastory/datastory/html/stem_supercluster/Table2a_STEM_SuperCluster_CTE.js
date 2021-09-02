function makeChart() {
    d3.select("svg").remove();

    var div = d3.select("#dropdownChart").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

   var margin = { top: 0, right: 80, bottom: 160, left: 80 },
      width = 1600 - margin.left - margin.right,
      height = 970- margin.top - margin.bottom;
    
   var boundary_states = ["VT", "NH", "MA", "RI", "CT", "NJ", "DE", "MD", "DC", "PR", "HI"];

    var svg = d3.select("#dropdownChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var projection = d3.geoAlbersUsaPr().scale(1800).translate([width / 2, height / 2 +20]),
        path = d3.geoPath().projection(projection);


    //Moves selection to front
    d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
            this.parentNode.appendChild(this);
        });
    };

    //Moves selection to back
    d3.selection.prototype.moveToBack = function () {
        return this.each(function () {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };


    if (!document.getElementById("chooseChart")) {
        var chartSelected = ""
    } else {
        var chartSelected = document.getElementById("chooseChart").value;
    }

    //Switching data file based on option selected
    if (chartSelected == "") {
        var dataFile = "Health Science";
        var us_average = "11%";
    } else if (chartSelected == "health") {
        var dataFile = "Health Science";
        var us_average = "11%";
    } else if (chartSelected == "art") {
        var dataFile = "Arts, Audio-Visual Technology, and Communication";
        var us_average = "12%";
    } else if (chartSelected == "business"){
        var dataFile = "Business Management and Administration";
        var us_average = "11%"
    } else if (chartSelected == "agri"){
        var dataFile = "Agriculture, Food, and Natural Resources";
        var us_average = "10%"
    }



    // Defining mouse-over event
    function mouseover(d, state, data) {
        div.transition().duration(100)
            .style("opacity", .9)
            .attr("width", "200px")
            .attr("height", "150px");
        div.html(dataFile + "<br><hr>" + state + ":" + Math.round(data) + "%")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 30) + "px");
    }

    //add in chloropleth
    d3.csv("../assets/data/Table2a_STEM_SuperCluster_CTE.csv", function (maptemplate) {
        //Sets color scale
        var numMax = d3.max(maptemplate, function (d) {
            return +d[dataFile];
        });

        var quantize = d3.scaleQuantize()
            .domain([0, 25])
            .range(d3.range(5).map(function (i) {
                return "q" + i + "-9";
            }));

        //Pair data with state id
        var dataByFIPS = {};

        maptemplate.forEach(function (d) {
            dataByFIPS[d.FIPS] = +d[dataFile];
        });



        //Pair state name with state id
        var stateByFIPS = {};
        maptemplate.forEach(function (d) {
            stateByFIPS[d.FIPS] = d.state;
        });
        svg.append("g")
            .attr("width", "1500")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(states, states.objects.states_20m_2017).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", function (d) {
                return quantize(Math.round(dataByFIPS[d.properties.STATEFP] * 10)/ 10);
            })
            //Hovers
            .on("mouseover", function (d) {
                mouseover(d.properties.STATEFP, stateByFIPS[d.properties.STATEFP], dataByFIPS[d.properties.STATEFP]);
            })
            .on("mouseout", function () {
                div.transition().duration(1000)
                    .style("opacity", 0);
            });

        var line = d3.line()
            .x(function(d) {
                return x(d['x']);
            })
            .y(function(d) {
                return y_scale(d['y']);
            });

        svg.append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(states, states.objects.states_20m_2017, function (a, b) {
                return a !== b;
            })));
        
        var newEngland = ["09","10","11","24","34","44","25","33","50"];
        var vertOffset = ['50','33'];

        // Drawing connecting lines for outlier states
        svg.append("g")
            .attr("class", "connectinglines")
            .selectAll("text")
            .data(topojson.feature(states, states.objects.states_20m_2017).features)
            .enter()
            .filter(function(d){return newEngland.indexOf(d.properties.STATEFP) >= 0;})
            .append("line")
            .attr("y1", function(d){return(path.centroid(d)[1])})
            .attr("y2", function(d){return (parseFloat(d.properties.dy) + path.centroid(d)[1]+ (vertOffset.indexOf(d.properties.STATEFP) >= 0)*30 )})
                //if (d.properties.dy != null) { return path.centroid(d)[1] + d.properties.dy;} else {return path.centroid(d)[1];}})
            .attr("x1",function(d){return(path.centroid(d)[0])})
            .attr("x2", function(d){return (parseFloat(d.properties.dx) + path.centroid(d)[0] + -1*(Math.sign(parseFloat(d.properties.dx))==1)*20 )})
                //function(d){if (d.properties.dx != null) { return path.centroid(d)[0] + d.properties.dx;} else {return path.centroid(d)[0];}})
            .attr("stroke", "black")
            .attr("stroke-width", "1px")

        // Adding labels with state abbreviation and data
        svg.append("g")
            .attr("class", "states")
            .selectAll("text")
            .data(topojson.feature(states, states.objects.states_20m_2017).features)
            .enter().append("svg:text")
            .attr("transform", function (d) {if (d.properties.dx == null) {return "translate(" + path.centroid(d)+")";}
                                             else {return "translate(" + String( parseFloat(path.centroid(d)[0]) + parseFloat(d.properties.dx) )+ "," + String(parseFloat(path.centroid(d)[1]) + parseFloat(d.properties.dy)) + ")"} })
            .attr("dx", "0em")
            .attr("dy", "0em")
            .attr("text-anchor", "middle")
            .attr('font-size', "1.2em")
            .text(function (d) { return d.properties.STUSPS; })
            .attr('fill', function (d) {if((dataByFIPS[d.properties.STATEFP]<15) || (boundary_states.includes(d.properties.STUSPS))){return "black";} else {return "white";}})
            .append('tspan')
            .attr("dx", "-1.35em")
            .attr("dy", "1.0em")
            .text(function (d) { console.log(d.properties.STUSPS, dataByFIPS[d.properties.STATEFP], Math.round(dataByFIPS[d.properties.STATEFP])); return Math.round(dataByFIPS[d.properties.STATEFP])  + "%"; })
        });

    var rectSize = 120;
    
    var legendSpacing = 3.5;
    var legendXStart = width/2 + 100;
    var legendHeight = height+100;
    var colors = ["#d9e0f2", "#99b2dc", "#5e8dc9", "#2f5491","#0e2344"];
    labels = ["\u2265" + "0","5","10","15","20", "\u2264" +"100"]

    for (i=0;i <5;i++){
          // text label for the legend first row
        svg.append("text")
          .attr("x", legendXStart + (i-3) * (legendSpacing+rectSize) - 3)
          .attr("y", legendHeight + 40)
          .style("text-anchor", "middle")
          .text(labels[i]);

        // rect for legend second row
        svg.append("rect")
          .attr("y", legendHeight)
          .attr("x", legendXStart + (i-3) * (legendSpacing+rectSize))
          .attr("width", rectSize)
          .attr("height", 20)
          .style("fill", colors[i])
          .style("stroke", "#303030")

      }
    svg.append("text")
        .attr("x", legendXStart + (2) * (legendSpacing+rectSize) -3)
        .attr("y", legendHeight + 40)
        .style("text-anchor", "middle")
        .text(labels[5]);


    svg.append('text')
        .attr("x", (width/2))
        .attr("y", 0 - (margin.top / 2) + 30)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("U.S. Average: " + us_average);

}