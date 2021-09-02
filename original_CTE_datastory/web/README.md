# Vue web app for CTE Data Story

## Note for vizs development

-   Modify D3 code in the '.vue' files in `src/components` folder to change vizs.
-   Use scoped D3 selector:

    Do not do `d3.select()` because this will select all elements on the page.
    Use elements such as `var svg = d3.select(rootEl).append("svg"); svg.select()...` in the code to do D3 selections, because this already scopes to the current viz root element.

-   Styling for vizs:

    NEED to prefix `.viz-container >>>` to all viz specific CSS selectors, so that those don't pollute the global CSS scope.

### Project setup

(first run this after cloning the repo)

```
npm install
```

### Compiles and hot-reloads for development

(incremental code changes will be automatically injected into browser and reload it once editor saves file, no need to refresh the page manually)

```
npm run serve
```

### DEPLOYMENT: compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
