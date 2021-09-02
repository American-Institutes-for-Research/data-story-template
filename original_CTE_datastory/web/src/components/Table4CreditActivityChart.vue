<template>
    <div>
        <div id="Table4CreditActivity_content_1" class="Table4CreditActivity_tabcontent">
            <div ref="viz" class="viz-container">

            </div>
        </div>
        <div
            id="Table4CreditActivity_content_2"
            class="Table4CreditActivity_tabcontent"
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
            id="Table4CreditActivity_content_3"
            class="Table4CreditActivity_tabcontent"
            style="display:none;"
        >
            <div class="white-info-text">
                <div class="notes-section">
                    <a
                        class="data-links"
                        href="data-download/tables_dual_credit_and_activity_chart.xlsx"
                        target="_blank"
                    >Download data spreadsheet for this visualization</a>
                    <p>NOTE: Includes public school districts that offered any CTE programs&mdash;whether provided by the district or other entities&mdash;to high school students. The percentages do not reflect what is offered in each high school within the district. Examples of student-run enterprises or services include school stores or restaurants, cosmetology services, automotive or construction services, and child development facilities. Examples of pre-apprenticeship programs include youth apprenticeships.</p>
                    <p>
                        SOURCE: Gray, L. and Lewis, L. (2018).
                        <em>Career and Technical Education Programs in Public School Districts: 2016&ndash;17</em>(NCES 2018-028). National Center for Education Statistics, U.S. Department of Education. Washington, DC; U.S. Department of Education, National Center for Education Statistics, Fast Response Survey System (FRSS), &ldquo;Career and Technical Education Programs in Public School Districts,&rdquo; FRSS 108, 2017.
                    </p>
                </div>
            </div>
        </div>
        <div class="tab-menu">
            <ul>
                <li></li>
                <li>
                    <a
                        href="javascript:TabSwitcher('Table4CreditActivity_tb_1', 'Table4CreditActivity_content_1', 'Table4CreditActivity_tabcontent', 'Table4CreditActivity_tabmenu');"
                        id="Table4CreditActivity_tb_1"
                        class="Table4CreditActivity_tabmenu active"
                    >
                        <i class="icon-chart-button"></i>
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="javascript:TabSwitcher('Table4CreditActivity_tb_2', 'Table4CreditActivity_content_2', 'Table4CreditActivity_tabcontent', 'Table4CreditActivity_tabmenu');"
                        id="Table4CreditActivity_tb_2"
                        class="Table4CreditActivity_tabmenu"
                    >
                        <i class="icon-table-button"></i>
                    </a>
                </li>-->
                <li>
                    <a
                        href="javascript:TabSwitcher('Table4CreditActivity_tb_3', 'Table4CreditActivity_content_3', 'Table4CreditActivity_tabcontent', 'Table4CreditActivity_tabmenu');"
                        id="Table4CreditActivity_tb_3"
                        class="Table4CreditActivity_tabmenu"
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
                top: 80,
                right: 0,
                bottom: 0,
            left: 800
            },
            width = 500,
            height = 180;


        //set the appropriate bar padding on y axis
        var y = d3.scaleBand().domain(['Total']).rangeRound([0, height]).padding([0.44]);


    //set up offset of gender part of the graph  & english language part of the graph
    var offset = 15;

    var tooltipColor = d3.scaleOrdinal()
        .domain([
            "Offered student-run enterprises or services",
            "Offered mentoring by local employers",
            "Offered on-the-job training, internships, practicums, clinical experiences, or cooperative education (co-op)",
            "Offered apprenticeships or pre-apprenticeship programs",
            "Offered other work-based learning",
            "Offered CTE courses that earned both high school and postsecondary credits"
        ])
        .range(["#CADD72", "#CADD72", "#CADD72", "#CADD72", "#CADD72", "#CADD72"
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
            .attr("viewBox", "0 0 1250 275")
            .classed("svg-content", true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dataFile = "./assets/data/Table4_Percentage_public_school_districts_by_activity.txt";

    //read in the data tsv and recreate the y domain to only include characteristic variables based on the selected chart data
    d3.tsv(dataFile, type, function(error, data) {
        var data = data.filter(function(d) {
            if (d.characteristic != "Total" & d.characteristic != "" & d.characteristic != "Percentage of public school districts that offered CTE programs to high school students") {
                return d.characteristic
            }
        });

        y.domain(data.map(function(d) {
            return d.characteristic;
        }));


        //add bar background up to 100%
        var barBackground = svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "barBackground")
            .attr("fill", "#f1f1f1")
            .attr("x", function(d) {
                return x(0);
            }) //coordinates start at 0
            .attr("height", function(d) {
                return 15;
            })
            .attr("y", function(d) {
                    return y(d.characteristic) + offset;
            }) //align bar with proper y axis characteristic
            .attr("width", width);

        //append the bars to the chart
        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", function(d) {
                if (d.characteristic === " " | d.characteristic === "") {
                    return "transparent"
                }
                        else {
                    return "#7EC255"
                }

            })
            .attr("x", function(d) {
                return x(0);
            }) //coordinates start at 0
            .attr("height", function(d) {
                    return 15;
            })
            .attr("y", function(d) {
                    return  y(d.characteristic) + offset;
            }) //align bar with proper y axis characteristic
            .attr("width", function(d) {
                 return x(d.pctPublicSchoolDistricts)
            }) //extend as far as the percentage enrolled in algebra 1
            .on('mouseover', mouseover) //show / hide the tip based on where the mouse is
            .on('mouseout', mouseout);

        //append the text to end of chart
        svg.selectAll("text")
            .data(data)
            .enter().append("text")
            .text(function(d) {
                if (d.pctPublicSchoolDistricts == 0 | d.pctPublicSchoolDistricts == "") {
                    return ""
                } else {
                    if (
                        d.characteristic == "Offered on-the-job training, internships, practicums, clinical experiences, or cooperative education (co-op)")
                        return Math.round((d.pctPublicSchoolDistricts) * 100) + "%";
                    else {
                        return Math.round((d.pctPublicSchoolDistricts) * 100);
                    }
                }
            })
            .attr("x", function(d) {
                    return x(d.pctPublicSchoolDistricts) + 5;
            }) //coordinates start at 0
            .attr("y", function(d) {
                    return  y(d.characteristic) + offset + 12;
            })
            .attr("text-anchor", "right")
            .style("font-size", function (d) {
                    return "11px";
                    })
            .style("font-family", "LibreFranklin-Medium")
            .style("fill", "#616161");


        //custom y axis not using y axis class to allow for the custom offset
        svg.selectAll("custom_y_axis").data(data)
            .enter().append("text")
            .attr("x", -7)
            .attr("y", function(d) {
                    return y(d.characteristic) + offset + 12;
            })
            .attr("text-anchor", "end")
            .style("font-size", function (d) {
                    return "14px";
                    })
            .style("font-family", "LibreFranklin-Regular")
            .style("fill", "#2e2e2e")
            .text(function(d) {
                return d.characteristic;
            });

        svg.append("text")
            .attr("x", -180)
            .attr("y", 0 + margin.top - 100)
            .attr("text-anchor", "middle")
            .style("font-size", "22px")
            .text("Among public school districts that offered CTE");

        svg.append("text")
            .attr("x", -180)
            .attr("y", 0 + margin.top - 70)
            .attr("text-anchor", "middle")
            .style("font-size", "22px")
            .text("programs, percentage by activity offered");
        /* custom y axis lines for two seperate graphs */
        var axisLineData2 = [{
            'x': 0,
            'y': 1.2
        },
            {
                'x': 0,
                'y': 9.2
            },
        ];


        var y_scale = d3.scaleLinear().domain([0, 1]).range([0, height / 8.72]);

        var line = d3.line()
            .x(function(d) {
                return x(d['x']);
            })
            .y(function(d) {
                return y_scale(d['y']);
            });

        var path = svg.append('path').attr("class", "yAxisLine2").attr('d', line(axisLineData2));

        //move tooltip to left of mouse for elements in the right of page
        function position_tip(x, y) {
            return ([x, y])

            }

            //set up interactive funcaitonality
        var div1 = d3.select("body").append("div")
                .attr("class", "credit_activity_tooltip")
                .style("opacity", 0);

        function mouseover(d) {
            //highlight selected school types

            d3.select(this)
                .classed("active", false)
                .attr('fill', function(d) {
                    return tooltipColor(d.characteristic);
                })


            div1.transition().duration(100)
                .style("opacity", .9);

            div1.html(
                "<span style='font-family: LibreFranklin-Medium; font-size: 13px; color: #FFFFFF; line-height: 16px;'>" +
                d3.format(",.0f")(d.pctPublicSchoolDistricts * 100) + "% " + d.characteristic + "</span>")
                .style("left", (position_tip(d3.event.pageX, d3.event.pageY)[0]) + "px")
                .style("top", (position_tip(d3.event.pageX, d3.event.pageY)[1]) + "px");

        }

            function mouseout(d) {
            div1.transition().duration(200).style("opacity", 0);

            d3.select(this)
                .classed("active", false)
                .attr('fill', function(d) {
                    if (d.characteristic === " " | d.characteristic === "") {
                        return "transparent"
                    } else {
                            return "#7EC255";

                        }
                    })
            }

    });

        //define d as a type to be used
        function type(d) {
            d.pctPublicSchoolDistricts = +d.pctPublicSchoolDistricts;
            return d;
        }
    }
}
</script>

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
