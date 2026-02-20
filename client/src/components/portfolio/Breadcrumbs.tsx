import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  filePath: string;
}

const getFilePath = (fileName: string): string[] => {
  switch (fileName) {
    case 'README.md':
      return ['PORTFOLIO-MASTER', 'README.md'];
    case 'AboutMe.ts':
      return ['PORTFOLIO-MASTER', 'src', 'AboutMe.ts'];
    case 'skills.json':
      return ['PORTFOLIO-MASTER', 'src', 'skills.json'];
    case 'Projects.jsx':
      return ['PORTFOLIO-MASTER', 'src', 'components', 'Projects.jsx'];
    case 'ContactForm.tsx':
      return ['PORTFOLIO-MASTER', 'src', 'components', 'ContactForm.tsx'];
    case 'resume.pdf':
      return ['PORTFOLIO-MASTER', 'resume.pdf'];
    default:
      return ['PORTFOLIO-MASTER', fileName];
  }
};

const Breadcrumbs = ({ filePath }: BreadcrumbsProps) => {
  const parts = getFilePath(filePath);

  return (
    <nav className="h-6 px-3 flex items-center gap-1 text-xs text-muted-foreground bg-card border-b border-border overflow-x-auto" aria-label="Breadcrumb">
      {parts.map((part, index) => (
        <span key={index} className="flex items-center gap-1 whitespace-nowrap">
          <span className="hover:text-foreground cursor-pointer transition-colors" aria-current={index === parts.length - 1 ? 'page' : undefined}>
            {part}
          </span>
          {index < parts.length - 1 && (
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
