---
sidebar_position: 4
sidebar_label: Add or edit modal window
---

# Add or edit modal windows

You can edit existing modal window content or add a new one. A modal window is the popup dialog box when you click on a clickable link with the book icon. For example, when clicking a link like this:

![Image of data story template page](/img/tutorial/modal-link.png)

The corresponding modal window opens up:

![Image of data story template page](/img/tutorial/modal-window.png)

## Edit the content of existing link and modal window

You can search for the text of the link in the code editor to locate the `<a>` tag for the link:

![Image of data story template page](/img/tutorial/modal-link-tag.png)

The tag always has a CSS class of `class="md-trigger more-info"`. And it has a `data-modal` attribute pointing to the modal window element's unique ID, which you can also use to search and locate the modal window's HTML tag in the code editor. The modal window container always has a CSS class of `class="md-modal md-effect-9"`.

![Image of data story template page](/img/tutorial/modal-window-tag.png)

You can then change the content of the link and the modal window.

## Add a new modal window

1. For the link, copy an `<a class="md-trigger more-info>` tag (and its content) you find and paste it somewhere you need it to be.
2. For the modal window, copy a `<div class="md-modal md-effect-9>` tag (and its content) you find and paste it alongside other modal window container's HTML tags.
3. Update the `data-modal` attribute of the link tag and the `id` attribute of the modal window container tag so that the link can point to the modal window. Its value must be unique (e.g. if `modal-5` is already used, use `modal-6` or something unique.).
