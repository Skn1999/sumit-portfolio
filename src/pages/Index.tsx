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
        title="Sumit Knayyar | AI-Era Product Designer & UX Architect (HCI + Frontend)"
        rawTitle
        description="Product Designer & UX Architect bridging HCI research and enterprise frontend execution. I oversee AI-assisted design and dev pipelines to deliver high-velocity products with uncompromised human quality and zero costly failures."
        path="/"
        keywords={[
          "portfolio",
          "product designer",
          "AI product designer",
          "human in the loop AI",
          "UX architect",
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
