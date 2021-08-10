---
sidebar_position: 3
---

# Update images

Images include favicon, hero images and logos.

## Favicon

You can find the favicon tag at the end of the HTML `<head>` tag:

![Image of favicon tag](/img/tutorial/favicon-tag.png)

Favicon is the icon shown in the browser tab or as the web page bookmark icon.

You can update the icon image in the `/template/assets/img` folder. The image for a favicon should be small. It is easier to use a tool like https://favicon.io/ to generate it.

Once you placed the new icon image in the folder, you also need to update the `href` to point to the new image (if the image path or name changes).

## Hero images or logo images

These are just regular HTML images. You can also place them in the `/template/assets/img` folder, and update corresponding `href` attributes of the `<image>` tags. It is recommended to use a tool like https://tinypng.com/ to compress the image before you use them. Big images can cause the web page to load slow.
