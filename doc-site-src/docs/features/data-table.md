---
sidebar_position: 6
sidebar_label: Add chart data table
---

# Add or update the corresponding data table for each chart

The data table for each chart is created using Google Sheets. It provides out of the box iframe embed and download capabilities:

![Image of data story template page](/img/tutorial/data-table.png)

## Create the table

1. Create or open a Google Sheet, insert your table(s). You can use one document with several sheets. Each sheet contains the data table for one chart.
2. Click: File -> Publish to the web

![Image of google sheet](/img/tutorial/google-sheet-publish.png)

3. For download, under the "Link" tab:

   1. Select the sheet you want to publish for download, then choose the file type you prefer
   2. Click "Publish", copy the URL generated
   3. (See screenshot below) Paste the URL in the `href` attibute of the `<a class="data-links">` element (the element is inside the second `tab-content-area` element). (The HTML element for all the data table has a special attribute of `:class="activeTab === 2 ? 'active' : ''"`.)

4. For embed, under the "Embed" tab:
   1. Select the sheet you want to publish for embed
   2. Click "Publish", copy the `<iframe>` code generated
   3. (See screenshot below) Paste the `<iframe>` code in the `<div>` of the table's `tab-content-area` element.

![Image of google sheet HTML](/img/tutorial/table-tab-html.png)

## Update the tables

When publishing, if "Automatically republish when changes are made" is enabled, the table in the web template will always has the latest content. Otherwise, you need to republish the sheet after you make a change.
