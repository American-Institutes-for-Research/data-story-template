---
sidebar_position: 1
---

# Intro

- The template is made based on [Algebra](https://www2.ed.gov/datastory/stem/algebra/index.html) and [CTE](https://www2.ed.gov/datastory/cte/index.html) data story.
- This tutorial assumes you know a little HTML, CSS, and JavaScript, especially if you want to customize the look and functionalities of the template. We won't teach these topics from the groud up. But feel free to ask any questions related to these.
  - I recommend [freeCodeCamp](https://www.freecodecamp.org/) if you are serious about learning web development.
    - For beginners: https://www.freecodecamp.org/news/html-css-and-javascript-explained-for-beginners/
    - freeCodeCamp is a completely open source, free, and community driven initiative. It offers guided courses on front end and back end development, data viz, machine learning, software testing, security, and more.
- Some comments are added in the code files to give hints about their functionalities.

During the process, we'll build portions of the data story in `/template-excercise-material/HEERF Reporting OCDO Blog Entry v0.2 - Copy.docx`.

Let's first see how to set up an environment on the computer to run and edit the template locally.

## Tools

**For this tutorial, we'll use:**

- [RStudio](https://www.rstudio.com/)
  - RStudio can be used to edit HTML, JavaScript, and CSS files.
- R package [servr](https://github.com/yihui/servr)
  - We use this package to run a R powered simple local web server for development.

There are other great choices for code editor and IDE such as [VS Code](https://code.visualstudio.com/). You could also use [Node](https://nodejs.org/en/) to run a local dev server. But we won't use them for this tutorial.

## Start the site locally

- Download the repository that contains the template.
- Open the `template` folder in RStudio.
  - File -> Open Project
- Open a new terminal in RStudio
  - Tools -> Terminal -> New Terminal
- In the terminal, run the command `Rscript -e "servr::httw()" -b`. It should open your default browser and display the “index.html” page.

  ![Image of a terminal in RStudio](/img/tutorial/new-terminal-serve-up.png)

- As soon as you edit the code files and save, `servr` should automatically reload the web page. But this feature does not work all the time, often you'll need to hit the refresh button on your browser to bring in changes.

## For Python users whose R is not working

- Open the project in whatever code editor/IDE you prefer - they typically support HTML/CSS/JavaScript out of the box.
- In a terminal, at project root, run `python -m SimpleHTTPServer 8080` to spin up a basic static server.

<details>
<summary>Excercise</summary>

1. Set up your local web dev enviroment, and make sure it is working.

</details>
