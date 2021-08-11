---
sidebar_label: Add a static chart
sidebar_position: 2
---

# Add a chart export as a static image

1. Place the chart's image export in the `/template/charts/static-imgs/` folder. It can be PNG, JPEG, or even SVG. The size of the image file should be ideally smaller than 800KB for better loading performance.

2. The container element with the class `chart-image-container` is used for displaying charts.

There are two sizes. The one inside the `<div class="small-chart-area">` will be dislayed in the smaller size.
![Image of vs code editing HTML](/img/tutorial/small-chart-html-screenshot.png)
![Image of vs code editing HTML](/img/tutorial/small-chart-screenshot.png)

The one inside the `<div class="large-chart-area">` will be dislayed in the larger size.
![Image of vs code editing HTML](/img/tutorial/large-chart-html-screenshot.png)
![Image of vs code editing HTML](/img/tutorial/large-chart-screenshot.png)

You can use the editor's text search feature to search for `class="chart-image-container"`, `class="small-chart-area"`, or `class="large-chart-area"` to locate them.

3. Update the file path (`src` attribute) for the `img` element inside the chart container, to point to the chart image file.

4. For accessibility, add a description in the `alt` attribute for screen reader users.

![Image of vs code editing HTML](/img/tutorial/static-chart-html.png)

<details>
<summary>Excercise</summary>

1. (optional) Try updating a "small-chart-area" container to display the `/template-excercise-material/DataStories_HEERF_Graph.png` chart.

</details>
