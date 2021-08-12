---
sidebar_position: 5
---

# Styling

## CSS Library

The web page grid layout is using Pure.css v1.0.0. The library is in file `/template/assets/css/libs/grids-responsive.css`. You can learn about the library's CSS utility classes here: https://purecss.io/grids/.

A few animation effect on the page is powered by Animate.css v3.7.0. You can refer to its documentation here: https://animate.style/

For example, to remove the logo's delayed fade in effect, you can remove some Animate.css classes:

```html
<!-- remove 'animated' 'delay-2s' and 'fadeInLeft' -->
<img
  class="logo-overlay animated delay-2s fadeInLeft"
  src="assets/img/logo-white.svg"
  alt="U.S. Department of Education seal"
  data-parallax="-0.3"
/>
```

## Fonts

- [Google Fonts](https://fonts.google.com/), [Font Awesome](https://fontawesome.com/)
- Include in `<head>`
- Update CSS rules or HTML

## Customize CSS

You can also change/add your CSS rules in the `/template/assets/css/style.css` file to apply any stylings.

## JavaScript powered styles

The loading screen and effect is powered by JavaScript in
`/template/assets/js/loader.js`. The parallax scroll effect is also by
JavaScript in `/template/assets/js/scroll.js`. You need to know JavaScript
fairly well to customize those. But to remove the loading screen, all you need
to do is to remove this piece of HTML:

```html
<div id="loader-wrapper">
  <div id="loader"></div>
  <div class="loader-section"></div>
</div>
```

To remove the parallax effect for an element, just remove the `data-parallax` attribute, for example:

```html
<!-- remove the data-parallax="-0.3" line -->
<img
  class="logo-overlay animated delay-2s fadeInLeft"
  src="assets/img/logo-white.svg"
  alt="U.S. Department of Education seal"
  data-parallax="-0.3"
/>
```

<details>
<summary>Excercise</summary>

1. Try removing the CSS classes for the elements mentioned above to turn off the effect.

2. (optional) Any custom stylings you know how to apply?

</details>
