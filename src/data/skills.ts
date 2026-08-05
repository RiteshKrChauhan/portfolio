export interface Skill {
  name: string;
  category: string;
  icon: string;
}

export const skills: Skill[] = [
  // ─── Languages ────────────────────────────────────────────────────────────
  { name: "C++",        category: "languages", icon: "https://img.shields.io/badge/C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white"           },
  { name: "Python",     category: "languages", icon: "https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white"          },
  { name: "Java",       category: "languages", icon: "https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white"           },
  { name: "JavaScript", category: "languages", icon: "https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E" },
  { name: "C",          category: "languages", icon: "https://img.shields.io/badge/C-00599C?style=flat-square&logo=c&logoColor=white"                   },
  { name: "SQL",        category: "languages", icon: "https://img.shields.io/badge/SQL-4479A1?style=flat-square&logo=mysql&logoColor=white"              },

  // ─── Frontend ─────────────────────────────────────────────────────────────
  { name: "React",      category: "frontend",  icon: "https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB"           },
  { name: "HTML5",      category: "frontend",  icon: "https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"            },
  { name: "CSS3",       category: "frontend",  icon: "https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"              },
  { name: "Bootstrap",  category: "frontend",  icon: "https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white"    },
  { name: "Recharts",   category: "frontend",  icon: "https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=chartdotjs&logoColor=white"    },

  // ─── Backend ──────────────────────────────────────────────────────────────
  { name: "Node.js",          category: "backend", icon: "https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white"              },
  { name: "Express.js",       category: "backend", icon: "https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white"           },
  { name: "FastAPI",          category: "backend", icon: "https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white"              },
  { name: "REST APIs",        category: "backend", icon: "https://img.shields.io/badge/REST_APIs-0A66C2?style=flat-square"                                         },
  { name: "Pydantic",         category: "backend", icon: "https://img.shields.io/badge/Pydantic-E92063?style=flat-square&logo=pydantic&logoColor=white"            },
  { name: "Passport.js",      category: "backend", icon: "https://img.shields.io/badge/Passport.js-34E27A?style=flat-square&logo=passport&logoColor=white"         },
  { name: "Google OAuth 2.0", category: "backend", icon: "https://img.shields.io/badge/Google_OAuth-4285F4?style=flat-square&logo=google&logoColor=white"          },
  { name: "Authentication",   category: "backend", icon: "https://img.shields.io/badge/Auth_%26_AuthZ-EB5424?style=flat-square&logo=auth0&logoColor=white"         },
  { name: "RBAC",             category: "backend", icon: "https://img.shields.io/badge/RBAC-6C757D?style=flat-square"                                             },

  // ─── AI / ML ──────────────────────────────────────────────────────────────
  { name: "Scikit-learn",        category: "aiml", icon: "https://img.shields.io/badge/Scikit--learn-F7931E?style=flat-square&logo=scikitlearn&logoColor=white" },
  { name: "PySpark",             category: "aiml", icon: "https://img.shields.io/badge/PySpark-E25A1C?style=flat-square&logo=apachespark&logoColor=white"       },
  { name: "LLM APIs",            category: "aiml", icon: "https://img.shields.io/badge/LLM_APIs-412991?style=flat-square&logo=openai&logoColor=white"           },
  { name: "Multi-Agent AI",      category: "aiml", icon: "https://img.shields.io/badge/Multi--Agent_AI-CC785C?style=flat-square&logo=anthropic&logoColor=white" },
  { name: "Feature Engineering", category: "aiml", icon: "https://img.shields.io/badge/Feature_Engineering-150458?style=flat-square&logo=pandas&logoColor=white"},

  // ─── Databases ────────────────────────────────────────────────────────────
  { name: "PostgreSQL", category: "databases", icon: "https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white" },
  { name: "MySQL",      category: "databases", icon: "https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white"           },
  { name: "MongoDB",    category: "databases", icon: "https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"       },

  // ─── Blockchain ───────────────────────────────────────────────────────────
  { name: "Motoko",            category: "blockchain", icon: "https://img.shields.io/badge/Motoko-29ABE2?style=flat-square&logo=internetcomputer&logoColor=white"  },
  { name: "Internet Computer", category: "blockchain", icon: "https://img.shields.io/badge/ICP-29ABE2?style=flat-square&logo=internetcomputer&logoColor=white"    },
  { name: "DFX SDK",           category: "blockchain", icon: "https://img.shields.io/badge/DFX_SDK-29ABE2?style=flat-square&logo=internetcomputer&logoColor=white" },

  // ─── Tools ────────────────────────────────────────────────────────────────
  { name: "Git",     category: "tools", icon: "https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"            },
  { name: "GitHub",  category: "tools", icon: "https://img.shields.io/badge/GitHub-24292E?style=flat-square&logo=github&logoColor=white"      },
  { name: "Docker",  category: "tools", icon: "https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"      },
  { name: "Postman", category: "tools", icon: "https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white"    },
  { name: "AWS",     category: "tools", icon: "https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazon-aws&logoColor=white"     },
  { name: "npm",     category: "tools", icon: "https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"            },
];

export const skillCategories = [
  { id: "all",        name: "All" },
  { id: "languages",  name: "Languages" },
  { id: "frontend",   name: "Frontend" },
  { id: "backend",    name: "Backend" },
  { id: "aiml",       name: "AI / ML" },
  { id: "databases",  name: "Databases" },
  { id: "blockchain", name: "Blockchain" },
  { id: "tools",      name: "Tools" },
];
