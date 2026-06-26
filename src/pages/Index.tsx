import { Layout, Container } from "@/components/Layout";
import Projects from "@/components/Projects";
import Contact, { UnsaidMoments, Footer } from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import {
  AcademicCohorts,
  ProfessionalCredentials,
  LogisticsCleardown,
} from "@/components/SecondaryModules";
import ScrollProgress from "@/components/ScrollProgress";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const IndexContent = () => {
  return (
    <Layout>
      <SEO
        title="Sumit Knayyar Product Designer & UX Strategist"
        rawTitle
        description="Product Designer & UX Strategist with 4+ years of experience designing digital products that solve real problems. Research-driven, systems-thinking, and design-focused."
        path="/"
        keywords={[
          "portfolio",
          "product designer",
          "UX designer",
          "UX strategist",
          "design systems",
          "HCI",
          "React",
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
          <Container className="overflow-x-visible">
            <HeroSection />
          </Container>

          {/* main sections */}
          <Container>
            <Projects />
          </Container>

          <Container>
            <AcademicCohorts />
          </Container>

          <ProfessionalCredentials />

          <Container>
            <Contact />
          </Container>

          <Container>
            <UnsaidMoments />
          </Container>

          {/* <LogisticsCleardown /> */}

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
