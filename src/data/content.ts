export const portfolioContent = {
  hero: {
    name: "Zsolt Apponyi",
    title: "Full Stack Engineer & AI Specialist",
    subtitle: "Building Intelligent Solutions",
    description: "Specializing in AI-driven web applications, RAG systems, and autonomous workflows. Leading teams to create production-ready AI solutions that handle high-traffic scenarios with enterprise-grade security.",
    cta: {
      primary: "View AI Projects",
      secondary: "Discuss Solutions"
    },
    highlights: [
      "CTO at Rubiklab",
      "AI & RAG Specialist",
      "High-Scale Applications"
    ]
  },
  
  about: {
    title: "About Me",
    subtitle: "Architecting intelligent systems with security-first approach",
    description: "I am a full stack engineer specializing in AI-driven web applications, with extensive hands-on experience in building intelligent agents, RAG systems, and autonomous workflows. My background spans both backend and frontend development, with a consistent focus on user-friendly, robust interfaces and data security as a primary concern.",
    skills: [
      { name: "AI & RAG Systems", level: 95, icon: "🤖" },
      { name: "Full-Stack Development", level: 110, icon: "⚙️" },
      { name: "Team Leadership", level: 88, icon: "👥" },
      { name: "Data Security", level: 100, icon: "🔒" }
    ],
    experience: [
      {
        company: "Rubiklab",
        role: "CTO",
        period: "Present",
        description: "Leading AI-powered application development with focus on RAG systems and custom agent solutions. Overseeing labIQ.io, coreclarity.io, LEXHR.ai, and hlb.global Insights AI projects."
      },
      {
        company: "DataExpert Services Ltd.",
        role: "Lead Full Stack Engineer",
        period: "Previous",
        description: "Developed scalable interfaces using Vue, Node.js and Laravel. Led code reviews and mentored team members while ensuring security and maintainability."
      },
      {
        company: "DataExpert Services Ltd.",
        role: "Innovation Specialist",
        period: "Previous",
        description: "Focused on advanced front-end applications using Vue.js, React and Node.js. Managed containerized deployments with Docker on Google Cloud & AWS platforms."
      }
    ]
  },
  
  projects: {
    title: "Latest Projects",
    subtitle: "Enterprise-scale intelligent solutions",
    featured: [
      {
        id: 1,
        title: "labIQ.io - AI Research Platform",
        description: "I led the development of this advanced AI research platform featuring showreel and recording clipping capabilities for immediate access to media evidence. Built transcription tools and classification pipelines with intuitive UX/UI, making complex AI workflows accessible to researchers through simple, elegant interfaces.",
        technologies: ["React", "Node.js", "Python", "RAG", "pipelines", "Classification ML", "Media Processing"],
        images: [
          "/labiq.jpg",
          "/labiq2.png"
        ],
        challenges: [
          "Implementing semantic search across millions of research papers",
          "Creating intuitive interfaces for complex AI workflows",
          "Ensuring enterprise-grade security for sensitive academic data"
        ],
        detailedDescription: "This platform revolutionizes research workflows with AI-powered media analysis. Features automated transcription tools, intelligent classification pipelines, and showreel generation with recording clipping for immediate evidence access. Built with a microservices architecture and simple, intuitive UX that makes complex AI capabilities accessible to researchers without technical backgrounds.",
        liveUrl: "https://labiq.io",
        githubUrl: "#",
        featured: true
      },
      {
        id: 2,
        title: "LEXHR.ai - Legal AI Assistant",
        description: "I architected and developed this intelligent legal AI assistant, focusing on creating intuitive React interfaces for complex legal workflows. Built custom agent solutions for contract analysis and compliance checking, emphasizing user-friendly design while maintaining strict data security protocols for sensitive legal documents.",
        technologies: ["React", "Node.js", "Python", "RAG", "AI Agents", "Docker"],
        images: [
          "https://lexhr.ai/images/newdesign/Chat-screendump-US.png",
        ],
        challenges: [
          "Processing complex legal documents with high accuracy",
          "Building AI agents that understand legal context and nuance",
          "Implementing zero-trust security for confidential legal data"
        ],
        detailedDescription: "A comprehensive legal AI platform that transforms how law firms handle document analysis and compliance. The system uses advanced NLP models trained on legal corpora to understand context, extract key information, and provide intelligent recommendations. The interface is designed for legal professionals with varying technical expertise.",
        liveUrl: "https://lexhr.ai",
        githubUrl: "#",
        featured: true
      },
      {
        id: 3,
        title: "CoreClarity.io - Business Intelligence",
        description: "Led the full-stack development of this AI-driven analytics platform with showreel and recording clipping capabilities similar to labIQ. Built transcription tools and classification pipelines with simple, intuitive UX/UI that transforms complex business data into actionable insights through elegant, user-friendly interfaces.",
        technologies: ["Vue", "TypeScript", "Node.js", "Python", "RAG", "transformers", "Classification ML"],
        images: [
          "https://www.coreclarity.ai/wp-content/uploads/2025/04/core-clarity-ai-screenshot-3.png",
          
      
        ],
        challenges: [
          "Processing and visualizing massive datasets in real-time",
          "Creating intuitive dashboards for non-technical business users",
          "Implementing scalable architecture for enterprise-level usage"
        ],
        detailedDescription: "An enterprise-grade business intelligence platform featuring AI-powered media analysis similar to labIQ. Includes automated transcription tools, intelligent classification pipelines, and showreel generation with recording clipping for immediate evidence access. Built with simple, intuitive UX that democratizes data analytics through elegant interfaces.",
        liveUrl: "https://coreclarity.ai",
        githubUrl: "#",
        featured: true
      },
      {
        id: 4,
        title: "HLB Global Insights AI",
        description: "As technical lead, I developed this public chat widget built on top of a secure RAG ecosystem with real-time classification pipelines. Architected enhanced security and load protection systems that serve thousands of concurrent users globally, creating intuitive chat interfaces while ensuring enterprise-grade security for the underlying RAG infrastructure.",
        technologies: ["Vue.js", "Laravel", "JavaScript", "RAG", "Real-time Pipelines", "Load Protection", "Security"],
        images: [
          "/hlb.png",
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop"
        ],
        challenges: [
          "Building secure RAG ecosystem with public chat widget interface",
          "Implementing real-time classification pipelines with load protection",
          "Ensuring enhanced security while maintaining public accessibility"
        ],
        detailedDescription: "A sophisticated public chat widget built on top of a secure RAG ecosystem featuring real-time classification pipelines. The system provides enhanced security and load protection while serving thousands of concurrent users globally. Built with enterprise-grade security architecture that protects the underlying RAG infrastructure while maintaining public accessibility through intuitive chat interfaces.",
        liveUrl: "https://hlb.global",
        githubUrl: "#",
        featured: true
      },
      {
        id: 5,
        title: "Interactive Portfolio Website",
        description: "A cutting-edge portfolio website built with Next.js featuring dynamic theme switching, interactive 3D elements, and an AI-powered chatbot assistant. Fully mobile-optimized with responsive design, theme-responsive scrollbars, and smooth animations. Includes advanced features like handedness detection for mobile users and a comprehensive developer sandbox.",
        technologies: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "Tailwind CSS", "AI Chatbot", "Mobile-First Design"],
        images: [
          "/site1.png",
          "/site2.png"
        ],
        challenges: [
          "Creating seamless mobile-first responsive design with optimal UX",
          "Implementing dynamic theme system with consistent visual elements",
          "Building interactive AI chatbot with conversation starters and fallback responses",
          "Optimizing 3D animations and effects for mobile performance"
        ],
        detailedDescription: "This modern portfolio website showcases advanced web development techniques with a focus on mobile optimization and user experience. Features include a dynamic theme system with 7 color schemes, interactive 3D cube navigation, AI-powered chatbot with predefined conversation starters, and comprehensive mobile optimizations including handedness detection for optimal thumb reach. Built with performance in mind, the site includes theme-responsive scrollbars, smooth animations without layout shifts, and a developer sandbox for real-time customization.",
        liveUrl: "#",
        githubUrl: "#",
        featured: true
      }
    ]
  },
  
  skills: {
    title: "Technical Expertise",
    subtitle: "AI-focused technology stack",
    categories: [
      {
        name: "AI & ML",
        icon: "🤖",
        skills: [
          { name: "RAG Systems", level: 95 },
          { name: "AI Agents", level: 92 },
          { name: "NLP", level: 88 },
          { name: "Vector Databases", level: 85 },
          { name: "LangChain", level: 90 }
        ]
      },
      {
        name: "Frontend",
        icon: "🎨",
        skills: [
          { name: "React", level: 95 },
          { name: "Vue.js", level: 92 },
          { name: "JavaScript/ES6+", level: 93 },
          { name: "TypeScript", level: 88 },
          { name: "CSS/SCSS", level: 90 }
        ]
      },
      {
        name: "Backend",
        icon: "⚙️",
        skills: [
          { name: "Node.js", level: 92 },
          { name: "Python", level: 90 },
          { name: "Laravel", level: 88 },
          { name: "PostgreSQL", level: 85 },
          { name: "Redis", level: 82 }
        ]
      },
      {
        name: "DevOps & Cloud",
        icon: "☁️",
        skills: [
          { name: "Docker", level: 90 },
          { name: "Google Cloud", level: 85 },
          { name: "AWS", level: 82 },
          { name: "CI/CD", level: 88 },
          { name: "OAuth Integration", level: 85 }
        ]
      }
    ]
  },
  
  hobbies: {
    title: "Life Beyond Code",
    subtitle: "When I'm not solving algorithms, I'm solving... other things",
    description: "They say all work and no play makes Jack a dull boy. Well, I'm not Jack, and I'm definitely not dull! Here's what keeps me spinning when I'm not debugging.",
    stories: [
      {
        title: "Car Enthusiast",
        content: "My passion for automotive engineering and high-performance vehicles drives my appreciation for precision and optimization. The pursuit of speed and cutting-edge automotive technology mirrors the same principles I apply in software development.",
        icon: "🚙",
        funFact: "Performance optimization in automotive engineering directly influences my approach to writing efficient code"
      },
      {
        title: "Music Lover",
        content: "Music provides my creative escape. Electronic music's precision and orchestral compositions' complexity both inspire my development approach - structured yet innovative.",
        icon: "🎧",
        funFact: "Different music genres enhance my coding focus: electronic for deep work, orchestral for creative problem-solving"
      },
      {
        title: "Puzzle Solver",
        content: "Puzzle games and brain teasers challenge my logical thinking and pattern recognition skills. The satisfaction of elegant solutions translates directly to my problem-solving approach in development.",
        icon: "🧩",
        funFact: "Puzzle-solving during breaks keeps my analytical skills sharp for coding challenges"
      }
    ],
    interactiveStory: {
      introduction: "Welcome to my world of hobbies! Each passion tells a story of precision, creativity, and problem-solving.",
      chapters: [
        {
          id: "cars",
          title: "Car Enthusiast",
          narrative: "High-performance automotive engineering inspires my approach to software optimization - precision, speed, and cutting-edge innovation.",
          choices: []
        },
        {
          id: "music",
          title: "Music Lover",
          narrative: "Electronic and orchestral music mirror code structure - complex layers working in harmony.",
          choices: []
        },
        {
          id: "puzzles",
          title: "Puzzle Solver",
          narrative: "Puzzles teach systematic thinking and elegant problem-solving - skills I apply to every development project.",
          choices: [
            { text: "Play Mini Puzzle", action: "startPuzzle", emoji: "🎯" }
          ]
        }
      ]
    }
  },
  
  contact: {
    title: "Let's Work Together",
    subtitle: "Ready to bring your ideas to life",
    description: "I'm always excited to work and collaborate with amazing people. Let's create something extraordinary together.",
    email: "zsolt.apponyi@gmail.com",
    phone: "+36 30 574 4252",
    location: "Debrecen, 4032 Hungary",
    social: [
      { name: "GitHub", url: "https://github.com/zsooltj", icon: "🐙" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/zsoltapp", icon: "💼" }
    ],
    availability: "",
    responseTime: ""
  }
};
