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
        <span className="syntax-property">university</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">cgpa</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
        <span className="text-foreground">;</span>
      </div>
      <div className="leading-7 ml-4">
        <span className="syntax-property">achievements</span>
        <span className="text-foreground">: </span>
        <span className="syntax-variable">string</span>
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
        <span className="syntax-string">"Anurag Kumar"</span>
        <span className="text-muted-foreground">,</span>
      </div>

      {/* Role */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">role</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"Full Stack Developer"</span>
        <span className="text-muted-foreground">,</span>
      </div>

      {/* Status */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">status</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"BCA Student at LPU | Open to Opportunities"</span>
        <span className="text-muted-foreground">,</span>
      </div>

      <div className="leading-7">&nbsp;</div>

      {/* Interests */}
      <div className="leading-7 ml-4">
        <span className="syntax-property">interests</span>
        <span className="text-foreground">: [</span>
      </div>
      {['Full Stack Development', 'Cloud & AWS Deployment', 'Problem-Solving', 'Responsive Web Design', 'API Development', 'Competitive Programming'].map((interest, i) => (
        <div key={interest} className="leading-7 ml-8">
          <span className="syntax-string">"{interest}"</span>
          {i < 5 && <span className="text-muted-foreground">,</span>}
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
        <span className="syntax-string">"Bachelor of Computer Applications (BCA)"</span>
        <span className="text-muted-foreground">,</span>
      </div>
      <div className="leading-7 ml-8">
        <span className="syntax-property">university</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"Lovely Professional University"</span>
        <span className="text-muted-foreground">,</span>
      </div>
      <div className="leading-7 ml-8">
        <span className="syntax-property">cgpa</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"8.2"</span>
        <span className="text-muted-foreground">,</span>
      </div>
      <div className="leading-7 ml-8">
        <span className="syntax-property">achievements</span>
        <span className="text-foreground">: </span>
        <span className="syntax-string">"4-Star HackerRank (C++) | 100+ LeetCode Problems"</span>
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
        'Build production-grade full stack applications',
        'Master cloud deployment with AWS',
        'Contribute to open source projects',
        'Secure a full stack developer role',
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
