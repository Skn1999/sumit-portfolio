import { Fragment, type CSSProperties } from "react";
import { motionTokens } from "../motion-tokens";
import styles from "./text-reveal.module.css";
import { EmDash } from "@/components/EmDash";

/**
 * Reveals a short headline or sentence once, as it mounts: each word rises out of its own clip while it sharpens from a soft blur.
 * The entrance runs in CSS, so it starts on first paint, never waits for hydration, and never leaves text hidden when scripts are slow.
 * Use `\n` in `text` for a deliberate line break and change the element's `key` to replay it.
 */
export interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  /** Seconds to wait before the first word rises. Defaults to 0. */
  delay?: number;
}

/** Total stagger stays under this many seconds, however long the text is. */
const MAX_STAGGER = motionTokens.duration.considered;

interface WordToken {
  word: string;
  isBold: boolean;
  isEmDash: boolean;
}

function parseLine(line: string): WordToken[] {
  const tokens: WordToken[] = [];
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldContent = part.slice(2, -2);
      const words = boldContent.split(/(\s+|—)/).filter((s) => s && !/^\s+$/.test(s));
      for (const w of words) {
        tokens.push({
          word: w,
          isBold: true,
          isEmDash: w === "—",
        });
      }
    } else {
      const words = part.split(/(\s+|—)/).filter((s) => s && !/^\s+$/.test(s));
      for (const w of words) {
        tokens.push({
          word: w,
          isBold: false,
          isEmDash: w === "—",
        });
      }
    }
  }
  return tokens;
}

export function TextReveal({
  text,
  as = "h2",
  className,
  id,
  delay = 0,
}: TextRevealProps) {
  const Tag = as;
  const lines = text.split("\n").map(parseLine);
  const count = lines.reduce((total, words) => total + words.length, 0);
  const step = Math.min(
    motionTokens.stagger.word,
    MAX_STAGGER / Math.max(count, 1)
  );
  const blur = as === "p" ? motionTokens.blur.soft : motionTokens.blur.text;
  let index = 0;

  return (
    <Tag
      id={id}
      className={[styles.reveal, className].filter(Boolean).join(" ")}
      style={{ "--reveal-blur": `${blur}px` } as CSSProperties}
    >
      <span className={styles.srOnly}>
        {text.replace(/\*\*/g, "").replace(/\n/g, " ")}
      </span>
      {lines.map((words, lineIndex) => (
        <Fragment key={lineIndex}>
          <span className={styles.line} aria-hidden="true">
            {words.map((token, wordIndex) => {
              const position = index++;
              const isEmDash = token.isEmDash || token.word === "—";
              return (
                <Fragment key={`${token.word}-${position}`}>
                  <span className={isEmDash ? styles.clipEmDash : styles.clip}>
                    <span
                      className={[
                        isEmDash ? styles.wordEmDash : styles.word,
                        token.isBold ? "font-semibold text-ink-primary" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={
                        {
                          "--reveal-delay": `${
                            delay + position * step + lineIndex * step
                          }s`,
                        } as CSSProperties
                      }
                    >
                      {isEmDash ? <EmDash /> : token.word}
                    </span>
                  </span>
                  {wordIndex < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
          {lineIndex < lines.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

export default TextReveal;
