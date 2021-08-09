---
sidebar_label: Add a static chart
sidebar_position: 2
---

# Add a chart export as a static image

1. Place the chart's image export in the “/template/charts/static-imgs/” folder. It can be PNG, JPEG, or even SVG. The size of the image file should be ideally smaller than 800KB for better loading performance.

2. The container element with the class `chart-image-container` is used for displaying charts. In the HTML file, find one of these elements which you want to place the chart in. You can use the editor's text search feature to search for `class="chart-image-container"`.

3. Update the file path (`src` attribute) for the `img` element inside the chart container, to point to the chart export:

4. For accessibility, add a description in the `alt` attribute for screen reader users.

![Image of vs code editing HTML](/img/tutorial/static-chart-html.png)
