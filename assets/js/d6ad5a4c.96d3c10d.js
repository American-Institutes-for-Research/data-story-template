"use strict";(self.webpackChunkdoc_site=self.webpackChunkdoc_site||[]).push([[922],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return h}});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var c=r.createContext({}),s=function(e){var t=r.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=s(a),h=n,b=u["".concat(c,".").concat(h)]||u[h]||p[h]||o;return a?r.createElement(b,i(i({ref:t},d),{},{components:a})):r.createElement(b,i({ref:t},d))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var s=2;s<o;s++)i[s]=a[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},3464:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return d},default:function(){return u}});var r=a(7462),n=a(3366),o=(a(7294),a(3905)),i=["components"],l={sidebar_position:6,sidebar_label:"Add chart data table"},c="Add or update the corresponding data table for each chart",s={unversionedId:"features/data-table",id:"features/data-table",isDocsHomePage:!1,title:"Add or update the corresponding data table for each chart",description:"The data table for each chart is created using Google Sheets. It provides out of the box iframe embed and download capabilities:",source:"@site/docs/features/data-table.md",sourceDirName:"features",slug:"/features/data-table",permalink:"/data-story-template/docs/features/data-table",editUrl:"https://github.com/American-Institutes-for-Research/data-story-template/edit/master/website/docs/features/data-table.md",version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,sidebar_label:"Add chart data table"},sidebar:"tutorialSidebar",previous:{title:"Add or edit footnote",permalink:"/data-story-template/docs/features/footnote"},next:{title:"Styling",permalink:"/data-story-template/docs/Customizations/styling"}},d=[{value:"Create the table",id:"create-the-table",children:[]},{value:"Update the tables",id:"update-the-tables",children:[]}],p={toc:d};function u(e){var t=e.components,l=(0,n.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"add-or-update-the-corresponding-data-table-for-each-chart"},"Add or update the corresponding data table for each chart"),(0,o.kt)("p",null,"The data table for each chart is created using Google Sheets. It provides out of the box iframe embed and download capabilities:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of data story template page",src:a(229).Z})),(0,o.kt)("h2",{id:"create-the-table"},"Create the table"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create or open a Google Sheet, insert your table(s). You can use one document with several sheets. Each sheet contains the data table for one chart."),(0,o.kt)("li",{parentName:"ol"},"Click: File -> Publish to the web")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of google sheet",src:a(2856).Z})),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},'For download, under the "Link" tab:'),(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},"Select the sheet you want to publish for download, then choose the file type you prefer"),(0,o.kt)("li",{parentName:"ol"},'Click "Publish", copy the URL generated'),(0,o.kt)("li",{parentName:"ol"},"(See screenshot below) Paste the URL in the ",(0,o.kt)("inlineCode",{parentName:"li"},"href")," attibute of the ",(0,o.kt)("inlineCode",{parentName:"li"},'<a class="data-links">')," element (the element is inside the second ",(0,o.kt)("inlineCode",{parentName:"li"},"tab-content-area")," element). (The HTML element for all the data table has a special attribute of ",(0,o.kt)("inlineCode",{parentName:"li"},":class=\"activeTab === 2 ? 'active' : ''\""),".)"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},'For embed, under the "Embed" tab:'),(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},"Select the sheet you want to publish for embed"),(0,o.kt)("li",{parentName:"ol"},'Click "Publish", copy the ',(0,o.kt)("inlineCode",{parentName:"li"},"<iframe>")," code generated"),(0,o.kt)("li",{parentName:"ol"},"(See screenshot below) Paste the ",(0,o.kt)("inlineCode",{parentName:"li"},"<iframe>")," code in the ",(0,o.kt)("inlineCode",{parentName:"li"},"<div>")," of the table's ",(0,o.kt)("inlineCode",{parentName:"li"},"tab-content-area")," element.")))),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of google sheet HTML",src:a(4747).Z})),(0,o.kt)("h2",{id:"update-the-tables"},"Update the tables"),(0,o.kt)("p",null,'When publishing, if "Automatically republish when changes are made" is enabled, the table in the web template will always has the latest content. Otherwise, you need to republish the sheet after you make a change.'))}u.isMDXComponent=!0},229:function(e,t,a){t.Z=a.p+"assets/images/data-table-fcf92dbdb2dc73dc19a901088a661239.png"},2856:function(e,t,a){t.Z=a.p+"assets/images/google-sheet-publish-bc37cc1decca96d004b42ce806995b45.png"},4747:function(e,t,a){t.Z=a.p+"assets/images/table-tab-html-d007607d55125e651cf39f0eed53d5f1.png"}}]);