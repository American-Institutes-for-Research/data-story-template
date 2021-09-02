<template>
    <div>
        <div id="Table6aConcentrators_content_1" class="Table6aConcentrators_tabcontent">
            <div ref="viz" class="viz-container"></div>
        </div>
        <div
            id="Table6aConcentrators_content_2"
            class="Table6aConcentrators_tabcontent"
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
            id="Table6aConcentrators_content_3"
            class="Table6aConcentrators_tabcontent"
            style="display:none;"
        >
            <div class="white-info-text">
                <div class="notes-section">
                    <a
                        class="data-links"
                        href="data-download/table_attainment_chart.xlsx"
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
                        href="javascript:TabSwitcher('Table6aConcentrators_tb_1', 'Table6aConcentrators_content_1', 'Table6aConcentrators_tabcontent', 'Table6aConcentrators_tabmenu');"
                        id="Table6aConcentrators_tb_1"
                        class="Table6aConcentrators_tabmenu active"
                    >
                        <i class="icon-chart-button"></i>
                    </a>
                </li>
                <!-- <li>
                    <a
                        href="javascript:TabSwitcher('Table6aConcentrators_tb_2', 'Table6aConcentrators_content_2', 'Table6aConcentrators_tabcontent', 'Table6aConcentrators_tabmenu');"
                        id="Table6aConcentrators_tb_2"
                        class="Table6aConcentrators_tabmenu"
                    >
                        <i class="icon-table-button"></i>
                    </a>
                </li>-->
                <li>
                    <a
                        href="javascript:TabSwitcher('Table6aConcentrators_tb_3', 'Table6aConcentrators_content_3', 'Table6aConcentrators_tabcontent', 'Table6aConcentrators_tabmenu');"
                        id="Table6aConcentrators_tb_3"
                        class="Table6aConcentrators_tabmenu"
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
            top: 300,
            right: 0,
            bottom: 22,
            left: 975
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

        var color1 = d3.scaleOrdinal()
            .domain(['Less than high school',
                'High school',
                'Some college, no credential',
                'Undergraduate certificate',
                'Associate’s degree',
                'Bachelor’s degree',
                'Graduate or professional degree or certificate'])
            //.range(['#9DD9EA', '#74CAE2', '#5CA1B4', '#E9F1C6', '#D9E79C', '#CADD72', '#A1B05B']);
            .range(['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']);

        var pie1 = d3.pie().sort(null).value(function (d) {
            return d.pctCTEdistribution;
        });

        var arc = d3.arc().innerRadius(0).outerRadius(radius * 0.8);

        var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        var innerArc = d3.arc()
            .innerRadius(radius * 0.50)
            .outerRadius(radius * 0.50);


        d3.csv("./assets/data/Table6a_Highest_education_CTE_concentrators.csv", function (error, data1) {
            if (error) {
                throw error;
            }
            var paths1 = svg1.selectAll('path')
                .data(pie1(data1));

            paths1.enter()
                .append('path')
                .attr('d', arc)
                .attr("fill", function (d) {
                    return color1(d.data.characteristic1);
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
                .attr("class", function (d) {
                    if (d.data.characteristic1 == "Less than high school") {
                        return 'left';
                    } else if (d.data.characteristic1 == "Graduate or professional degree or certificate") {
                        return 'middle';
                    }
                    else {
                        return 'middle';
                    }
                })
                .text(function (d) {
                    return Math.round(d.data.pctCTEdistribution * 100) + "%";
                })
                .attr('transform', function (d) {
                    if (d.data.characteristic1 == "Less than high school") {
                        // console.log(typeof (innerArc.centroid(d)));
                        return "translate(" + 10 + "," + innerArc.centroid(d)[1] + ")";
                    }
                    else {
                        return "translate(" + innerArc.centroid(d) + ")";
                    }
                })
                .style('text-anchor', 'middle')
                .style('font-size', 15);

            svg1.append('g').classed('labels', true);
            svg1.append('g').classed('lines', true);

            var title = svg1.append("text")
                .attr("x", 0)
                .attr("y", 0 - 9.8 * margin.bottom - 40)
                .attr('class', 'pieTextTitle')
                .attr("text-anchor", "middle")
                .style("font-size", "22px");

            title.append("tspan")
                .text("Percentage distribution of high school");

            title.append("tspan")
                .style("font-weight","bold")
                .text(" CTE concentrators");

            title.append("tspan")
                .text(" by highest level of ");

            svg1.append("text")
                .attr("x", 0)
                .attr("y", 0 - 9.8 * margin.bottom -10)
                .attr('class', 'pieTextTitle')
                .attr("text-anchor", "middle")
                .style("font-size", "22px")
                .text("educational attainment eight years after expected high school graduation");


            var polyline1 = svg1.select('.lines')
                .selectAll('polyline')
                .data(pie1(data1))
                .enter().append('polyline')
                .attr('points', function (d) {
                    var posA = innerArc.centroid(d);
                    var posB = outerArc.centroid(d);
                    var posC = outerArc.centroid(d);
                    posC[0] = radius * 0.80 * (midAngle(d) < Math.PI ? 1.2 : -1);
                    return [posA, posB, posC]
                });



            var label1 = svg1.select('.labels').selectAll('text')
                .data(pie1(data1))
                .enter().append('text')
                .attr('class', 'pieText')
                .attr('dy', '.35em')
                .text(function (d) {
                    return d.data.characteristic1;
                })
                .attr('transform', function (d) {
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 0.83 * (midAngle(d) < Math.PI ? 1.2 : -1);
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

        var color2 = d3.scaleOrdinal()
            .domain(['Less than high school',
                'High school',
                'Some college, no credential',
                'Undergraduate certificate',
                'Associate’s degree',
                'Bachelor’s degree',
                'Graduate or professional degree or certificate'])
            // .range(['#9DD9EA', '#74CAE2', '#5CA1B4', '#E9F1C6', '#D9E79C', '#CADD72', '#A1B05B']);
            .range(['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']);

        var pie2 = d3.pie().sort(null).value(function (d) {
            return d.pctNonCTEdistribution;
        });

        var path2 = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var label2 = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 80);

        d3.csv("./assets/data/Table6a_Highest_education_NonCTE_concentrators.csv", function (error, data2) {
            if (error) {
                throw error;
            }
            let paths2 = svg2.selectAll('path2')
                .data(pie2(data2));

            paths2.enter()
                .append('path')
                .attr('d', arc)
                .attr("fill", function (d) {
                    return color2(d.data.characteristic2);
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
                    return Math.round(d.data.pctNonCTEdistribution * 100) + "%";
                })
                .attr('transform', function (d) {
                    return "translate(" + innerArc.centroid(d) + ")";
                })
                .style('text-anchor', 'middle')
                .style('font-size', 15);

            svg2.append('g').classed('labels', true);
            svg2.append('g').classed('lines', true);

            var title = svg2.append("text")
                .attr("x", 0 -3)
                .attr("y", 0 - 9.8 * margin.bottom - 40)
                .attr('class', 'pieTextTitle')
                .attr("text-anchor", "middle")
                .style("font-size", "22px");

            title.append("tspan")
                .text("Percentage distribution of high school");

            title.append("tspan")
                .style("font-weight","bold")
                .text(" non-CTE concentrators");

            title.append("tspan")
                .text(" by highest level of ");

            svg2.append("text")
                .attr("x", 0 -3)
                .attr("y", 0 - 9.8 * margin.bottom -10)
                .attr('class', 'pieTextTitle')
                .attr("text-anchor", "middle")
                .style("font-size", "22px")
                .text("educational attainment eight years after expected high school graduation");

            var polyline2 = svg2.select('.lines')
                .selectAll('polyline')
                .data(pie2(data2))
                .enter().append('polyline')
                .attr('points', function (d) {
                    var posA = innerArc.centroid(d);
                    var posB = outerArc.centroid(d);
                    var posC = outerArc.centroid(d);
                    posC[0] = radius * 0.80 * (midAngle(d) < Math.PI ? 1.2 : -1.2);
                    return [posA, posB, posC]
                });



            var label2 = svg2.select('.labels').selectAll('text')
                .data(pie2(data2))
                .enter().append('text')
                .attr('class', 'pieText')
                .attr('dy', '.35em')
                .text(function (d) {
                    return (d.data.characteristic2);
                })
                .attr('transform', function (d) {
                    var pos = outerArc.centroid(d);
                    pos[0] = radius * 0.83 * (midAngle(d) < Math.PI ? 1.2 : -1.2);
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
