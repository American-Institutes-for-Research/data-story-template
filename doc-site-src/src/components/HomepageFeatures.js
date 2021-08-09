import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Just one page",
    description: (
      <>The template has only one HTML file - a single page data story.</>
    ),
  },
  {
    title: "Vanilla HTML5",
    description: (
      <>
        Just plain HTML, JavaScript, CSS, plus a few lightweight libraries. No
        framework, no build tool.
      </>
    ),
  },
  {
    title: "Responsive",
    description: <>Works on mobile devices and smaller screens.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
