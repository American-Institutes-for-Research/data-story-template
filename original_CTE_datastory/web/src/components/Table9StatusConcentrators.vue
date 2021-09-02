<template>
    <div>
        <div id="Table9StatusConcentrators_content_1" class="Table9StatusConcentrators_tabcontent">
            <div ref="viz" class="viz-container"></div>
        </div>
        <div
            id="Table9StatusConcentrators_content_2"
            class="Table9StatusConcentrators_tabcontent"
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
            id="Table9StatusConcentrators_content_3"
            class="Table9StatusConcentrators_tabcontent"
            style="display:none;"
        >
            <div class="white-info-text">
                <div class="notes-section">
                    <a
                        class="data-links"
                        href="data-download/table_employment_and_earnings_chart.xlsx"
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
                        href="javascript:TabSwitcher('Table9StatusConcentrators_tb_1', 'Table9StatusConcentrators_content_1', 'Table9StatusConcentrators_tabcontent', 'Table9StatusConcentrators_tabmenu');"
                        id="Table9StatusConcentrators_tb_1"
                        class="Table9StatusConcentrators_tabmenu active"
                    >
                        <i class="icon-chart-button"></i>
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="javascript:TabSwitcher('Table9StatusConcentrators_tb_2', 'Table9StatusConcentrators_content_2', 'Table9StatusConcentrators_tabcontent', 'Table9StatusConcentrators_tabmenu');"
                        id="Table9StatusConcentrators_tb_2"
                        class="Table9StatusConcentrators_tabmenu"
                    >
                        <i class="icon-table-button"></i>
                    </a>
                </li>-->
                <li>
                    <a
                        href="javascript:TabSwitcher('Table9StatusConcentrators_tb_3', 'Table9StatusConcentrators_content_3', 'Table9StatusConcentrators_tabcontent', 'Table9StatusConcentrators_tabmenu');"
                        id="Table9StatusConcentrators_tb_3"
                        class="Table9StatusConcentrators_tabmenu"
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
        let margin = {
            top: 200,
            right: 0,
            bottom: 22,
            left: 950
        },
            width = 1200 + margin.left,
            height = 700 + margin.top;
        //width = 2300,
        //height = 1000;
        var svg1 = d3.select(rootEl).append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1200 500")
            .classed("svg-content", true)
            .append('g')
            .attr('align', 'center')
            .attr("transform", "translate(" + (width + 120) / 4 + "," + (height + 120) / 4 + ")");

        var radius = Math.min(1200 / 4, 700 / 4);

        function mouseover() {
            pathAnim(d3.select(this), 1);
        }

        function mouseout() {
            let thisPath = d3.select(this);
            if (!thisPath.classed('clicked')) {
                pathAnim(thisPath, 0);
            }
        }


        function click() {
            let thisPath = d3.select(this);
            let clicked = thisPath.classed('clicked');
            pathAnim(thisPath, ~~(!clicked));
            thisPath.classed('clicked', !clicked);

        }

        let pathAnim = function (path, dir) {
            switch (dir) {
                case 0:
                    path.transition()
                        .duration(500)
                        .ease(d3.easeBounce)
                        .attr('d', d3.arc()
                            .innerRadius((0))
                            .outerRadius(radius * 0.8)
                        );
                    break;

                case 1:
                    path.transition()
                        .attr('d', d3.arc()
                            .innerRadius((0))
                            .outerRadius(radius * 0.90)
                        );
                    break;
            }
        };

        svg1.append("g")
            .attr("class", "slices");
        svg1.append("g")
            .attr("class", "labels");
        svg1.append("g")
            .attr("class", "lines");

        let color = d3.scaleOrdinal()
            .domain(['Employed, working full time',
                'Employed, working part time',
                'Unemployed',
                'Not in labor force'])
            //.range(['#9DD9EA', '#74CAE2', '#5CA1B4', "#497E9F"]);
            .range(['#fef0d9', '#fdcc8a', '#fc8d59', '#d7301f']);

        let pie1 = d3.pie().sort(null).value(function (d) {
            return d.pctCTEdistribution;
        });


        let arc = d3.arc()
            .innerRadius(0)
            .outerRadius(function () {
                return (d3.select(this).classed('clicked')) ? radius
                    : (radius * 0.8);
            });

        let outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        let innerArc = d3.arc()
            .innerRadius(radius * 0.45)
            .outerRadius(radius * 0.45);


        d3.csv("./assets/data/Table9_Employment_Status_CTE_concentrators.csv", function (error, data1) {
            if (error) {
                throw error;
            }
            let paths1 = svg1.selectAll('path')
                .data(pie1(data1));

            paths1.enter()
                .append('path')
                .attr('d', arc)
                .attr("fill", function (d) {
                    return color(d.data.characteristic);
                })
                .style('stroke', '#FFFFFF')
                .on('mouseover', mouseover) //show / hide the tip based on where the mouse is
                .on('mouseout', mouseout)
                .on('click', click);


            paths1.exit().remove();


            svg1.selectAll('slices')
                .data(pie1(data1))
                .enter()
                .append('text')
                .text(function (d) {
                    return Math.round(d.data.pctCTEdistribution) + "%";
                })
                .attr('transform', function (d) {
                    return "translate(" + innerArc.centroid(d) + ")";
                })
                .style('text-anchor', 'middle')
                .style('font-size', 17);
            svg1.append('g').classed('labels', true);
            svg1.append('g').classed('lines', true);

            var title = svg1.append("text")
                .attr("x", 0)
                .attr("y", 0 - 9.8 * margin.bottom - 20)
                .attr('class', 'pieTextTitle')
                .attr("text-anchor", "middle")
                .style("font-size", "22px");

            title.append("tspan")
                .text("Percentage distribution of high school");

            title.append("tspan")
                .style("font-weight","bold")
                .text(" CTE concentrators ");

            title.append("tspan")
                .text(" by ");

            svg1.append("text")
                .attr("x", 0)
                .attr("y", 0 - 9.8 * margin.bottom + 10)
                .attr('class', 'pieTextTitle')
                .attr("text-anchor", "middle")
                .style("font-size", "22px")
                .text("employment status eight years after expected high school graduation");

            let polyline = svg1.select('.lines')
                .selectAll('polyline')
                .data(pie1(data1))
                .enter().append('polyline')
                .attr('points', function (d) {
                    let posA = innerArc.centroid(d);
                    let posB = outerArc.centroid(d);
                    let posC = outerArc.centroid(d);
                    posC[0] = radius * 0.84 * (midAngle(d) < Math.PI ? 1.2 : -1.2);
                    return [posA, posB, posC]
                });



            let label = svg1.select('.labels').selectAll('text')
                .data(pie1(data1))
                .enter().append('text')
                .attr('class', 'pieText')
                .attr('dy', '.35em')
                .text(function (d) {
                    return d.data.characteristic;
                })
                .attr('transform', function (d) {
                    let pos = outerArc.centroid(d);
                    pos[0] = radius * 0.86 * (midAngle(d) < Math.PI ? 1.2 : -1.2);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function (d) {
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });
        });

        function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

        var svg2 = d3.select(rootEl).append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1200 500")
            .classed("svg-content", true)
            .append('g')
            .attr('align', 'center')
            .attr("transform", "translate(" + (width + 120) / 4 + "," + (height + 120) / 4 + ")");

        svg2.append("g")
            .attr("class", "slices");
        svg2.append("g")
            .attr("class", "labels");
        svg2.append("g")
            .attr("class", "lines");

        let pie2 = d3.pie().sort(null).value(function (d) {
            return d.pctNonCTEdistribution;
        });

        d3.csv("./assets/data/Table9_Employment_Status_Non_CTE_concentrators.csv", function (error, data2) {
            if (error) {
                throw error;
            }

            let paths2 = svg2.selectAll('path')
                .data(pie2(data2));

            paths2.enter()
                .append('path')
                .attr('d', arc)
                .attr("fill", function (d) {
                    return color(d.data.characteristic1);
                })
                .style('stroke', '#FFFFFF')
                .on('mouseover', mouseover) //show / hide the tip based on where the mouse is
                .on('mouseout', mouseout)
                .on('click', click);

            paths2.exit().remove();

            svg2.selectAll('slices')
                .data(pie2(data2))
                .enter()
                .append('text')
                .text(function (d) {
                    return Math.round(d.data.pctNonCTEdistribution) + "%";
                })
                .attr('transform', function (d) {
                    return "translate(" + innerArc.centroid(d) + ")";
                })
                .style('text-anchor', 'middle')
                .style('font-size', 17);
            svg2.append('g').classed('labels', true);
            svg2.append('g').classed('lines', true);


            var title = svg2.append("text")
                .attr("x", 0)
                .attr("y", 0 - 9.8 * margin.bottom - 20)
                .attr('class', 'pieTextTitle')
                .attr("text-anchor", "middle")
                .style("font-size", "22px");

            title.append("tspan")
                .text("Percentage distribution of high school");

            title.append("tspan")
                .style("font-weight","bold")
                .text(" non-CTE concentrators ");

            title.append("tspan")
                .text(" by ");

            svg2.append("text")
                .attr("x", 0)
                .attr("y", 0 - 9.8 * margin.bottom + 10)
                .attr('class', 'pieTextTitle')
                .attr("text-anchor", "middle")
                .style("font-size", "22px")
                .text("employment status eight years after expected high school graduation");

            let polyline = svg2.select('.lines')
                .selectAll('polyline')
                .data(pie2(data2))
                .enter().append('polyline')
                .attr('points', function (d) {
                    let posA = innerArc.centroid(d);
                    let posB = outerArc.centroid(d);
                    let posC = outerArc.centroid(d);
                    posC[0] = radius * 0.84 * (midAngle(d) < Math.PI ? 1.2 : -1.2);
                    return [posA, posB, posC]
                });



            let label = svg2.select('.labels').selectAll('text')
                .data(pie2(data2))
                .enter().append('text')
                .attr('class', 'pieText')
                .attr('dy', '.35em')
                .text(function (d) {
                    return d.data.characteristic1;
                })
                .attr('transform', function (d) {
                    let pos = outerArc.centroid(d);
                    pos[0] = radius * 0.86 * (midAngle(d) < Math.PI ? 1.2 : -1.2);
                    return 'translate(' + pos + ')';
                })
                .style('text-anchor', function (d) {
                    return (midAngle(d)) < Math.PI ? 'start' : 'end';
                });
        });
    }
}
</script>

