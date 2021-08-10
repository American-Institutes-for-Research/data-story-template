---
sidebar_position: 3
sidebar_label: Add a chart via iframe
---

# Add an interactive chart exported as an iframe

1. R libraries such as [plotly-r](https://plotly-r.com/index.html) can [export the interactive chart as an HTML widget](https://plotly-r.com/saving.html), which you can then embed as an iframe on the page.

2. The exported HTML page usually has one `.html` file as an entry point and several supporting assets it uses.

3. Place the exported widget files in the `/template/charts/r-exports/` folder. You can also create subfolder (e.g. `/template/charts/r-exports/name-of-chart/`) for a standalone export that does not share libraries with other exports.

4. Again, the container element with the class `chart-image-container` is used for displaying these charts too. In the HTML file, find one of these elements which you want to place the chart in. You can use the editor's text search feature to search for `class="chart-image-container"` and locate them.

5. Add an `<iframe>` tag and its associated attributes as the screenshot below to point to the entry `.html` file you just placed in the folder.
   1. The `<iframe>` must have the `responsive-iframe` CSS class to be responsive.
   2. It also needs to have an `aria-label` so that the screen reader can read its content to a visually impaired user.
   3. The `style="padding-top: 56.25%"` special attribute controls the aspect ratio (width/height) of the iframe. You need to adjust this for each chart individually to make sure the chart is not being cut off. For example, a 16:9 aspect ratio is represented by `style="padding-top: 56.25%"` because 9(height) / 16(width) = 0.5625, which is 56.25%.

![Image of vs code editing HTML](/img/tutorial/iframe-chart-div.png)
