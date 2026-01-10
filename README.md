# 👋 Hey there, I'm Sumit

This is my portfolio – where design meets code, and both get along surprisingly well.

## 🎭 The Dual Identity Thing

I'm one of those weird people who can't decide between Figma and VS Code, so I just... do both. This portfolio literally has a toggle that switches between my **designer mode** and **engineer mode** because why choose when you can have an identity crisis in real-time?

Hit that mode toggle and watch the whole site shift personalities.

## 🛠 What's Under the Hood

If you have already visited the website, then this should give you an overview, what this thing runs on:

- **React + TypeScript** – because any is not a type, fight me
- **Vite** – for that sweet, sweet hot reload
- **Tailwind + shadcn/ui** – utility classes all the way down
- **Framer Motion** – making things go _whoosh_ since 2018
- **MDX** – writing content with components, as one does
- **@tailwindcss/typography** – for that Medium-article aesthetic

## 📁 The Architecture

```
src/
├── content/projects/     # MDX files living their best life
├── components/           # React components (duh)
├── contexts/             # Mode switching magic happens here
├── pages/                # The big three: Index, ProjectPage, NotFound
└── lib/                  # Helper functions and project loading logic
```

**Scripting Time:** Don't manually create project folders. Use `npm run new-project` or the file structure gods will be displeased. Over-engineering I know, but it shows that I know stuff.

## 🎨 The Mode System

The whole portfolio runs on a `ModeContext` that flips between engineer/designer:

- **Engineer mode:** Monospace fonts, cyan accents, terminal vibes
- **Designer mode:** Grotesk fonts, purple gradients, creative energy

It's controlled by a `data-mode` attribute and CSS transitions. Kinda like dark mode, but for your career.

## 🖼 Images & MDX

Images in project MDX files use the `ProjectImageAsset` component:

```tsx
<ProjectImageAsset src="project-slug/image.jpg" alt="Something descriptive" />
```

Not `./image.jpg`, not `/images/...`, just `project-slug/filename`. Vite does the rest.

## 🏗 Project Structure

Each project lives in `src/content/projects/{slug}/index.mdx` with frontmatter that controls everything:

- `type: "engineering" | "design"` – which mode shows it
- `featured: true` – homepage spotlight
- `draft: true` – excluded in production
- `order: 1` – manual sorting (lower = higher)

## 🤓 Some Technical Choices

- **MDX for content** because mixing markdown and React is chef's kiss
- **Path aliases** with `@/` because `../../../components` is a crime
- **Intentionally relaxed TypeScript** – sometimes you gotta prototype fast
- **Two-column layout option** in CSS (currently set to single-column Medium style with TOC)

## 🐛 Known Quirks

- Mode transitions use `mode-transition` class for smooth CSS changes
- Table of Contents auto-extracts h2/h3 headings from articles
- The 3D floating shapes component might tank your FPS (worth it)

## 💭 Philosophy

This portfolio is designed to show, not tell. Both modes present the same projects through different lenses – because good design needs good engineering, and good engineering deserves good design.

Also, I believe READMEs should be readable, so here we are.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
