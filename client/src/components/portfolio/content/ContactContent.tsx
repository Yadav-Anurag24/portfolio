import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTerminal } from '@/contexts/TerminalContext';
import { Send, Loader2 } from 'lucide-react';

const ContactContent = () => {
  const { addLog } = useTerminal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 1. Log to the visual terminal
    addLog('info', `> Sending message package from ${formData.email}...`);

    try {
      // 2. The Real API Call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Success Handling
        addLog('success', `> POST /api/contact - 200 OK`);
        addLog('output', `> Server Response: "${data.message}"`);
        
        // Clear the form
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // 4. Server Error Handling (e.g. missing fields)
        addLog('error', `> Server Error (400): ${data.message}`);
      }
    } catch (error) {
      // 5. Network Error Handling
      addLog('error', `> Network Error: Failed to reach localhost:5000`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      {/* File header */}
      <div className="leading-7">
        <span className="syntax-comment">{`// src/components/ContactForm.tsx`}</span>
      </div>
      <div className="leading-7">
        <span className="syntax-comment">{`// Type-safe contact form with validation`}</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Import statements */}
      <div className="leading-7">
        <span className="syntax-keyword">import</span>
        <span className="text-foreground"> {'{ '}</span>
        <span className="syntax-variable">useState</span>
        <span className="text-foreground">{' }'} </span>
        <span className="syntax-keyword">from</span>
        <span className="syntax-string"> 'react'</span>
        <span className="text-foreground">;</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Interface */}
      <div className="leading-7">
        <span className="syntax-keyword">interface</span>
        <span className="syntax-property"> ContactFormData</span>
        <span className="text-foreground"> {'{'}</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">name</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">email</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">subject</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">message</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7">
        <span className="text-foreground">{'}'}</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Actual Form */}
      <div className="leading-7">
        <span className="syntax-comment">{`// Rendered Form Component`}</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="block text-sm">
            <span className="syntax-property">name</span>
            <span className="text-foreground">: </span>
            <span className="syntax-variable">string</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-muted/50 border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
            placeholder='"Your Name"'
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">
            <span className="syntax-property">email</span>
            <span className="text-foreground">: </span>
            <span className="syntax-variable">string</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-muted/50 border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
            placeholder='"your@email.com"'
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">
            <span className="syntax-property">subject</span>
            <span className="text-foreground">: </span>
            <span className="syntax-variable">string</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-muted/50 border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
            placeholder='"Project Inquiry"'
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">
            <span className="syntax-property">message</span>
            <span className="text-foreground">: </span>
            <span className="syntax-variable">string</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-muted/50 border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm resize-none"
            placeholder='"Your message here..."'
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>await sendMessage()</span>
            </>
          )}
        </button>
      </form>

      <div className="leading-7">&nbsp;</div>

      {/* Contact Info */}
      <div className="leading-7">
        <span className="syntax-comment">{`// Alternative Contact Methods`}</span>
      </div>

      <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border space-y-2">
        <div className="text-sm">
          <span className="syntax-property">EMAIL</span>
          <span className="text-foreground">=</span>
          <a href="mailto:anuragkumarmsd456@gmail.com" className="syntax-string hover:underline">"anuragkumarmsd456@gmail.com"</a>
        </div>
        <div className="text-sm">
          <span className="syntax-property">GITHUB</span>
          <span className="text-foreground">=</span>
          <a href="https://github.com/Yadav-Anurag24" target="_blank" rel="noopener noreferrer" className="syntax-string hover:underline">"https://github.com/Yadav-Anurag24"</a>
        </div>
        <div className="text-sm">
          <span className="syntax-property">LINKEDIN</span>
          <span className="text-foreground">=</span>
          <a href="https://www.linkedin.com/in/anurag24kumar" target="_blank" rel="noopener noreferrer" className="syntax-string hover:underline">"https://linkedin.com/in/anurag24kumar"</a>
        </div>
        <div className="text-sm">
          <span className="syntax-property">LOCATION</span>
          <span className="text-foreground">=</span>
          <span className="syntax-string">"India 🇮🇳"</span>
        </div>
      </div>

      {/* Padding for scrolling */}
      <div className="h-20">&nbsp;</div>
    </motion.div>
  );
};

export default ContactContent;