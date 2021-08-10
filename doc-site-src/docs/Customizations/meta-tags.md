---
sidebar_position: 4
sidebar_label: Meta tags
---

# Title and meta tag

## Title tag

The title tag is the text that will dispaly in search engine search results, browser tabs, bookmarks, etc.

![Image of title tag](/img/tutorial/title-tag.png)

## Web page meta tags

Meta tags are located in the `<head>` tag of an HTML document. They are usually not displayed anywhere. But they provide meta information of the web page so that tools like search engine or social media can make use of them.

![Image of meta tag](/img/tutorial/meta-tag.png)

Comments with `EDIT THIS` prefix are added in this section to explain each tags' purpose. You should edit them to complete your web page customization.

## Share via email template

In the `<header>` element, you can find an `<a class="social-links">` tag:

![Image of email tag](/img/tutorial/email-tag.png)

You should create a string of text follow the format:

> mailto:?subject=email%20title&amp;body=email%body%content

Notice it has some special characters in it. That is because in a URL you need to escape certain special characters so that they can be displayed properly.

To deal with this, you can write a plain text like this:

> mailto:?subject=data story email title&body=my email body content

Then, use a tool like https://www.web2generators.com/html-based-tools/online-html-entities-encoder-and-decoder to convert any special characters.

Last, copy & paste the converted text in the `href` attribute.

When you click the share by email icon, the computer's default email client will be automatically filled with the template text:

![Image of email open](/img/tutorial/email-open.png)
