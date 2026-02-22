const projects = [
    {
        id: 1,
        name: "Smart Parking Finder",
        description: "A secure, map-centric mobile app integrating Google Maps API for dynamic markers and Angular Auth Guard for route protection. Features a complete simulated booking and profile management system with persistent user data.",
        techStack: ["Ionic", "Angular", "TypeScript", "Google Maps API"],
        githubLink: "https://github.com/Yadav-Anurag24/Parking-Finder-App",
        liveLink: null,
        status: "Completed",
        featured: true,
        features: ["Google Maps Integration", "Slide-to-Delete Bookings", "Editable User Profile", "Angular Auth Guard"]
    },
    {
        id: 2,
        name: "BuyLawBooks",
        description: "E-commerce platform for legal publications with multi-role authentication using Firebase Auth, automated CI/CD pipelines, and high-performance storefront deployed via AWS Amplify.",
        techStack: ["Next.js", "Express.js", "Node.js", "PostgreSQL", "AWS"],
        githubLink: null,
        liveLink: "https://www.buylawbooks.com/",
        status: "Completed",
        featured: true,
        features: ["Firebase Auth", "CI/CD Pipelines", "AWS Amplify Deployment", "E2E API Testing"]
    },
    {
        id: 3,
        name: "StudyLeaf Note-Taking CMS",
        description: "Full-stack, database-driven Content Management System with secure admin authentication, complete CRUD functionality, dynamic date-based sorting, and live search feature.",
        techStack: ["Node.js", "Express.js", "MongoDB", "EJS", "Mongoose"],
        githubLink: "https://github.com/Yadav-Anurag24/StudyLeaf",
        liveLink: null,
        status: "Completed",
        featured: true,
        features: ["EasyMDE Markdown Editor", "Dark/Light Themes", "Live Search", "Session Auth with connect-mongo"]
    },
    {
        id: 4,
        name: "CGPA Calculator",
        description: "Responsive CGPA Calculator web app with modular components, routing, real-time GPA/CGPA computation, and a History Page to persist past calculations.",
        techStack: ["Angular", "TypeScript", "Bootstrap"],
        githubLink: "https://github.com/Yadav-Anurag24/CGPA-Calculator",
        liveLink: null,
        status: "Completed",
        featured: false,
        features: ["Real-time GPA Computation", "Input Validation", "Calculation History", "Clear History"]
    },
    {
        id: 5,
        name: "HPCL Dealer App",
        description: "Official mobile app for HPCL dealers to track inventory.",
        techStack: ["React Native", "Firebase", "Redux"],
        githubLink: "https://github.com/Yadav-Anurag24/hpcl-app",
        liveLink: null,
        status: "In Development",
        features: ["Real-time slots", "Google Maps", "Payment Gateway"]
    },
    {
        id: 6,
        name: "Bookstore Auth System",
        description: "Secure authentication system with role-based access control, JWT tokens, REST API with CRUD operations, and security best practices.",
        techStack: ["Node.js", "Express", "JWT", "MongoDB"],
        githubLink: "https://github.com/Yadav-Anurag24/bookstore-auth",
        liveLink: null,
        status: "Completed",
        featured: false,
        features: ["JWT Authentication", "Role-Based Access", "Rate Limiting", "Input Validation"]
    }
];

module.exports = projects;