<style scoped>
/*load the fonts from the .ttf files*/
@font-face {
    font-family: "LibreFranklin-Bold";
    src: url("../assets/font/LibreFranklin-Bold.ttf");
}
@font-face {
    font-family: "LibreFranklin-SemiBold";
    src: url("../assets/font/LibreFranklin-SemiBold.ttf");
}
@font-face {
    font-family: "LibreFranklin-Regular";
    src: url("../assets/font/LibreFranklin-Regular.ttf");
}

.viz-container >>> .pie {
    padding: 0 12px 5px 12px;
}
.viz-container >>> svg {
    padding: 0px 50px 20px 0px;
}
.viz-container >>> .legend {
    vertical-align: top;
}
.viz-container >>> .pieTextTitle {
    font-family: LibreFranklin-Regular, serif;
    font-size: 14px;
    color: #474747;
    text-anchor: middle;
    line-height: 22px;
    text-align: center;
}
.viz-container >>> .pieText {
    font-family: LibreFranklin-Regular, serif;
    font-size: 11px;
    color: #474747;
    line-height: 15px;
    text-anchor: middle;
    position: absolute;
    text-align: left;
}

/*Styling for the lines connecting the labels to the slices*/
.viz-container >>> polyline {
    opacity: 0.3;
    stroke: black;
    stroke-width: 2px;
    fill: none;
}
.viz-container >>> #container {
    width: 100%;
    margin: auto;
}
.viz-container >>> #chart1 {
    float: left;
}

.viz-container >>> #chart2 {
    float: left;
}
.viz-container >>> #clear {
    clear: both;
}
.viz-container >>> .right {
    text-anchor: end;
}
.viz-container >>> .middle {
    text-anchor: middle;
}

.viz-container >>> .left {
    text-anchor: start;
}
</style>
