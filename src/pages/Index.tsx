import { Layout, Container } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import Contact, { UnsaidMoments, Footer } from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import ProductHuntBadge from "@/components/ProductHuntBadge";

const IndexContent = () => {
  return (
    <Layout>
      <SEO
        title="Sumit Nayyar | Product Designer & Design Engineer"
        rawTitle
        description="Helsinki-based Product Designer and Behavioral Science Researcher, bridging HCI research and enterprise B2B SaaS execution."
        path="/"
        keywords={[
          "portfolio",
          "product designer",
          "design engineer",
          "UX architect",
          "UX Researcher",
          "React",
          "front-end engineer",
        ]}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <ScrollProgress />
        <div className="relative z-10 scroll-blur-content">
          {/* Section 1: Hero Section */}
          <HeroSection />

          {/* Section 2: About & AI Philosophy */}
          <AboutSection />

          {/* Section 3: Achievements */}
          <AchievementsSection />

          {/* Section 4: Product Hunt Launch */}
          <section id="product-hunt-launch" className="py-20 md:py-32 bg-paper-bg border-t border-paper-border">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0, filter: "blur(6px)", y: 16 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16 md:mb-20 text-center"
              >
                <span className="font-mono text-xs tracking-widest text-ink-muted uppercase block mb-2">
                  // LAUNCHES
                </span>
                <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-primary tracking-tighter">
                  Recent Launches
                </h2>
                <p className="font-body-narrative text-base md:text-lg text-ink-muted mt-3 max-w-2xl mx-auto">
                  Showcasing recent product launches and achievements.
                </p>
              </motion.div>
              <ProductHuntBadge />
            </div>
          </section>

          {/* Section 5: Contact */}
          <Contact />

          {/* <UnsaidMoments /> */}

          <Footer />
        </div>
      </motion.div>
    </Layout>
  );
};

const Index = () => {
  return <IndexContent />;
};

export default Index;
