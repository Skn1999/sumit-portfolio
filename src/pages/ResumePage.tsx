import React, { useState, useCallback, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Layout } from "@/components/Layout";
import { useMode } from "@/contexts/ModeContext";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
};

const ResumePage: React.FC = () => {
  const { mode } = useMode();
  const isEngineer = mode === "engineer";
  const pdfUrl = `${import.meta.env.BASE_URL}CV_2026.pdf`;

  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    [],
  );

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex flex-col"
      >
        {/* Top bar */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link
              to="/"
              className={`inline-flex items-center gap-2 text-sm font-medium mode-transition hover:opacity-80 ${
                isEngineer
                  ? "text-[hsl(var(--engineer-primary))]"
                  : "text-[hsl(var(--designer-primary))]"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <Button
              size="sm"
              variant="outline"
              className={`font-body ${isEngineer ? "" : "neubrutalism-button"}`}
              asChild
            >
              <a href={pdfUrl} download>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>

        {/* PDF rendered as page content */}
        <div
          ref={containerRef}
          className="flex-1 w-full max-w-5xl mx-auto px-6 py-8"
        >
          <Document
            file={pdfUrl}
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center py-32">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            }
            error={
              <div className="text-center py-32 text-muted-foreground">
                <p className="mb-4">Unable to load the resume.</p>
                <Button asChild variant="outline">
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    Open PDF directly
                  </a>
                </Button>
              </div>
            }
          >
            {Array.from({ length: numPages }, (_, index) => (
              <motion.div
                key={`page_${index + 1}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`mb-8 rounded-lg overflow-hidden shadow-md ${
                  isEngineer
                    ? "border border-border"
                    : "border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <Page
                  pageNumber={index + 1}
                  width={Math.min(containerWidth - 48, 900)}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </motion.div>
            ))}
          </Document>

          {numPages > 0 && (
            <p className="text-center text-sm text-muted-foreground mt-4 mb-8">
              {numPages} {numPages === 1 ? "page" : "pages"}
            </p>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default ResumePage;
