import React from "react";
import { motion } from "framer-motion";

const ProductHuntBadge: React.FC = () => {
  const inkFadeVariant = {
    hidden: { opacity: 0, filter: "blur(6px)", y: 20 },
    visible: (customDelay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: customDelay,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <motion.div
      custom={0.1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={inkFadeVariant}
      className="w-full max-w-[500px] mx-auto"
    >
      <div
        className="font-body-narrative border border-border rounded-xl p-5 bg-card shadow-sm"
        style={{
          fontFamily:
            '-apple-system, BlinkMacMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <img
            alt="Preflight"
            src="https://ph-files.imgix.net/c3939219-d8d7-47e7-9c60-82fe71644598.jpeg?auto=compress,format&amp;codec=mozjpeg&amp;cs=strip&amp;fit=crop&amp;h=80&amp;w=80"
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="m-0 text-lg font-semibold text-ink-primary leading-tight truncate">
              Preflight
            </h3>
            <p className="m-0 mt-1 text-sm text-ink-muted leading-snug overflow-hidden text-ellipsis line-clamp-2">
              A preflight checklist for product decisions.
            </p>
          </div>
        </div>
        <a
          href="https://www.producthunt.com/products/preflight-7?embed=true&amp;utm_source=embed&amp;utm_medium=post_embed"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 px-4 py-2 bg-[#FF6154] text-white no-underline rounded-lg text-sm font-semibold transition-colors hover:bg-[#e0554a]"
        >
          Check it out on Product Hunt →
        </a>
      </div>
    </motion.div>
  );
};

export default ProductHuntBadge;
