"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./page.module.scss";
import Link from "next/link";

const FRAMEWORKS = [
  "React",
  "Next.js",
  "Express",
  "Nest.js",
  "Mongoose",
  "axios",
  "ethers.js",
  "truffle",
  "hardhat",
  "fastapi",
];

const ResumeHint = () => {
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isHovered) {
      textRef.current?.classList.add(styles.resume_hint_hovered);
    } else {
      textRef.current?.classList.remove(styles.resume_hint_hovered);
    }
  }, [isHovered]);

  return (
    <p
      className={classNames(styles.resume_hint, styles.line_before)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <span className={styles.resume_hint_text} ref={textRef}>
          pm on tg for it ;)
        </span>
      )}
      resume
    </p>
  );
};

export default function Home() {
  const [fwExpanded, setFwExpanded] = useState(false);
  const [fwWidth, setFwWidth] = useState<number[]>([-1, -1]);

  const expandedRef = useRef<HTMLDivElement>(null);
  const shortenedRef = useRef<HTMLDivElement>(null);

  const getStackGroup = (
    expanded: boolean,
    ref: React.RefObject<HTMLDivElement> | undefined,
    hidden: boolean = false,
    children: React.ReactNode | undefined = undefined,
    isMobile = false
  ): JSX.Element => {
    let frameworks = FRAMEWORKS;
    let computedWidth = fwWidth[expanded ? 1 : 0];

    if (!isMobile) {
      if (hidden) frameworks = frameworks.slice(0, expanded ? undefined : 4);
      if (computedWidth == -1) frameworks = frameworks.slice(0, 4);
    }

    const getStyleProp = () => {
      if (isMobile) return undefined;
      else
        return !hidden && computedWidth != -1
          ? { width: computedWidth }
          : undefined;
    };

    return (
      <div
        className={classNames(styles.group, {
          [styles.group_hidden]: hidden,
        })}
        ref={ref}
        style={getStyleProp()}
      >
        {frameworks.map((item, index) => (
          <p
            className={styles.group_item}
            key={`${item}-${index}-${expanded}-${hidden}-${computedWidth}`}
          >
            {item}
          </p>
        ))}
        {children}
      </div>
    );
  };

  useEffect(() => {
    setFwWidth([
      shortenedRef.current?.clientWidth ?? -1,
      expandedRef.current?.clientWidth ?? -1,
    ]);
  }, [shortenedRef.current?.clientWidth, expandedRef.current?.clientWidth]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>pqhaz</h1>
          <p className={styles.description}>
            fullstack developer with more than 3 years of commercial projects
            development experience, part-time available. mostly web3, but can
            work with any stack.
          </p>
          <div className={styles.delimiter} />

          <p className={styles.group_title}>stack:</p>
          <div className={styles.group}>
            {[
              "HTML",
              "JavaScript",
              "TypeScript",
              "CSS",
              "SCSS",
              "Solidity",
              "Python",
            ].map((item, index) => (
              <p className={styles.group_item} key={`lang-${index}`}>
                {item}
              </p>
            ))}
          </div>

          <p className={styles.group_title}>frameworks:</p>
          <div className={styles.group_wrapper}>
            {getStackGroup(fwExpanded, undefined, false)}

            <p
              className={classNames(styles.group_item, styles.show_more_btn, {
                [styles.show_more_hidden]: fwExpanded,
              })}
              onClick={() => setFwExpanded(true)}
            >
              show more
            </p>
          </div>
          <div className={styles.stack_mobile}>
            {getStackGroup(true, undefined, false, undefined, true)}
          </div>

          {/* Width measures */}
          {getStackGroup(true, expandedRef, true)}
          {getStackGroup(false, shortenedRef, true)}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.contacts}>
          <p className={styles.email}>me@pqhaz.cc</p>
          <Link
            className={classNames(styles.telegram, styles.line_before)}
            target="_blank"
            href="https://t.me/pqhaz"
          >
            t.me
          </Link>
          <ResumeHint />
        </div>
        <p className={styles.powered_by}>made with next.js and pure react</p>
      </div>
    </main>
  );
}
