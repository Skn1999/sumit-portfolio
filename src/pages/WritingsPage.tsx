import React from "react";
import { Layout } from "@/components/Layout";
import SEO from "@/components/SEO";
import { UnsaidMoments } from "@/components/Contact";

export const PublicationPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="Publications | Sumit Nayyar"
        description="Publications and articles by Sumit Nayyar exploring complex UX and human-computer interactions."
        path="/writings/publication"
      />
      <div className="pt-28 pb-16">
        <UnsaidMoments />
      </div>
    </Layout>
  );
};

export const ResearchPage: React.FC = () => {
  return (
    <Layout>
      <SEO
        title="HCI Research | Sumit Nayyar"
        description="HCI research methodologies, cognitive ergonomics, and academic publications by Sumit Nayyar."
        path="/writings/research"
      />
      <div className="pt-28 pb-16 min-h-[60vh] bg-paper-bg flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-3">
            // RESEARCH
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter mb-4">
            HCI &amp; Systems Research
          </h1>
          <p className="font-body-narrative text-base md:text-lg text-ink-muted max-w-xl mx-auto">
            Academic research papers and usability engineering studies conducted at Aalto University (Finland) and University of Trento (Italy).
          </p>
        </div>
      </div>
    </Layout>
  );
};
