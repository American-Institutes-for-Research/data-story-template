---
sidebar_position: 1
---

# Intro

- This tutorial assumes you have a little HTML, CSS, and JavaScript knowledge, especially if you want to customize the look and functionalities of the template. We won't teach these topics from the groud up. But feel free to ask any questions related to these.
- Many comments are added in the code files to give hints about their functionalities, which you can refer to.

Let's first see how to set up an environment on the computer to run and edit the template.

## Tools

**For this tutorial, we'll use:**

- [RStudio](https://www.rstudio.com/)
  - RStudio can be used to edit HTML, JavaScript, and CSS files.
- R package [servr](https://github.com/yihui/servr)
  - We use this package to run a simple local web server for development.

Alternatively, there are other great choices for code editor and IDE such as [VS Code](https://code.visualstudio.com/). And you could use [Node](https://nodejs.org/en/) to run a local dev server. But we won't use them for this tutorial.

## Start the site locally

- Download the repository that contains the template.
- Open the `template` folder in RStudio.
  - File -> Open Project
- Open a new terminal in RStudio
  - Tools -> Terminal -> New Terminal
- In the terminal, run command `Rscript -e "servr::httw()" -b`. It should open your default browser and display the “index.html” page.

  ![Image of a terminal in RStudio](/img/tutorial/new-terminal-serve-up.png)

- As soon as you edit the code files and save, `servr` should automatically reload the web page.