---
sidebar_label: Add or edit links on top
sidebar_position: 1
---

# Links in the top navigation

When the page is scrolled down a bit, a top navigation will appear. The links in the top navigation are page anchors. When one is clicked, the page can scroll to an element’s position that you’ve specified.

## How to add a new one

1. Open the file `/template/assets/js/scroll.js`.
2. Find code block around 100, add a new item for the displayed name (`NEW SECTION NAME`) of the link, and unique ID (`UniqueSectionAnchorID`) for the element it will scroll to. For example:

![Image of vs code editing JS](/img/tutorial/add-a-link-js-code.png) _The left side is the name that will be displayed in the top navigation (“NEW SECTION NAME”), the right side is the anchor ID given to the element on the web ("UniqueSectionAnchorID")._

3. Add the anchor ID (`UniqueSectionAnchorID`) to an HTML element that you want it to scroll to on the page, in the `index.html` file:

![Image of vs adding HTML anchor](/img/tutorial/anchor-html.png)

4. Done. Scroll the page down a bit to show the top navigation, then click the link you just added. It will scroll to the element that you specified.

![Image of HTML page](/img/tutorial/nav-new-link.png)

## Edit existing ones

1. You can change the displayed name of the link in the same place in the `/template/assets/js/scroll.js` file.
2. To change the anchored position, in the HTML file, cut out the corresponding anchor ID attribute and add it to a different element that you need it to scroll to.
