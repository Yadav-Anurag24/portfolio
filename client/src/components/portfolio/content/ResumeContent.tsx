import { motion } from 'framer-motion';
import {
  Download,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Globe,
} from 'lucide-react';

/* ================================================================
   RESUME PREVIEW — VS Code–style PDF preview tab
   ================================================================
   Renders an interactive "resume" as a styled document mimicking
   a PDF preview pane, with a download button for the real PDF.
   ================================================================ */

const RESUME_PDF_URL = '/Anurag_Kumar_Resume.pdf';

const ResumeContent = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_PDF_URL;
    link.download = 'Anurag_Kumar_Resume.pdf';
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 mb-4 rounded-md border border-border"
        style={{ background: 'color-mix(in srgb, var(--muted) 60%, var(--card))' }}
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">resume.pdf</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary">Preview</span>
        </div>
        <div className="flex items-center gap-1.5">
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="Open in new tab"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">Open</span>
          </a>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded text-primary-foreground transition-colors"
            style={{ background: 'var(--primary)' }}
            title="Download PDF"
          >
            <Download className="w-3 h-3" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Resume Document */}
      <div
        className="rounded-md border border-border overflow-hidden shadow-lg"
        style={{ background: 'color-mix(in srgb, var(--card) 95%, white 5%)' }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 border-b border-border"
          style={{ background: 'color-mix(in srgb, var(--primary) 8%, var(--card))' }}
        >
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Anurag Kumar</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--primary)' }}>
            Backend Developer | Full Stack Engineer
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              anuragkumar@email.com
            </span>
            <a
              href="https://github.com/Yadav-Anurag24"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github className="w-3 h-3" />
              Yadav-Anurag24
            </a>
            <a
              href="https://www.linkedin.com/in/anurag24kumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Linkedin className="w-3 h-3" />
              anurag24kumar
            </a>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              India
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">

          {/* Summary */}
          <Section icon={<Globe className="w-3.5 h-3.5" />} title="Summary">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Aspiring Backend Developer and Final Year CS student with hands-on experience building
              scalable REST APIs, mobile applications, and full-stack systems. Passionate about
              cloud architecture, system design, and DevOps. Pursuing AWS Solutions Architect
              certification.
            </p>
          </Section>

          {/* Skills */}
          <Section icon={<Code2 className="w-3.5 h-3.5" />} title="Technical Skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <SkillGroup label="Languages" skills={['TypeScript', 'JavaScript', 'Python', 'Java']} />
              <SkillGroup label="Frontend" skills={['React', 'React Native', 'Angular', 'Ionic']} />
              <SkillGroup label="Backend" skills={['Node.js', 'Express', 'NestJS']} />
              <SkillGroup label="Databases" skills={['MongoDB', 'PostgreSQL', 'Redis']} />
              <SkillGroup label="DevOps" skills={['Docker', 'Kubernetes', 'AWS', 'Git']} />
              <SkillGroup label="Tools" skills={['VS Code', 'Postman', 'GitHub Actions']} />
            </div>
          </Section>

          {/* Experience / Projects */}
          <Section icon={<Briefcase className="w-3.5 h-3.5" />} title="Projects">
            <div className="space-y-3">
              <ProjectEntry
                name="Smart Parking Finder"
                tech="React, Node.js, Express, MongoDB"
                bullets={[
                  'Built a full-stack parking discovery app with real-time availability',
                  'Designed RESTful API with Express and MongoDB Atlas',
                  'Implemented geolocation-based search and filtering',
                ]}
              />
              <ProjectEntry
                name="HPCL Dealer Management App"
                tech="React Native, Ionic, Angular, Node.js"
                bullets={[
                  'Developed cross-platform mobile app for HPCL dealer operations',
                  'Built secure authentication with JWT and role-based access',
                  'Integrated native device APIs via Capacitor plugins',
                ]}
              />
              <ProjectEntry
                name="Bookstore Auth System"
                tech="Node.js, Express, MongoDB, JWT"
                bullets={[
                  'Implemented complete authentication system with JWT tokens',
                  'Designed REST API with CRUD operations and input validation',
                  'Added rate limiting, CORS, and security best practices',
                ]}
              />
            </div>
          </Section>

          {/* Education */}
          <Section icon={<GraduationCap className="w-3.5 h-3.5" />} title="Education">
            <div className="text-xs space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="font-medium text-foreground">Bachelor's in Computer Science</span>
                <span className="text-muted-foreground text-[10px]">Final Year</span>
              </div>
              <p className="text-muted-foreground">
                Cloud Computing Specialization (Started Jan 2026)
              </p>
            </div>
          </Section>

          {/* Certifications */}
          <Section icon={<Award className="w-3.5 h-3.5" />} title="Certifications & Learning">
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--syntax-string)' }} />
                AWS Solutions Architect Associate — <span className="italic">in progress</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--syntax-string)' }} />
                System Design — ongoing self-study (DDIA, System Design Primer)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--syntax-string)' }} />
                Cloud Computing Specialization — started January 2026
              </li>
            </ul>
          </Section>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-3 border-t border-border text-center text-[10px] text-muted-foreground"
          style={{ background: 'color-mix(in srgb, var(--muted) 30%, var(--card))' }}
        >
          Generated from portfolio • Last updated February 2026 • Download for full PDF version
        </div>
      </div>

      {/* Padding for scrolling */}
      <div className="h-20" />
    </motion.div>
  );
};

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-border">
      <span style={{ color: 'var(--primary)' }}>{icon}</span>
      <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const SkillGroup = ({ label, skills }: { label: string; skills: string[] }) => (
  <div>
    <span className="font-medium text-foreground">{label}: </span>
    <span className="text-muted-foreground">{skills.join(', ')}</span>
  </div>
);

const ProjectEntry = ({
  name,
  tech,
  bullets,
}: {
  name: string;
  tech: string;
  bullets: string[];
}) => (
  <div>
    <div className="flex items-baseline justify-between">
      <span className="text-xs font-medium text-foreground">{name}</span>
    </div>
    <div className="text-[10px] text-muted-foreground mb-1">{tech}</div>
    <ul className="text-xs text-muted-foreground space-y-0.5 ml-3">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-1.5">
          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-muted-foreground" />
          {b}
        </li>
      ))}
    </ul>
  </div>
);

export default ResumeContent;
