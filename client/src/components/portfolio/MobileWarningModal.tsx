import { useState, useEffect } from 'react';
import { Monitor, Smartphone, X, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MobileWarningModal = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isMobile) {
      // Check if user has already dismissed this session
      const dismissed = sessionStorage.getItem('mobile-warning-dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [isMobile]);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      sessionStorage.setItem('mobile-warning-dismissed', 'true');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative w-full max-w-sm transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* VS Code-style title bar */}
        <div className="flex items-center justify-between px-4 py-2 rounded-t-lg bg-[hsl(220,13%,18%)] border border-b-0 border-[hsl(220,13%,22%)]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 text-xs font-mono text-[hsl(220,9%,46%)]">
              viewport-warning.md
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded hover:bg-[hsl(220,13%,22%)] transition-colors"
            aria-label="Close warning"
          >
            <X className="w-3.5 h-3.5 text-[hsl(220,9%,46%)] hover:text-[hsl(220,14%,71%)]" />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-5 py-6 rounded-b-lg bg-[hsl(220,13%,14%)] border border-t-0 border-[hsl(220,13%,22%)] shadow-2xl">
          {/* Icon section */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-[hsl(220,13%,18%)] border border-[hsl(220,13%,22%)]">
                  <Smartphone className="w-7 h-7 text-[hsl(355,65%,65%)]" />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xs text-[hsl(220,9%,46%)]">→</span>
                  <span className="text-xs text-[hsl(220,9%,46%)]">→</span>
                </div>
                <div className="p-3 rounded-lg bg-[hsl(220,13%,18%)] border border-[hsl(207,90%,54%)]/30 shadow-[0_0_12px_hsl(207,90%,54%,0.15)]">
                  <Monitor className="w-7 h-7 text-[hsl(207,90%,54%)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Code-style message */}
          <div className="mb-5 p-3 rounded bg-[hsl(220,13%,12%)] border border-[hsl(220,13%,22%)] font-mono text-sm leading-relaxed">
            <div className="flex gap-2 mb-1">
              <span className="text-[hsl(220,9%,35%)] select-none">1</span>
              <span>
                <span className="syntax-comment">{'// ⚠️ Viewport Notice'}</span>
              </span>
            </div>
            <div className="flex gap-2 mb-1">
              <span className="text-[hsl(220,9%,35%)] select-none">2</span>
              <span>
                <span className="syntax-keyword">const</span>{' '}
                <span className="syntax-variable">experience</span>{' '}
                <span className="text-[hsl(220,14%,71%)]">=</span>{' '}
                <span className="syntax-string">"best"</span>
                <span className="text-[hsl(220,14%,71%)]">;</span>
              </span>
            </div>
            <div className="flex gap-2 mb-1">
              <span className="text-[hsl(220,9%,35%)] select-none">3</span>
              <span>
                <span className="syntax-keyword">const</span>{' '}
                <span className="syntax-variable">device</span>{' '}
                <span className="text-[hsl(220,14%,71%)]">=</span>{' '}
                <span className="syntax-string">"desktop"</span>
                <span className="text-[hsl(220,14%,71%)]">;</span>
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-[hsl(220,9%,35%)] select-none">4</span>
              <span>
                <span className="syntax-comment">{'// Switch to desktop 💻'}</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-sm text-[hsl(220,14%,71%)] mb-1 leading-relaxed">
            This portfolio is built on a{' '}
            <span className="font-semibold text-[hsl(207,90%,54%)]">VS Code</span> theme
            and is optimized for{' '}
            <span className="font-semibold text-[hsl(95,38%,62%)]">desktop viewing</span>.
          </p>
          <p className="text-center text-xs text-[hsl(220,9%,46%)] mb-5">
            For the full interactive experience, please open on a larger screen.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleDismiss}
              className="w-full py-2.5 px-4 rounded text-sm font-medium text-white 
                         bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,48%)] 
                         transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Continue Anyway
            </button>
            <button
              onClick={handleDismiss}
              className="w-full py-2 px-4 rounded text-xs font-mono
                         text-[hsl(220,9%,46%)] hover:text-[hsl(220,14%,71%)]
                         bg-transparent hover:bg-[hsl(220,13%,18%)] border border-[hsl(220,13%,22%)] 
                         transition-colors duration-200"
            >
              dismiss()
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWarningModal;
