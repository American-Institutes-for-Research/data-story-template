---
sidebar_position: 5
sidebar_label: Add or edit footnote
---

# You can add or edit footnotes

A footnote link has a superscript (<sup>[1]</sup>) at the end. It looks like this:

![Image of data story template page](/img/tutorial/footnote-link.png)

When clicked on the superscript, it scrolls to the corresponding footnote in the references section:

![Image of data story template page](/img/tutorial/references-sec.png)

When clicked on the leading superscript for each entry in the references, it brings you back to the position where it is referenced in the page body.

## Edit the content of existing link and modal window

You can search for the superscript text (e.g. search `[1]`) in the code editor to locate both the link element and the footnote element:

The link:
![Image of data story template page](/img/tutorial/footnote-link-tag.png)

The footnote:
![Image of data story template page](/img/tutorial/footnote-tag.png)

Look closely at the screenshots and you'll notice, the `href` attribute of the link's `<a>` tag needs to point to the `name` attribute of the `<a>` tag in the footnote; and the `href` attribute of the `<a>` tag inside the footnote also needs to point back to the `name` attribute of the link's `<a>` tag.

You can then change the content of the link and the footnote.

## Add a new footnote

1. For the link, copy the HTML for an link superscript you find and paste it somewhere you need it to be.
2. For the footnote, copy the HTML you find and paste it alongside other footnotes.
3. Update the `href` attributes and the `name` attributes for both the link and the footnote, so that they can point to each other. The values you use should be unique too.
