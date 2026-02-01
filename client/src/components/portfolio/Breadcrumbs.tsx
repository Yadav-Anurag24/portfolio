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
    default:
      return ['PORTFOLIO-MASTER', fileName];
  }
};

const Breadcrumbs = ({ filePath }: BreadcrumbsProps) => {
  const parts = getFilePath(filePath);

  return (
    <div className="h-6 px-3 flex items-center gap-1 text-xs text-muted-foreground bg-card border-b border-border overflow-x-auto">
      {parts.map((part, index) => (
        <span key={index} className="flex items-center gap-1 whitespace-nowrap">
          <span className="hover:text-foreground cursor-pointer transition-colors">
            {part}
          </span>
          {index < parts.length - 1 && (
            <ChevronRight className="w-3 h-3" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
