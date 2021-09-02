<template>
    <div>
        <div id="Table5Location_content_1" class="Table5Location_tabcontent">
            <div ref="viz" class="viz-container">

            </div>
        </div>
        <div id="Table5Location_content_2"
             class="Table5Location_tabcontent"
             style="display:none;">
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
        <div id="Table5Location_content_3" class="Table5Location_tabcontent" style="display:none;">
            <div class="white-info-text">
                <div class="notes-section">
                    <a
                        class="data-links"
                        href="data-download/table_location_chart.xlsx"
                        target="_blank"
                    >Download data spreadsheet for this visualization</a>
                    <p>NOTE: Includes public school districts that offered any CTE programs&mdash;whether provided by the district or other entities&mdash;to high school students. The percentages do not reflect what is offered in each high school within the district. Examples of students attending a CTE center part time include students who spend half the day at the CTE center and half at the regular high school.</p>
                    <p>SOURCE: U.S. Department of Education, National Center for Education Statistics, Fast Response Survey System (FRSS), &ldquo;Career and Technical Education Programs in Public School Districts,&rdquo; FRSS 108, 2017.</p>
                </div>
            </div>
        </div>
        <div class="tab-menu">
            <ul>
                <li></li>
                <li>
                    <a
                        href="javascript:TabSwitcher('Table5Location_tb_1', 'Table5Location_content_1', 'Table5Location_tabcontent', 'Table5Location_tabmenu');"
                        id="Table5Location_tb_1"
                        class="Table5Location_tabmenu active"
                    >
                        <i class="icon-chart-button"></i>
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="javascript:TabSwitcher('Table5Location_tb_2', 'Table5Location_content_2', 'Table5Location_tabcontent', 'Table5Location_tabmenu');"
                        id="Table5Location_tb_2"
                        class="Table5Location_tabmenu"
                    >
                        <i class="icon-table-button"></i>
                    </a>
                </li>-->
                <li>
                    <a
                        href="javascript:TabSwitcher('Table5Location_tb_3', 'Table5Location_content_3', 'Table5Location_tabcontent', 'Table5Location_tabmenu');"
                        id="Table5Location_tb_3"
                        class="Table5Location_tabmenu"
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
        var rootEl = this.$refs.viz;

        //set the margin attributes
        var margin = {
                top: 80,
            right: 0,
            bottom: 20,
            left: 600
        },
            width = 500,
            height = 350;


        //set the appropriate bar padding on y axis
        var y = d3.scaleBand().domain(['Total']).rangeRound([0, height]).padding([0.44]);


        //set up offset of gender part of the graph  & english language part of the graph
         var offset = 12;

        var tooltipColor = d3.scaleOrdinal()
            .domain(["By expected graduation location",
                "By three locations after expected graduation location"
            ])
            .range(["#74CAE2", "#74CAE2"
            ]);


        //set the domain and range for the x axis
        var x = d3.scaleLinear()
            .domain([1, 0])
            .range([width, 0]);

        //y axis variable using the scale created above based on selected chart type
        var yAxis = d3.axisLeft()
            .scale(y)
            .tickSize(0);

        //specify how to format the percent
        var formatPercent = d3.format(".0%");

        //svg is the standard name for the d3 bar chart graphic, this creates it and sets some attributes, append appends to it
        var svg = d3.select(rootEl).append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1250 270")
            .classed("svg-content", true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dataFile = "./assets/data/Table5_Pct_Public_School_District_CTE_Programs.txt";

        //read in the data tsv and recreate the y domain to only include location variables based on the selected chart data
        d3.tsv(dataFile, type, function (error, data) {

            // var dataTotal = data.filter(function (d) {
            //     if (d.location == "Total") {
            //         return d.location
            //     }
            // });
            //set up the value for the dashed line showing overall enrollment
            var data = data.filter(function (d) {
                if (d.location != "Total" & d.location != "") {
                    return d.location
                }
            });

            y.domain(data.map(function (d) {
                return d.location;
            }));


            //add bar background up to 100%
            var barBackground = svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "barBackground")
                .attr("fill", "#f1f1f1")
                .attr("x", function (d) {
                    return x(0);
                }) //coordinates start at 0
                .attr("height", function (d) {

                    return 15;
                })
                .attr("y", function (d) {
                    return y(d.location) / 2 + 20;
                }) //align bar with proper y axis location
                .attr("width", width);

            //append the bars to the chart
            var bar = svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("fill", function (d) {
                    if (d.location === " " | d.location === "") {
                        return "transparent"
                    } else {
                        return "#2EB4E7"
                    }
                })
                .attr("x", function (d) {
                    return x(0);
                }) //coordinates start at 0
                .attr("height", function (d) {
                    return 15;
                })
                .attr("y", function (d) {
                    return y(d.location) / 2 + 20;
                }) //align bar with proper y axis location
                .attr("width", function (d) {
                    return x(d.percentagePublicSchoolDistricts);
                })
                .on('mouseover', mouseover) //show / hide the tip based on where the mouse is
                .on('mouseout', mouseout);

            //append the text to end of chart
            svg.selectAll("text")
                .data(data)
                .enter().append("text")
                .text(function (d) {
                    if (d.percentagePublicSchoolDistricts == 0 | d.percentagePublicSchoolDistricts == "") {
                        return ""
                    } else {
                        if (d.location == "Regular high school(s) in the same district")
                            return Math.round((d.percentagePublicSchoolDistricts) * 100) + "%"
                        else {
                            return Math.round((d.percentagePublicSchoolDistricts) * 100)
                        }
                    }
                })
                .attr("x", function (d) {
                    return x(d.percentagePublicSchoolDistricts) + 5;
                }) //coordinates start at 0
                .attr("y", function (d) {
                    return y(d.location) / 2 + 20 + 12;
                })
                .attr("text-anchor", "right")
                .style("font-size", "11px")
                .style("font-family", "LibreFranklin-Medium")
                .style("fill", "#616161");


            //custom y axis not using y axis class to allow for the custom offset
            svg.selectAll("custom_y_axis").data(data)
                .enter().append("text")
                .attr("x", -7)
                .attr("y", function (d) {
                    return y(d.location) / 2 + 20 + 12;
                })
                .attr("text-anchor", "end")
                .style("font-size", "14px")
                .style("font-family", "LibreFranklin-Regular")
                .style("fill", "#2e2e2e")
                .text(function (d) {
                    return d.location;
                });

        svg.append("text")
            .attr("x", 30)
            .attr("y", 0 + margin.top - 100)
            .attr("text-anchor", "middle")
            .style("font-size", "22px")
            .text("Among public school districts that offered CTE programs, ");

        svg.append("text")
            .attr("x", 30)
            .attr("y", 0 + margin.top - 70)
            .attr("text-anchor", "middle")
            .style("font-size", "22px")
            .text("percentage by location where the district offered CTE programs");
            /* custom y axis lines for two seperate graphs */
            var axisLineData = [{
                'x': 0,
            'y': 0.65
            },
            {
                'x': 0,
                'y': 4.75
            },
            ];



            var y_scale = d3.scaleLinear().domain([0, 1]).range([0, height / 8.72]);

            var line = d3.line()
                .x(function (d) {
                    return x(d['x']);
                })
                .y(function (d) {
                    return y_scale(d['y']);
                });

            var path = svg.append('path').attr("class", "yAxisLine").attr('d', line(axisLineData));

            //move tooltip to left of mouse for elements in the right of page
            function position_tip(x, y) {

                if (x > (250 + width / 2)) {
                    x = d3.max([x - 100, 870])
                }
                if (y > height / 2) {
                    y = y - 75
                }

                return ([x, y])

            }

            //set up interactive funcaitonality
            var div = d3.select("body").append("div")
                .attr("class", "credit_activity_tooltip")
                .style("opacity", 0);

            function mouseover(d) {
                //highlight selected school types

                d3.select(this)
                    .classed("active", false)
                    .attr('fill', function (d) {
                        return tooltipColor(d.location);
                    })

                div.transition().duration(100)
                    .style("opacity", .9);
                if (d.location == "Online (including blended/hybrid courses)") {
                    div.html("<span style='font-family: LibreFranklin-Medium; font-size: 13px; color: #FFFFFF; line-height: 16px;'>" +
                        d3.format(",.0f")(d.percentagePublicSchoolDistricts * 100) +
                        "% of public school districts that offered CTE programs offered these programs online" + "</span>")
                        .style("left", (position_tip(d3.event.pageX, d3.event.pageY)[0]) + "px")
                        .style("top", (position_tip(d3.event.pageX, d3.event.pageY)[1]) + "px");
                }
                else {
                    div.html("<span style='font-family: LibreFranklin-Medium; font-size: 13px; color: #FFFFFF; line-height: 16px;'>" +
                        d3.format(",.0f")(d.percentagePublicSchoolDistricts * 100) +
                        "% of public school districts that offered CTE programs offered these programs in " + d.location + "</span>")
                        .style("left", (position_tip(d3.event.pageX, d3.event.pageY)[0]) + "px")
                        .style("top", (position_tip(d3.event.pageX, d3.event.pageY)[1]) + "px");
                }
            }

            function mouseout(d) {
                div.transition().duration(200).style("opacity", 0);

                d3.select(this)
                    .classed("active", false)
                    .attr('fill', function (d) {
                        if (d.location === " " | d.location === "") {
                            return "transparent"
                        } else {
                            return "#2EB4E7"
                        }
                    })
            }

        });

        //define d as a type to be used
        function type(d) {
            d.percentagePublicSchoolDistricts = +d.percentagePublicSchoolDistricts;
            return d;
        }
    }
}
</script>

