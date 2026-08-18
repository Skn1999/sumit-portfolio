### 2026-07-30 - tasks/task_add_product_hunt_badge.md

- Lessons learned: When integrating external HTML embeds, it's crucial to convert inline styles to Tailwind CSS classes and use existing design tokens (`bg-card`, `border-border`, `text-ink-primary`, `text-ink-muted`) to maintain visual consistency with the site's design system. Ensuring responsiveness with `max-w-[500px]` and `mx-auto` for centering is also important.
- Errors or surprises: None. The provided HTML embed was straightforward to convert to JSX and style with Tailwind.
- Resolution: Created a new `ProductHuntBadge` component, converted the HTML embed to JSX, applied Tailwind CSS for styling, and integrated it into the specified pages with `motion.div` wrappers for animation consistency.
- Future instruction: For future external embeds, always prioritize converting to internal components with Tailwind styling and design tokens to ensure maintainability, responsiveness, and dark/light mode compatibility.
