library(plotly)

data(diamonds, package = "ggplot2")
diamonds


chart1 <- plot_ly(diamonds, x = ~cut)
chart2 <- plot_ly(diamonds, x = ~cut, y = ~clarity)
chart3 <- plot_ly(diamonds, x = ~cut, color = ~clarity, colors = "Accent")

saveWidget(chart1, "chart1.html", selfcontained = F, libdir = "lib")
saveWidget(chart2, "chart2.html", selfcontained = F, libdir = "lib")
saveWidget(chart3, "chart3.html", selfcontained = F, libdir = "lib")