<style scoped>
/* css for tooltip is in global stylesheet style.css, since tooltips need to append to body for position  */

/*load the fonts from the .ttf files*/
@font-face {
    font-family: "LibreFranklin-Medium";
    src: url("../assets/font/LibreFranklin-Medium.ttf");
}

@font-face {
    font-family: "LibreFranklin-ExtraBold";
    src: url("../assets/font/LibreFranklin-ExtraBold.ttf");
}

@font-face {
    font-family: "LibreFranklin-Regular";
    src: url("../assets/font/LibreFranklin-Regular.ttf");
}

/*set the attributes for the axix lines*/
.viz-container >>> .axis path,
.viz-container >>> .axis line {
    shape-rendering: crispEdges;
}

/*set the attributes for the axis labels*/
.viz-container >>> .axis {
    font-family: LibreFranklin-Medium;
    font-size: 12px;
    color: #2e2e2e;
}

.viz-container >>> .x.axis path {
    display: none;
    /*do not want any lines, just the labels on the x axis*/
}

.viz-container >>> .y.axis path {
    display: line;
    /*a line to go up the y axis*/
}

/*format the verticle tick lines to be lightgrey and have an opacity*/
.viz-container >>> .grid .tick {
    stroke: lightgrey;
    opacity: 0.3;
}

/*set the width to 0 so the x axis and right border do not appear*/
.viz-container >>> .grid path {
    stroke-width: 0;
}

/*creates a class to use for LibreFranklin font*/
.viz-container >>> option.LibreFranklin {
    font-family: LibreFranklin-Regular;
    font-size: 14px;
    color: #2e2e2e;
}

.viz-container >>> path.domain {
    stroke: transparent;
}

/*Set custom locations for the two seperate y axis lines*/
.viz-container >>> path.yAxisLine {
    stroke: #2e2e2e;
    stroke-width: 2px;
}
</style>
