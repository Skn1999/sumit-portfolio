import { Fragment, type CSSProperties } from "react";
import { motionTokens } from "../motion-tokens";
import styles from "./text-reveal.module.css";
import { EmDash } from "@/components/EmDash";
import {
  OptmyzrEntity,
  DedanextEntity,
  GroundworkEntity,
  EITJumpstarterEntity,
  AaltoEntity,
  TrentoEntity,
  JourneyEntity,
  SuscoEntity,
  SuperEgoEntity,
  SubstackEntity,
  TrilemmaEntity,
  CraftEntity,
} from "@/components/storyline/StorylineEntities";

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
  isBold?: boolean;
  isEmDash?: boolean;
  entityKey?: string;
  entityLabel?: string;
}

function parseLine(line: string): WordToken[] {
  const tokens: WordToken[] = [];
  // Split by [[entityKey:Label]] first
  const entityParts = line.split(/(\[\[[a-zA-Z0-9_-]+:[^\]]+\]\])/g);
  for (const part of entityParts) {
    if (!part) continue;
    const entityMatch = part.match(/^\[\[([a-zA-Z0-9_-]+):([^\]]+)\]\]$/);
    if (entityMatch) {
      const [, entityKey, entityLabel] = entityMatch;
      tokens.push({
        word: entityLabel,
        entityKey,
        entityLabel,
      });
      continue;
    }

    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    for (const bPart of boldParts) {
      if (!bPart) continue;
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        const boldContent = bPart.slice(2, -2);
        const words = boldContent.split(/(\s+|—)/).filter((s) => s && !/^\s+$/.test(s));
        for (const w of words) {
          tokens.push({
            word: w,
            isBold: true,
            isEmDash: w === "—",
          });
        }
      } else {
        const words = bPart.split(/(\s+|—)/).filter((s) => s && !/^\s+$/.test(s));
        for (const w of words) {
          tokens.push({
            word: w,
            isBold: false,
            isEmDash: w === "—",
          });
        }
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

  const renderToken = (token: WordToken) => {
    if (token.isEmDash || token.word === "—") {
      return <EmDash />;
    }
    if (token.entityKey) {
      switch (token.entityKey) {
        case "optmyzr":
          return <OptmyzrEntity>{token.entityLabel}</OptmyzrEntity>;
        case "dedanext":
          return <DedanextEntity>{token.entityLabel}</DedanextEntity>;
        case "groundwork":
          return <GroundworkEntity>{token.entityLabel}</GroundworkEntity>;
        case "eit-jumpstarter":
          return <EITJumpstarterEntity>{token.entityLabel}</EITJumpstarterEntity>;
        case "aalto":
          return <AaltoEntity>{token.entityLabel}</AaltoEntity>;
        case "unitn":
          return <TrentoEntity>{token.entityLabel}</TrentoEntity>;
        case "journey":
          return <JourneyEntity>{token.entityLabel}</JourneyEntity>;
        case "susco":
          return <SuscoEntity>{token.entityLabel}</SuscoEntity>;
        case "super-ego":
          return <SuperEgoEntity>{token.entityLabel}</SuperEgoEntity>;
        case "substack":
          return <SubstackEntity>{token.entityLabel}</SubstackEntity>;
        case "trilemma":
          return <TrilemmaEntity>{token.entityLabel}</TrilemmaEntity>;
        case "craft":
          return <CraftEntity>{token.entityLabel}</CraftEntity>;
        default:
          return token.word;
      }
    }
    return token.word;
  };

  return (
    <Tag
      id={id}
      className={[styles.reveal, className].filter(Boolean).join(" ")}
      style={{ "--reveal-blur": `${blur}px` } as CSSProperties}
    >
      <span className={styles.srOnly}>
        {text
          .replace(/\[\[[^:]+:([^\]]+)\]\]/g, "$1")
          .replace(/\*\*/g, "")
          .replace(/\n/g, " ")}
      </span>
      {lines.map((words, lineIndex) => (
        <Fragment key={lineIndex}>
          <span className={styles.line} aria-hidden="true">
            {words.map((token, wordIndex) => {
              const position = index++;
              const isSpecial =
                token.isEmDash || token.word === "—" || Boolean(token.entityKey);

              return (
                <Fragment key={`${token.word}-${position}`}>
                  <span className={isSpecial ? styles.clipEmDash : styles.clip}>
                    <span
                      className={[
                        isSpecial ? styles.wordEmDash : styles.word,
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
                      {renderToken(token)}
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
