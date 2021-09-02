<template>
    <div>
        <div id="Table2Cluster_content_1" class="Table2Cluster_tabcontent">
            <div ref="viz" class="viz-container">
                <div id="dropdownChart" align="center"></div>
            </div>
        </div>
        <div id="Table2Cluster_content_2" class="Table2Cluster_tabcontent" style="display:none;">
            <div class="white-info-text">
                <div>
                    <p>
                        Table spreadsheet view not available due to length. Please use the link below to download the complete
                        table.
                    </p>
                    <a
                        class="data-links"
                        href="data-download\chart-4_access-by-urbanicity.csv"
                        target="_blank"
                    >
                        Download
                        the spreadsheet
                    </a>
                </div>
            </div>
        </div>
        <div id="Table2Cluster_content_3" class="Table2Cluster_tabcontent" style="display:none;">
            <div class="white-info-text">
                <div class="notes-section">
                    <a
                        class="data-links"
                        href="data-download/table_career_clusters_map.xlsx"
                        target="_blank"
                    >Download data spreadsheet for this visualization</a>
                    <p>
                        NOTE: State-reported CTE performance data for 2016&ndash;17 are based on the accountability requirements of the previous 2006 reauthorization of the Carl D. Perkins Career and Technical Education Act (Perkins IV) and related non-regulatory guidance. Definition of CTE concentrators varied by state. Please refer to
                        <a
                            href="https://s3.amazonaws.com/PCRN/uploads/Perkins_RTC_2014-15.pdf"
                            target="_blank"
                        >https://s3.amazonaws.com/PCRN/uploads/Perkins_RTC_2014-15.pdf</a> for detailed descriptions of each state&rsquo;s definition. For definitions of career clusters, please refer to
                        <a
                            target="_blank"
                            href="https://www.careertech.org/career-clusters"
                        >https://www.careertech.org/career-clusters</a>. Categorizations on the map are based on unrounded percentages.
                    </p>
                    <p>SOURCE: U.S. Department of Education, Office of Career, Technical, and Adult Education, Consolidated Annual Report (CAR).</p>
                </div>
            </div>
        </div>
        <div class="tab-menu">
            <ul>
                <li></li>
                <li>
                    <a
                        href="javascript:TabSwitcher('Table2Cluster_tb_1', 'Table2Cluster_content_1', 'Table2Cluster_tabcontent', 'Table2Cluster_tabmenu');"
                        id="Table2Cluster_tb_1"
                        class="Table2Cluster_tabmenu active"
                    >
                        <i class="icon-chart-button"></i>
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="javascript:TabSwitcher('Table2Cluster_tb_2', 'Table2Cluster_content_2', 'Table2Cluster_tabcontent', 'Table2Cluster_tabmenu');"
                        id="Table2Cluster_tb_2"
                        class="Table2Cluster_tabmenu"
                    >
                        <i class="icon-table-button"></i>
                    </a>
                </li>-->
                <li>
                    <a
                        href="javascript:TabSwitcher('Table2Cluster_tb_3', 'Table2Cluster_content_3', 'Table2Cluster_tabcontent', 'Table2Cluster_tabmenu');"
                        id="Table2Cluster_tb_3"
                        class="Table2Cluster_tabmenu"
                    >
                        <i class="icon-outline-button"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        var rootEl = this.$refs.viz
        var rootSelector = d3.select(rootEl)
        makeChart()

        function makeChart() {

            rootSelector.select("svg").remove();

            var tooltipDiv = d3.select("body").append("div")
                .attr("class", "map_tooltip")
                .style("opacity", 0);

            var margin = { top: 0, right: 0, bottom: 0, left: 0 },
                width = 1200 - margin.left - margin.right,
                height = 850  - margin.top - margin.bottom;

            var boundary_states = ["VT", "NH", "MA", "RI", "CT", "NJ", "DE", "MD", "DC", "PR", "HI"]

            var svg = rootSelector.select("#dropdownChart").append("svg")

                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 1300 850")
                .classed("svg-content", true)
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            var projection = d3.geoAlbersUsaPr().scale(1200).translate([width / 2, height / 2]),
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



            var dataFile = "STEM Super Cluster";
            var us_average = "35%"

            // Defining mouse-over event
            function mouseover(d, state, data) {
                // console.log(d3.event.pageX, d3.event.pageY)
                tooltipDiv.transition().duration(100)
                    .style("opacity", .9)
                    .attr("width", "200px")
                    .attr("height", "150px");
                tooltipDiv.html("STEM and STEM-related career clusters" + "<br><hr>" + state + ":" + Math.round(data) + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 30) + "px");
            }

            //add in chloropleth
            d3.csv("./assets/data/Table2b_STEM_Super_Cluster_CTE.csv", function (maptemplate) {
                //Sets color scale
                var numMax = d3.max(maptemplate, function (d) {
                    return +d[dataFile];
                });

                var quantize = d3.scaleQuantize()
                    .domain([0, 50])
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
                    // .attr("width", "100")
                    .attr("class", "states")
                    .selectAll("path")
                    .data(topojson.feature(states, states.objects.states_20m_2017).features)
                    .enter().append("path")
                    .attr("d", path)
                    .attr("class", function (d) {
                        return quantize(Math.round(dataByFIPS[d.properties.STATEFP] * 10) / 10);
                    })
                    //Hovers
                    .on("mouseover", function (d) {
                        mouseover(d.properties.STATEFP, stateByFIPS[d.properties.STATEFP], dataByFIPS[d.properties.STATEFP]);
                    })
                    .on("mouseout", function () {
                        tooltipDiv.transition().duration(1000)
                            .style("opacity", 0);
                    });

                var line = d3.line()
                    .x(function (d) {
                        return x(d['x']);
                    })
                    .y(function (d) {
                        return y_scale(d['y']);
                    });

                svg.append("path")
                    .attr("class", "state-borders")
                    .attr("d", path(topojson.mesh(states, states.objects.states_20m_2017, function (a, b) {
                        return a !== b;
                    })));

                var newEngland = ["09", "10", "11", "24", "34", "44", "25", "33", "50"];
                var vertOffset = ['50', '33'];

                // Drawing connecting lines for outlier states
                svg.append("g")
                    .attr("class", "connectinglines")
                    .selectAll("text")
                    .data(topojson.feature(states, states.objects.states_20m_2017).features)
                    .enter()
                    .filter(function (d) { return newEngland.indexOf(d.properties.STATEFP) >= 0; })
                    .append("line")
                    .attr("y1", function (d) { return (path.centroid(d)[1]) })
                    .attr("y2", function (d) { return (parseFloat(d.properties.dy) + path.centroid(d)[1] + (vertOffset.indexOf(d.properties.STATEFP) >= 0) * 30) })
                    //if (d.properties.dy != null) { return path.centroid(d)[1] + d.properties.dy;} else {return path.centroid(d)[1];}})
                    .attr("x1", function (d) { return (path.centroid(d)[0]) })
                    .attr("x2", function (d) { return (parseFloat(d.properties.dx) + path.centroid(d)[0] + -1 * (Math.sign(parseFloat(d.properties.dx)) == 1) * 20) })
                    //function(d){if (d.properties.dx != null) { return path.centroid(d)[0] + d.properties.dx;} else {return path.centroid(d)[0];}})
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")

                // Adding labels with state abbreviation and data
                svg.append("g")
                    .attr("class", "states")
                    .selectAll("text")
                    .data(topojson.feature(states, states.objects.states_20m_2017).features)
                    .enter().append("svg:text")
                    .attr("transform", function (d) {
                        if (d.properties.dx == null) {
                            return "translate(" + path.centroid(d) + ")";
                        } else {
                            return "translate(" +
                                String(parseFloat(path.centroid(d)[0]) +
                                    parseFloat(d.properties.dx)) +
                                "," +
                                String(parseFloat(path.centroid(d)[1]) +
                                    parseFloat(d.properties.dy)) +
                                ")"
                        }
                    })
                    .attr("dx", "0em")
                    .attr("dy", "0em")
                    .attr("text-anchor", "middle")
                    .attr('font-size', "0.9em")
                    .text(function (d) { return d.properties.STUSPS; })
                    .attr('fill', function (d) { if ((dataByFIPS[d.properties.STATEFP] < 15) || (boundary_states.includes(d.properties.STUSPS))) { return "black"; } else { return "white"; } })
                    .append('tspan')
                    .attr("dx", "-1.35em")
                    .attr("dy", "1.0em")
                    .text(function (d) { return Math.round(dataByFIPS[d.properties.STATEFP]) + "%"; })
            });

            var rectSize = 120;

            var legendSpacing = 3.5;
            var legendXStart = width / 2 + 100;
            var legendHeight = height - 60;
            var colors = ["#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"];
            var labels = ["\u2265" + "0", "10", "20", "30", "40", "\u2264" + "100"];

            for (var i = 0; i < 5; i++) {
                // text label for the legend first row
                svg.append("text")
                    .attr("x", legendXStart + (i - 3) * (legendSpacing + rectSize) - 3)
                    .attr("y", legendHeight + 40)
                    .style("text-anchor", "middle")
                    .text(labels[i]);


                // rect for legend second row
                svg.append("rect")
                    .attr("y", legendHeight)
                    .attr("x", legendXStart + (i - 3) * (legendSpacing + rectSize))
                    .attr("width", rectSize)
                    .attr("height", 20)
                    .style("fill", colors[i])
                    .style("stroke", "#303030")
            }
            svg.append("text")
                .attr("x", legendXStart + (2) * (legendSpacing + rectSize) - 3)
                .attr("y", legendHeight + 40)
                .style("text-anchor", "middle")
                .text(labels[5]);


            svg.append('text')
                .attr("x", (width / 2))
                .attr("y", 0 - (margin.top / 2) + 150)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text("U.S. Average: " + us_average);

            svg.append("text")
                .attr("x", width/2)
                .attr("y", margin.top + 50)
                .attr("text-anchor", "middle")
                .style("font-size", "24px")
                .text("Percentage of high school CTE concentrations in STEM and");

            svg.append("text")
                .attr("x", width/2)
                .attr("y", 0 + margin.top + 85)
                .attr("text-anchor", "middle")
                .style("font-size", "24px")
                .text("STEM-related career clusters, by state: 2016\u201317");
        }
    }
}
</script>

