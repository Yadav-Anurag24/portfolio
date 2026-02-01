import { motion } from 'framer-motion';

const AboutMeContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      {/* File header */}
      <div className="leading-7">
        <span className="syntax-comment">{`// src/AboutMe.ts`}</span>
      </div>
      <div className="leading-7">
        <span className="syntax-comment">{`// Personal profile and career information`}</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Interface definition */}
      <div className="leading-7">
        <span className="syntax-keyword">interface</span>
        <span className="syntax-property"> Developer</span>
        <span className="text-foreground"> {'{'}</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">name</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">role</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">status</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">interests</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">[];</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">education</span>
        <span className="text-foreground">: </span>
        <span className="syntax-property">Education</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">goals</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">[];</span>
      </div>
      <div className="leading-7">
        <span className="text-foreground">{'}'}</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Education interface */}
      <div className="leading-7">
        <span className="syntax-keyword">interface</span>
        <span className="syntax-property"> Education</span>
        <span className="text-foreground"> {'{'}</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">degree</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">status</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">upcomingCourse</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">startDate</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">Date</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7">
        <span className="text-foreground">{'}'}</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Const declaration */}
      <div className="leading-7">
        <span className="syntax-keyword">const</span>
        <span className="syntax-variable"> aboutMe</span>
        <span className="text-foreground">: </span>
        <span className="syntax-property">Developer</span>
        <span className="text-foreground"> = {'{'}</span>
      </div>

      {/* Name */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">name</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"Aspiring Backend Developer"</span>
        <span className="text-muted-foreground">,</span>
      </div>

      {/* Role */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">role</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"Full Stack Developer (Backend Focus)"</span>
        <span className="text-muted-foreground">,</span>
      </div>

      {/* Status */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">status</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"Final Year Student | Open to Opportunities"</span>
        <span className="text-muted-foreground">,</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Interests */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">interests</span>
        <span className="text-foreground">: [</span>
      </div>
      {['Backend Development', 'Cloud Architecture', 'System Design', 'DevOps', 'API Development'].map((interest, i) => (
        <div key={interest} className="leading-7 ml-8">
          <span className="syntax-string">"{interest}"</span>
          {i < 4 && <span className="text-muted-foreground">,</span>}
        </div>
      ))}
      <div className="leading-7 ml-4">
        <span className="text-foreground">]</span>
        <span className="text-muted-foreground">,</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Education */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">education</span>
        <span className="text-foreground">: {'{'}</span>
      </div>
      <div className="leading-7 ml-8">
        <span className="syntax-property">degree</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"Bachelor's in Computer Science"</span>
        <span className="text-muted-foreground">,</span>
      </div>
      <div className="leading-7 ml-8">
        <span className="syntax-property">status</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"Final Year"</span>
        <span className="text-muted-foreground">,</span>
      </div>
      <div className="leading-7 ml-8">
        <span className="syntax-property">upcomingCourse</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"Cloud Computing Specialization"</span>
        <span className="text-muted-foreground">,</span>
      </div>
      <div className="leading-7 ml-8">
        <span className="syntax-property">startDate</span>
        <span className="text-foreground">: </span>
        <span className="syntax-keyword">new</span>
        <span className="syntax-function"> Date</span>
        <span className="text-foreground">(</span>
        <span className="syntax-string">"2026-01-01"</span>
        <span className="text-foreground">)</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="text-foreground">{'}'}</span>
        <span className="text-muted-foreground">,</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Goals */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">goals</span>
        <span className="text-foreground">: [</span>
      </div>
      {[
        'Obtain AWS Solutions Architect certification',
        'Build scalable microservices architecture',
        'Contribute to open source projects',
        'Land a backend developer role',
      ].map((goal, i) => (
        <div key={goal} className="leading-7 ml-8">
          <span className="syntax-string">"{goal}"</span>
          {i < 3 && <span className="text-muted-foreground">,</span>}
        </div>
      ))}
      <div className="leading-7 ml-4">
        <span className="text-foreground">]</span>
      </div>

      {/* Closing brace */}
      <div className="leading-7">
        <span className="text-foreground">{'}'};</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Export */}
      <div className="leading-7">
        <span className="syntax-keyword">export default</span>
        <span className="syntax-variable"> aboutMe</span>
        <span className="text-foreground">;</span>
      </div>

      {/* Padding for scrolling */}
      <div className="h-20">&nbsp;</div>
    </motion.div>
  );
};

export default AboutMeContent;
