---
sidebar_position: 3
sidebar_label: Images
---

# Update or add images

Other than charts' image exports, images include favicon, hero images and logos.

## Favicon

You can find the favicon tag at the end of the HTML `<head>` tag:

![Image of favicon tag](/img/tutorial/favicon-tag.png)

Favicon is the icon shown in the browser tab or as the web page bookmark icon.

You can update the icon image in the `/template/assets/img` folder. The image for a favicon should be small. It is easier to use a tool like https://favicon.io/ to generate it.

Once you placed the new favicon image in the folder, you need to update the `href` of the `<link>` to point to the new image (if the image path or file name changes).

## Hero images or logo images

These are just regular HTML images. You can also place them in the `/template/assets/img` folder, and update corresponding `href` attributes of the `<img>` tags. It is recommended to use a tool like https://tinypng.com/ to compress the image before you use them. Big images can cause the web page to load slow.

You can also delete the `<img>` tag to remove an image.

## Add an image

You can add new image in the page body using the typical HTML `<img>` tag. There is no special treatment here.

For example, you can add this to the HTML body where you want to place the image:

```html
<img src="./assets/img/new-image.png" alt="a new image" />
```

Additionally, you can add inline CSS styles or use a CSS class to style it:

```html
<img
  style="margin: 30px 0;"
  src="./assets/img/new-image.png"
  alt="a new image"
/>

<!-- add the style for img-with-margins in /template/assets/css/style.css -->
<img
  class="img-with-margins"
  src="./assets/img/new-image.png"
  alt="a new image"
/>
```
