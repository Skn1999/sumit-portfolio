## Problem

In both UX Bite MDX files, each "Finding 0X" block currently looks like:

```mdx
<p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Finding 01</p>

<h2 className="text-3xl md:text-5xl font-semibold leading-tight">
  <Reveal>Rich data, flat presentation</Reveal>
</h2>
```

MDX treats the blank line + the newlines inside the `<h2>` tag as significant whitespace. Because `<Reveal>` renders an inline `<span>`, MDX promotes the surrounding whitespace into an extra paragraph/inline wrapper, so the rendered DOM ends up with a stray `<span>` (and inherited block margins) right before the real `<h2>`. That's the "weird spacing" you're seeing.

`BiteSection` itself is fine — it's purely the MDX whitespace-handling around inline children of block JSX.

## Fix

Introduce a small dedicated component so MDX never has to parse mixed block/inline JSX with blank lines.

### 1. New component: `src/components/uxBites/FindingHeader.tsx`

A single component that renders the eyebrow + animated heading in one shot:

```tsx
interface Props {
  eyebrow: string;          // e.g. "Finding 01"
  title: string;            // e.g. "Rich data, flat presentation"
  tone?: "primary" | "muted"; // default "primary"
  as?: "h2" | "h3";         // default "h2"
}
```

Internally it renders:

```tsx
<header className="mb-4">
  <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">{eyebrow}</p>
  <Tag className="text-3xl md:text-5xl font-semibold leading-tight">
    <Reveal>{title}</Reveal>
  </Tag>
</header>
```

This keeps the existing visual design and the word-stagger Reveal animation, but emits a single, tightly-controlled DOM subtree with no MDX whitespace ambiguity.

### 2. Update both MDX files

In `src/content/ux-bites/joy-buying-flow/index.mdx` and `src/content/ux-bites/urakkamaailma-pricing-gap/index.mdx`:

- Add `import FindingHeader from "@/components/uxBites/FindingHeader";`
- Replace every:
  ```mdx
  <p className="...">Finding 0X</p>

  <h2 ...>
    <Reveal>Title</Reveal>
  </h2>
  ```
  with:
  ```mdx
  <FindingHeader eyebrow="Finding 01" title="Rich data, flat presentation" />
  ```
- Do the same for the "Approach" section, passing `tone="muted"` and `as="h3"` so the existing `### How I got here` styling is preserved (the eyebrow becomes the muted "Approach" line; the h3 keeps the same look as today).

### 3. No changes to `BiteSection` or `Reveal`

`BiteSection`'s animation stays exactly as is, and `Reveal` is unchanged. The fix is purely about how MDX parses the section header markup.

## Verification

- Open `/ux-bites/joy-buying-flow` and `/ux-bites/urakkamaailma-pricing-gap`.
- Inspect the DOM between the Finding eyebrow and h2 — there should be no stray `<span>` or empty `<p>` between them.
- Confirm vertical spacing now reads as a single tight header block.
- Confirm the word-stagger Reveal animation still fires on each heading.
