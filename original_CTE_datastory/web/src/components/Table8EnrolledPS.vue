<template>
    <div>
        <div id="Table8EnrolledPS_content_1" class="Table8EnrolledPS_tabcontent">
            <div ref="viz" class="viz-container"></div>
        </div>
        <div
            id="Table8EnrolledPS_content_2"
            class="Table8EnrolledPS_tabcontent"
            style="display:none;"
        >
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
        <div
            id="Table8EnrolledPS_content_3"
            class="Table8EnrolledPS_tabcontent"
            style="display:none;"
        >
            <div class="white-info-text">
                <div class="notes-section">
                    <a
                        class="data-links"
                        href="data-download/table_postsecondary_enrollment_chart.xlsx"
                        target="_blank"
                    >Download data spreadsheet for this visualization</a>
                    <p>NOTE: A CTE concentrator at the secondary school level is a student who has completed at least two course credits in a single Career and Technical Education (CTE) program of study or career cluster. Once a student earns two course credits in a single CTE program of study or career cluster, he or she is counted as a CTE concentrator. One course credit is equivalent to one Carnegie unit, a standardized measurement of student course taking, that signals the successful completion of one course lasting a full academic year. See the Perkins CTE Basic State Grants program definition of a CTE concentrator in the Strengthening Career and Technical Education for the 21st Century Act of 2018, Section 3(12).</p>
                    <p>
                        SOURCE: U.S. Department of Education, National Center for Education Statistics,
                        <em>Educational Longitudinal Study of 2002 (ELS:2002) Third Follow-up Restricted-Use Data File</em>, 2012.
                    </p>
                </div>
            </div>
        </div>
        <div class="tab-menu">
            <ul>
                <li></li>
                <li>
                    <a
                        href="javascript:TabSwitcher('Table8EnrolledPS_tb_1', 'Table8EnrolledPS_content_1', 'Table8EnrolledPS_tabcontent', 'Table8EnrolledPS_tabmenu');"
                        id="Table8EnrolledPS_tb_1"
                        class="Table8EnrolledPS_tabmenu active"
                    >
                        <i class="icon-chart-button"></i>
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="javascript:TabSwitcher('Table8EnrolledPS_tb_2', 'Table8EnrolledPS_content_2', 'Table8EnrolledPS_tabcontent', 'Table8EnrolledPS_tabmenu');"
                        id="Table8EnrolledPS_tb_2"
                        class="Table8EnrolledPS_tabmenu"
                    >
                        <i class="icon-table-button"></i>
                    </a>
                </li>-->
                <li>
                    <a
                        href="javascript:TabSwitcher('Table8EnrolledPS_tb_3', 'Table8EnrolledPS_content_3', 'Table8EnrolledPS_tabcontent', 'Table8EnrolledPS_tabmenu');"
                        id="Table8EnrolledPS_tb_3"
                        class="Table8EnrolledPS_tabmenu"
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

        //set the margin attributes
        var margin = {
                top: 0,
                right: 20,
                bottom: 20,
                left: 680
            },
            width = 500,
            height = 150;


    //set the appropriate bar padding on y axis
    var y1 = d3.scaleBand().domain(['Total']).rangeRound([0, height]).padding([0.44]);


    //set up offset of gender part of the graph  & english language part of the graph
    var offset = 15;

        var tooltipColor1 = d3.scaleOrdinal()
            .domain(["By two years after expected high school graduation",
                "By eight years after expected high school graduation"
            ])
            .range(["#74CAE2", "#74CAE2"
            ]);


        //set the domain and range for the x axis
        var x1 = d3.scaleLinear()
            .domain([1, 0])
            .range([width, 0]);

        //y axis variable using the scale created above based on selected chart type
        var yAxis1 = d3.axisLeft()
            .scale(y1)
            .tickSize(0);

        //specify how to format the percent
        var formatPercent = d3.format(".0%");

        //svg is the standard name for the d3 bar chart graphic, this creates it and sets some attributes, append appends to it
        var svg1 = d3.select(rootEl).append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1425 125")
            .classed("svg-content", true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dataFile1 = "./assets/data/Table8_Pct_CTE_concentrators_enrolled_PS.txt";

        //read in the data tsv and recreate the y domain to only include year variables based on the selected chart data
        d3.tsv(dataFile1, type1, function (error, data1) {

            var dataTotal1 = data1.filter(function (d) {
                if (d.year == "Total") {
                    return d.year
                }
            });
            //set up the value for the dashed line showing overall enrollment
            var data1 = data1.filter(function (d) {
                if (d.year != "Total" & d.year != "") {
                    return d.year
                }
            });

            y1.domain(data1.map(function (d) {
                return d.year;
            }));


            //add bar background up to 100%
            var barBackground = svg1.selectAll(".bar")
                .data(data1)
                .enter().append("rect")
                .attr("class", "barBackground")
                .attr("fill", "#f1f1f1")
                .attr("x", function (d) {
                    return x1(0);
                }) //coordinates start at 0
                .attr("height", function (d) {

                return 15;
                })
                .attr("y", function (d) {
                    return y1(d.year) / 2 + 50;
                }) //align bar with proper y axis year
                .attr("width", width);

            //append the bars to the chart
            var bar = svg1.selectAll(".bar")
                .data(data1)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("fill", function (d) {
                    if (d.year === " " | d.year === "") {
                        return "transparent"
                    } else {
                        return "#2EB4E7"
                    }
                })
                .attr("x", function (d) {
                    return x1(0);
                }) //coordinates start at 0
                .attr("height", function (d) {
                return 15;
                })
                .attr("y", function (d) {
                    return y1(d.year) / 2 + 50;
                }) //align bar with proper y axis year
                .attr("width", function (d) {
                    return x1(d.percentageCTEconcentrators);
                })
                .on('mouseover', mouseover1) //show / hide the tip based on where the mouse is
                .on('mouseout', mouseout1);

            //append the text to end of chart
            svg1.selectAll("text")
                .data(data1)
                .enter().append("text")
                .text(function (d) {
                    if (d.percentageCTEconcentrators == 0 | d.percentageCTEconcentrators == "") {
                        return ""
                    } else {
                        if (d.year == "By two years after expected high school graduation")
                            return Math.round((d.percentageCTEconcentrators) * 100) + "%"
                        else {
                            return Math.round((d.percentageCTEconcentrators) * 100)
                        }
                    }
                })
                .attr("x", function (d) {
                    return x1(d.percentageCTEconcentrators) + 12;
            }) //coordinates start at 0
            .attr("y", function(d) {
                    return y1(d.year)/2 + 50 + 10;
            })
            .attr("text-anchor", "right")
            .style("font-size", "12px")
            .style("font-family", "LibreFranklin-Medium")
            .style("fill", "#616161");


        //custom y axis not using y axis class to allow for the custom offset
        svg1.selectAll("custom_y_axis").data(data1)
            .enter().append("text")
            .attr("x", -7)
            .attr("y", function(d) {
                    return y1(d.year)/2 + 50 + 10;
            })
            .attr("text-anchor", "end")
            .style("font-size", "16px")
            .style("font-family", "LibreFranklin-Regular")
            .style("fill", "#2e2e2e")
            .text(function(d) {
                return d.year;
            });

        svg1.append("text")
            .attr("x", 20)
            .attr("y", 0 + margin.top + 40)
            .attr("text-anchor", "middle")
            .style("font-size", "22px")
            .text("Percentage of high school CTE concentrators who ever enrolled in postsecondary education");


        /* custom y axis lines for two seperate graphs */
        var axisLineData1 = [{
            'x': 0,
            'y': 3.8
        },
            {
                'x': 0,
                'y': 6.8
            },
            ];



        var y_scale1 = d3.scaleLinear().domain([0, 1]).range([0, height / 8.72]);

            var line1 = d3.line()
                .x(function (d) {
                    return x1(d['x']);
                })
                .y(function (d) {
                    return y_scale1(d['y']);
                });

            var path1 = svg1.append('path').attr("class", "yAxisLine").attr('d', line1(axisLineData1));

            //move tooltip to left of mouse for elements in the right of page
            function position_tip(x, y) {

                if (x > (250 + width / 2)) {
                    x = d3.max([x - 100, 140])
                }
                if (y > height / 2) {
                    y = y - 75
                }

                return ([x, y])

            }

            //set up interactive funcaitonality
            var div1 = d3.select("body").append("div")
                .attr("class", "credit_activity_tooltip")
                .style("opacity", 0);

            function mouseover1(d) {
                //highlight selected school types

                d3.select(this)
                    .classed("active", false)
                    .attr('fill', function (d) {
                        return tooltipColor1(d.year);
                    })

            div1.transition().duration(100)
                .style("opacity", .9);
            div1.html("<span style='font-family: LibreFranklin-Medium; font-size: 14px; color: #ffffff;'>" + d.year +
                "</span><br/><hr style='opacity: 0.2;border: 1px solid #CDCCCC;'>" +
                "<span style='font-family: LibreFranklin-Medium; font-size: 13px; color: #FFFFFF; line-height: 16px;'>" +
                d3.format(",.0f")(d.percentageCTEconcentrators * 100) +
                "% of high school CTE concentrators enrolled in postsecondary education</span>")
                .style("left", (position_tip(d3.event.pageX, d3.event.pageY)[0]) + "px")
                .style("top", (position_tip(d3.event.pageX, d3.event.pageY)[1]) + "px");
        }

            function mouseout1(d) {
                div1.transition().duration(200).style("opacity", 0);

                d3.select(this)
                    .classed("active", false)
                    .attr('fill', function (d) {
                        if (d.year === " " | d.year === "") {
                            return "transparent"
                        } else {
                            return "#2EB4E7"
                        }
                    })
            }

        });

        //define d as a type to be used
        function type1(d) {
            d.percentageCTEconcentrators = +d.percentageCTEconcentrators;
            return d;
        }

        //set the appropriate bar padding on y axis
        var y1 = d3.scaleBand().domain(['Total']).rangeRound([0, height]).padding([0.74]);


        //set up offset of gender part of the graph  & english language part of the graph
        var tooltipColor2 = d3.scaleOrdinal()
            .domain(["By two years after expected high school graduation",
                "By eight years after expected high school graduation"
            ])
            .range(["#CADD72", "#CADD72"
            ]);


        //set the domain and range for the x axis
        var x1 = d3.scaleLinear()
            .domain([1, 0])
            .range([width, 0]);

        //y axis variable using the scale created above based on selected chart type
        var yAxis1 = d3.axisLeft()
            .scale(y1)
            .tickSize(0);

        //specify how to format the percent
        var formatPercent = d3.format(".0%");

        //svg is the standard name for the d3 bar chart graphic, this creates it and sets some attributes, append appends to it
        var svg2 = d3.select(rootEl).append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1425 125")
            .classed("svg-content", true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dataFile2 = "./assets/data/Table8_Pct_CTE_concentrators_enrolled_PS.txt";

        //read in the data tsv and recreate the y domain to only include year variables based on the selected chart data
        d3.tsv(dataFile2, type1, function (error, data2) {

            var dataTotal1 = data2.filter(function (d) {
                if (d.year == "Total") {
                    return d.year
                }
            });
            //set up the value for the dashed line showing overall enrollment
            var data2 = data2.filter(function (d) {
                if (d.year != "Total" & d.year != "") {
                    return d.year
                }
            });

            y1.domain(data2.map(function (d) {
                return d.year;
            }));


            //add bar background up to 100%
            var barBackground2 = svg2.selectAll(".bar")
                .data(data2)
                .enter().append("rect")
                .attr("class", "barBackground")
                .attr("fill", "#f1f1f1")
                .attr("x", function (d) {
                    return x1(0);
                }) //coordinates start at 0
                .attr("height", function (d) {

                return 15;
                })
                .attr("y", function (d) {
                    return y1(d.year) / 2 + 50;
                }) //align bar with proper y axis year
                .attr("width", width);

            //append the bars to the chart
            var bar2 = svg2.selectAll(".bar")
                .data(data2)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("fill", function (d) {
                    if (d.year === " " | d.year === "") {
                        return "transparent"
                    } else {
                        return "#7EC255"
                    }
                })
                .attr("x", function (d) {
                    return x1(0);
                }) //coordinates start at 0
                .attr("height", function (d) {
                return 15;
                })
                .attr("y", function (d) {
                    return y1(d.year) / 2 + 50;
                }) //align bar with proper y axis year
                .attr("width", function (d) {
                    return x1(d.percentageNonCTEconcentrators);
                })
                .on('mouseover', mouseover2) //show / hide the tip based on where the mouse is
                .on('mouseout', mouseout2);

            //append the text to end of chart
            svg2.selectAll("text")
                .data(data2)
                .enter().append("text")
                .text(function (d) {
                    if (d.percentageNonCTEconcentrators == 0 | d.percentageNonCTEconcentrators == "") {
                        return ""
                    } else {
                        if (d.year == "By two years after expected high school graduation")

                        return Math.round((d.percentageNonCTEconcentrators) * 100) + "%"
                    else {
                        return Math.round((d.percentageNonCTEconcentrators) * 100)
                    }
                }
            })
            .attr("x", function(d) {
                return x1(d.percentageNonCTEconcentrators) + 12;
            }) //coordinates start at 0
            .attr("y", function(d) {
                return y1(d.year)/2 + 50 + 10;
            })
            .attr("text-anchor", "right")
            .style("font-size", "12px")
            .style("font-family", "LibreFranklin-Medium")
            .style("fill", "#616161");


        //custom y axis not using y axis class to allow for the custom offset
        svg2.selectAll("custom_y_axis").data(data2)
            .enter().append("text")
            .attr("x", -7)
            .attr("y", function(d) {
                return y1(d.year)/2 + 50 + 10;
            })
            .attr("text-anchor", "end")
            .style("font-size", "16px")
            .style("font-family", "LibreFranklin-Regular")
            .style("fill", "#2e2e2e")
            .text(function(d) {
                return d.year;
            });

        svg2.append("text")
            .attr("x", 40)
            .attr("y", 0 + margin.top + 40)
            .attr("text-anchor", "middle")
            .style("font-size", "22px")
            .text("Percentage of high school non-CTE concentrators who ever enrolled in postsecondary education");

        /* custom y axis lines for two seperate graphs */
        var axisLineData2 = [{
            'x': 0,
            'y': 3.8
        },
            {
                'x': 0.0,
                'y': 6.8
            },
        ];



            var y_scale2 = d3.scaleLinear().domain([0, 1]).range([0, height / 8.72]);

            var line2 = d3.line()
                .x(function (d) {
                    return x1(d['x']);
                })
                .y(function (d) {
                    return y_scale2(d['y']);
                });

            var path2 = svg2.append('path').attr("class", "yAxisLine").attr('d', line2(axisLineData2));

            //move tooltip to left of mouse for elements in the right of page
            function position_tip(x, y) {

                if (x > (250 + width / 2)) {
                    x = d3.max([x - 100, 140])
                }
                if (y > height / 2) {
                    y = y - 75
                }

                return ([x, y])

            }

            //set up interactive funcaitonality
            var div2 = d3.select("body").append("div")
                .attr("class", "credit_activity_tooltip")
                .style("opacity", 0);

            function mouseover2(d) {
                //highlight selected school types

                d3.select(this)
                    .classed("active", false)
                    .attr('fill', function (d) {
                        return tooltipColor2(d.year);
                    })

            div2.transition().duration(100)
                .style("opacity", .9);
            div2.html("<span style='font-family: LibreFranklin-Medium; font-size: 14px; color: #ffffff;'>" + d.year +
                "</span><br/><hr style='opacity: 0.2;border: 1px solid #CDCCCC;'>" +
                "<span style='font-family: LibreFranklin-Medium; font-size: 13px; color: #FFFFFF; line-height: 16px;'>" +
                d3.format(",.0f")(d.percentageNonCTEconcentrators * 100) +
                "% of high school non-CTE concentrators enrolled in postsecondary education</span>")
                .style("left", (position_tip(d3.event.pageX, d3.event.pageY)[0]) + "px")
                .style("top", (position_tip(d3.event.pageX, d3.event.pageY)[1]) + "px");
        }

        function mouseout2(d) {
            div2.transition().duration(200).style("opacity", 0);

            d3.select(this)
                .classed("active", false)
                .attr('fill', function(d) {
                    if (d.year === " " | d.year === "") {
                        return "transparent"
                    } else{
                        return "#7EC255"
                    }
                })
        }

        });
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

/*Set custom years for the two seperate y axis lines*/
.viz-container >>> path.yAxisLine {
    stroke: #2e2e2e;
    stroke-width: 2px;
}
</style>
