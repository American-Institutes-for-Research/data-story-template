<template>
    <div class="narrow-container">
        <h4>However, less than half of CTE participants in high school went on to concentrate in a specific area of CTE (37 percent).</h4>
        <div id="Table1Concentrator_content_1" class="Table1Concentrator_tabcontent">
            <div ref="viz" class="viz-container"></div>
        </div>
        <div
            id="Table1Concentrator_content_2"
            class="Table1Concentrator_tabcontent"
            style="display:none;"
        >
            <div>
                <iframe
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR7C_nl_42t9Byipcq3vATa4IsaROjit4AvsNXgWmnvt2-jnGCzibyBQPZSXWpvVSQzh_ExocCqTQl5/pubhtml?widget=true&amp;headers=false"
                ></iframe>
                <a
                    class="data-links"
                    href="data-download\chart-3_access-by-school-type.csv"
                    target="_blank"
                >
                    Download the
                    spreadsheet
                </a>
            </div>
        </div>
        <div
            id="Table1Concentrator_content_3"
            class="Table1Concentrator_tabcontent"
            style="display:none;"
        >
            <div>
                <div class="notes-section">
                    <a
                        class="data-links"
                        href="data-download/table_cte_participant_concentrator_chart.xlsx"
                        target="_blank"
                    >Download data spreadsheet for this visualization</a>
                    <p>&Dagger;Reporting standards not met. The coefficient of variation (CV) for this estimate is 50 percent or greater.</p>
                    <p>NOTE: Data on special education services were collected in 2012, when most of the students were enrolled in the 11th grade. The analysis only included students whose parents responded yes or no to this question. Data on English language learner status were collected from students&rsquo; high school transcripts and reflect the status when they were last enrolled in high school. The analysis only included students whose English language learner status was reported on their high school transcripts.</p>
                    <p>A CTE concentrator at the secondary school level is a student who has completed at least two course credits in a single CTE program of study or career cluster. Once a student earns two course credits in a single CTE program of study or career cluster, he or she is counted as a CTE concentrator. One course credit is equivalent to one Carnegie unit, a standardized measurement of student course taking, that signals the successful completion of one course lasting a full academic year. See the Perkins CTE Basic State Grants program definition of a CTE concentrator in the Strengthening Career and Technical Education for the 21st Century Act of 2018, Sections 3(12) and 3(13).</p>
                    <p>
                        SOURCE: U.S. Department of Education, National Center for Education Statistics,
                        <em>High School Longitudinal Study of 2009 (HSLS:09) 2013 Update and High School Transcript Study Restricted-Use Data File</em>, 2013.
                    </p>
                </div>
            </div>
        </div>
        <div class="tab-menu">
            <ul>
                <li></li>
                <li>
                    <a
                        href="javascript:TabSwitcher('Table1Concentrator_tb_1', 'Table1Concentrator_content_1', 'Table1Concentrator_tabcontent', 'Table1Concentrator_tabmenu');"
                        id="Table1Concentrator_tb_1"
                        class="Table1Concentrator_tabmenu active"
                    >
                        <i class="icon-chart-button"></i>
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="javascript:TabSwitcher('Table1Concentrator_tb_2', 'Table1Concentrator_content_2', 'Table1Concentrator_tabcontent', 'Table1Concentrator_tabmenu');"
                        id="Table1Concentrator_tb_2"
                        class="Table1Concentrator_tabmenu"
                    >
                        <i class="icon-table-button"></i>
                    </a>
                </li>-->
                <li>
                    <a
                        href="javascript:TabSwitcher('Table1Concentrator_tb_3', 'Table1Concentrator_content_3', 'Table1Concentrator_tabcontent', 'Table1Concentrator_tabmenu');"
                        id="Table1Concentrator_tb_3"
                        class="Table1Concentrator_tabmenu"
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
            top: 60,
            right: 0,
            bottom: 20,
            left: 290
        },
            width = 500,
            height = 410 - margin.top - margin.bottom;


        //set the appropriate bar padding on y axis
        var y = d3.scaleBand().domain(['Total']).rangeRound([0, height]).padding([0.44]);


        //set up offset of gender part of the graph  & english language part of the graph
        var offset = 15;

        var tooltipColor = d3.scaleOrdinal()
            .domain(["Male", "Female", "White", "Black", "Hispanic", "Asian", "Pacific Islander",
                "American Indian/Alaska Native", "Two or more races", "English as second language", "Not English as second language",
                "Received special education services", "Did not receive special education services"
            ])
            .range(["#CADD72", "#CADD72", "#74CAE2", "#74CAE2", "#74CAE2", "#74CAE2", "#74CAE2", "#74CAE2", "#74CAE2",
                "#E28C74", "#E28C74", "#E2C374", "#E2C374"
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
        var svg = d3.select(rootEl)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 750 475")
            .classed("svg-content", true)
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom + offset) //+20 is for the offset of lower bars
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dataFile = "./assets/data/Table1_English_language_learner_status_CTE_concentrators.txt";

        //read in the data tsv and recreate the y domain to only include characteristic variables based on the selected chart data
        d3.tsv(dataFile, type, function (error, data) {

            var dataTotal = data.filter(function (d) {
                if (d.characteristic == "Total") {
                    return d.characteristic
                }
            });
            //set up the value for the dashed line showing overall enrollment
            var totalLineData = +dataTotal[0].percentageCTEconcentrators;
            var data = data.filter(function (d) {
                if (d.characteristic != "Total" & d.characteristic != "") {
                    return d.characteristic
                }
            });

            y.domain(data.map(function (d) {
                return d.characteristic;
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
                    if (d.characteristic == "Male" | d.characteristic == "Female") {
                        return y(d.characteristic) + offset;
                    } else if (d.characteristic == "English as second language" | d.characteristic == "Not English as second language") {
                        return y(d.characteristic) + 3 * offset;
                    } else if (d.characteristic == "Received special education services" | d.characteristic == "Did not receive special education services") {
                        return y(d.characteristic) + 2 * offset;
                    } else {
                        return y(d.characteristic);
                    }
                }) //align bar with proper y axis characteristic
                .attr("width", width);

            //append the bars to the chart
            var bar = svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("fill", function (d) {
                    if (d.characteristic === " " | d.characteristic === "") {
                        return "transparent"
                    } else {
                        if (d.characteristic == "Male" | d.characteristic == "Female")
                            return "#7EC255"
                        else if (d.characteristic == "English as second language" | d.characteristic == "Not English as second language")
                            return "#E7612E"
                        else if (d.characteristic == "Received special education services" | d.characteristic == "Did not receive special education services")
                            return "#E7BE2E"
                        else {
                            return "#2EB4E7"
                        }
                    }
                })
                .attr("x", function (d) {
                    return x(0);
                }) //coordinates start at 0
                .attr("height", function (d) {
                    return 15;
                })
                .attr("y", function (d) {
                    if (d.characteristic == "Male" | d.characteristic == "Female") {
                        return y(d.characteristic) + offset;
                    } else if (d.characteristic == "English as second language" | d.characteristic == "Not English as second language") {
                        return y(d.characteristic) + 3 * offset;
                    } else if (d.characteristic == "Received special education services" | d.characteristic == "Did not receive special education services") {
                        return y(d.characteristic) + 2 * offset;
                    } else {
                        return y(d.characteristic);
                    }
                }) //align bar with proper y axis characteristic
                .attr("width", function (d) {
                    if (d.characteristic == "Pacific Islander") {
                        return 0;
                    } else {
                        return x(d.percentageCTEconcentrators)
                    }
                }) //extend as far as the percentage enrolled in algebra 1
                .on('mouseover', mouseover) //show / hide the tip based on where the mouse is
                .on('mouseout', mouseout);

            //append the text to end of chart
            svg.selectAll("text")
                .data(data)
                .enter().append("text")
                .text(function (d) {
                    if (d.percentageCTEconcentrators == 0 | d.percentageCTEconcentrators == "") {
                        return ""
                    } else {
                        if (d.characteristic == "American Indian/Alaska Native" | d.characteristic == "Male" |
                            d.characteristic == "Did not receive special education services" | d.characteristic == "Not English as second language")
                            return Math.round((d.percentageCTEconcentrators) * 100) + "%";
                        else if (d.characteristic == "Pacific Islander") {
                            return "‡";
                        } else {
                            return Math.round((d.percentageCTEconcentrators) * 100);
                        }
                    }
                })
                .attr("x", function (d) {
                    if (d.characteristic == "Black" | d.characteristic == "Received special education services" | d.characteristic == "Female") {
                        return x(totalLineData) + 5;

                    } else if (d.characteristic == "Pacific Islander") {
                        return 5;
                    } else {
                        return x(d.percentageCTEconcentrators) + 5;
                    }
                }) //coordinates start at 0
                .attr("y", function (d) {
                    if (d.characteristic == "Male" | d.characteristic == "Female") {
                        return y(d.characteristic) + offset + 12;
                    } else if (d.characteristic == "Received special education services" | d.characteristic == "Did not receive special education services") {
                        return y(d.characteristic) + 2 * offset + 12;
                    } else if (d.characteristic == "English as second language" | d.characteristic == "Not English as second language") {
                        return y(d.characteristic) + 3 * offset + 12;
                    } else {
                        return y(d.characteristic) + 12;
                    }
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
                    if (d.characteristic == "Male" | d.characteristic == "Female") {
                        return y(d.characteristic) + offset + 12;
                    } else if (d.characteristic == "Received special education services" | d.characteristic == "Did not receive special education services") {
                        return y(d.characteristic) + 2 * offset + 12;
                    } else if (d.characteristic == "English as second language" | d.characteristic == "Not English as second language") {
                        return y(d.characteristic) + 3 * offset + 12;
                    } else {
                        return y(d.characteristic) + 12;
                    }
                })
                .attr("text-anchor", "end")
                .style("font-size", "14px")
                .style("font-family", "LibreFranklin-Regular")
                .style("fill", "#2e2e2e")
                .text(function (d) {
                    return d.characteristic;
                });

            var title = svg.append("text")
                .attr("x", 80)
                .attr("y", 0 + margin.top - 100)
                .attr("text-anchor", "middle")
                .style("font-size", "22px");

            title.append("tspan")
                .text("Percentage of high school students who were");

            title.append("tspan")
                .text(" CTE concentrators");

            //append the x axis label
            var annotation = svg.append("text")
                .attr("x", x(0.34 * totalLineData))
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("font-family", "LibreFranklin-ExtraBold")
                .style("fill", "#2e2e2e")
                .text(Math.round(totalLineData * 100));
            var annotation = svg.append("text")
                .attr("x", x(totalLineData * 1.42))
                .attr("y", -15)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("font-family", "LibreFranklin-Medium")
                .style("fill", "#2e2e2e")
                .text("percent of high school students were CTE concentrators");
            var annotation = svg.append("text")
                .attr("x", x(totalLineData) * 1.43)
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("font-family", "LibreFranklin-Medium")
                .style("fill", "#2e2e2e")
                .text("(earned at least two credits in a single CTE career cluster)");

            /* custom y axis lines for two seperate graphs */
            var axisLineData = [{
                'x': 0,
                'y': 0.16
            },
            {
                'x': 0,
                'y': 4.72
            },
            ];

            var axisLineData2 = [{
                'x': 0,
                'y': 5.14
            },
            {
                'x': 0,
                'y': 6.37
            },
            ];

            var axisLineData3 = [{
                'x': totalLineData,
                'y': 0.1
            },
            {
                'x': totalLineData,
                'y': 9.9
            },
            ];

            var axisLineData4 = [{
                'x': 0,
                'y': 6.7
            },
            {
                'x': 0,
                'y': 8.0
            },
            ];

            var axisLineData5 = [{
                'x': 0,
                'y': 8.45
            },
            {
                'x': 0,
                'y': 9.75
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
            var path = svg.append('path').attr("class", "yAxisLine2").attr('d', line(axisLineData2));
            var path = svg.append('path').attr("class", "yAxisLine3").attr('d', line(axisLineData3));
            var path = svg.append('path').attr("class", "yAxisLine2").attr('d', line(axisLineData4));
            var path = svg.append('path').attr("class", "yAxisLine2").attr('d', line(axisLineData5));

            //move tooltip to left of mouse for elements in the right of page
            function position_tip(x, y) {
                if (x > (50 + width / 2)) {
                    x = d3.max([x - 500, 140])
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
                        return tooltipColor(d.characteristic);
                    })

                div.transition().duration(100)
                    .style("opacity", .9);
                div.html("<span style='font-family: LibreFranklin-Medium; font-size: 14px; color: #ffffff;'>" + d.characteristic +
                    "</span><br/><hr style='opacity: 0.2;border: 1px solid #CDCCCC;'>" +
                    "<span style='font-family: LibreFranklin-Medium; font-size: 13px; color: #FFFFFF; line-height: 16px;'>" +
                    d3.format(",.0f")(d.percentageCTEconcentrators * 100) +
                    "% of high school students were CTE concentrators</span>")
                    .style("left", (position_tip(d3.event.pageX, d3.event.pageY)[0]) + "px")
                    .style("top", (position_tip(d3.event.pageX, d3.event.pageY)[1]) + "px");
            }

            function mouseout(d) {
                div.transition().duration(200).style("opacity", 0);

                d3.select(this)
                    .classed("active", false)
                    .attr('fill', function (d) {
                        if (d.characteristic === " " | d.characteristic === "") {
                            return "transparent"
                        } else {
                            if (d.characteristic == "Male" | d.characteristic == "Female")
                                return "#7EC255";
                            else if (d.characteristic == "English as second language" | d.characteristic == "Not English as second language") {
                                return "#E7612E";
                            }
                            else if (d.characteristic == "Received special education services" | d.characteristic == "Did not receive special education services") {
                                return "#E7BE2E";
                            }
                            else {
                                return "#2EB4E7";
                            }
                        }
                    })
            }

        });


        //define d as a type to be used
        function type(d) {
            d.percentageCTEconcentrators = +d.percentageCTEconcentrators;
            return d;
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.viz-container {
    margin: 0;
}

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

/*Set custom characteristics for the two seperate y axis lines*/
.viz-container >>> path.yAxisLine {
    stroke: #2e2e2e;
    stroke-width: 2px;
}

.viz-container >>> path.yAxisLine2 {
    stroke: #2e2e2e;
    stroke-width: 2px;
}

.viz-container >>> path.yAxisLine3 {
    stroke: #2e2e2e;
    stroke-width: 1px;
    stroke-dasharray: 3;
}
</style>