<style scoped>
/* css for tooltip is in global stylesheet style.css, since tooltips need to append to body for position  */

.viz-container >>> .state-borders:hover {
    stroke: red;
}

.viz-container >>> .state-borders {
    fill: none;
    stroke: #fff;
    stroke-width: 0.5px;
    stroke-linejoin: round;
    stroke-linecap: round;
    pointer-events: none;
}

.viz-container >>> .q0-9 {
    fill: #edf8e9;
}
.viz-container >>> .q1-9 {
    fill: #bae4b3;
}
.viz-container >>> .q2-9 {
    fill: #74c476;
}
.viz-container >>> .q3-9 {
    fill: #31a354;
}
.viz-container >>> .q4-9 {
    fill: #006d2c;
}

.viz-container >>> text.q4-9 {
    fill: #ff8c00;
}
.viz-container >>> text.q3-9 {
    fill: #ffa500;
}
.viz-container >>> text.q2-9 {
    fill: #ffd700;
}
.viz-container >>> text.q1-9 {
    fill: #ff6347;
}
.viz-container >>> text.q0-9 {
    fill: #ff7f50;
}

.viz-container >>> .block {
    width: 10%;
    height: 15px;
    display: inline-block;
}

.viz-container >>> .qn {
    fill: #ffffff;
    width: 25%;
}

.viz-container >>> ul {
    width: 100%;
    margin: auto;
    margin-left: 220px;
}
.viz-container >>> .legendItem {
    list-style-type: none;
    font-family: LibreFranklin-Medium;
    font-size: 10pt;
}

.viz-container >>> .legendItem li {
    float: left;
    width: 10.1%;
    height: 10px;
    position: relative;
}
</style>
