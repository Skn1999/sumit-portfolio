import KeycapContact from "./KeycapContact";
import { STACK } from "../data/home";
import { EMAIL, GITHUB, LINKEDIN, RESUME_URL } from "../lib";

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" /><path d="M2 4l6 5 6-5" />
  </svg>
);
function ContactLinks() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      <span style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
        <a href={`mailto:${EMAIL}`} style={{ display: "inline-flex", gap: 8, alignItems: "center", textDecoration: "none" }}><MailIcon />Send me an email</a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Read my CV <span style={{ color: "#8B949E" }}>↗</span></a>
      </span>
      <span style={{ display: "flex", gap: 20, fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <span style={{ color: "#8B949E" }}>© {new Date().getFullYear()}</span>
      </span>
    </div>
  );
}

/** The dark contact band that closes every v2 page: pitch, HELLO keycaps, stack and contact rows. */
export default function SiteFooter({ label = "Open to work" }: { label?: string }) {
  return (
    <footer id="contact" className="v2-band" aria-label="Contact">
      <div className="v2-wrap">
        <div className="v2-section" style={{ paddingTop: 72, paddingBottom: 40 }}>
          <div className="v2-label-col">
            <span className="v2-mono">{label} · From [MONTH 2026]</span>
            <h2 className="v2-h2">Next: your team?</h2>
          </div>
          <div className="v2-main-col" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <p style={{ fontSize: "clamp(19px, 2.4vw, 24px)", lineHeight: 1.4, letterSpacing: "-0.01em", maxWidth: 760 }}>
              A product team where designers ship code, curiosity is a feature, and craft matters. Helsinki or remote, anywhere in the world.
            </p>
            <KeycapContact />
            <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingTop: 12 }}>
              <div className="v2-sc-row">
                <span className="v2-sc-l">Stack</span>
                <ul aria-label="Tools I use" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {STACK.map((s) => <li key={s} className="v2-chipd">{s}</li>)}
                </ul>
              </div>
              <div className="v2-sc-row">
                <span className="v2-sc-l">Contact</span>
                <ContactLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

