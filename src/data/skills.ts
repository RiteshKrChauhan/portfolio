export interface Skill {
  name: string;
  category: string;
  icon: string;
  level: number;
}

export const skills: Skill[] = [
  // Languages
  { name: "C++",        category: "languages",  icon: "https://img.shields.io/badge/C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white",             level: 85 },
  { name: "C",          category: "languages",  icon: "https://img.shields.io/badge/C-00599C?style=flat-square&logo=c&logoColor=white",                     level: 80 },
  { name: "Python",     category: "languages",  icon: "https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white",            level: 88 },
  { name: "Java",       category: "languages",  icon: "https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white",             level: 78 },
  { name: "JavaScript", category: "languages",  icon: "https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E",   level: 90 },
  { name: "HTML5",      category: "languages",  icon: "https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white",              level: 92 },
  { name: "CSS3",       category: "languages",  icon: "https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white",                level: 90 },
  { name: "Bash",       category: "languages",  icon: "https://img.shields.io/badge/Bash-4EAA25?style=flat-square&logo=gnu-bash&logoColor=white",            level: 70 },
  { name: "Motoko",     category: "languages",  icon: "https://img.shields.io/badge/Motoko-111111?style=flat-square&logo=internetcomputer&logoColor=white",  level: 65 },
  { name: "JSON",       category: "languages",  icon: "https://img.shields.io/badge/JSON-5E5C5C?style=flat-square&logo=json&logoColor=white",                level: 90 },

  // Frameworks
  { name: "React",      category: "frameworks", icon: "https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB",             level: 90 },
  { name: "Node.js",    category: "frameworks", icon: "https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white",          level: 85 },
  { name: "Express.js", category: "frameworks", icon: "https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white",       level: 85 },
  { name: "Bootstrap",  category: "frameworks", icon: "https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white",      level: 82 },
  { name: "EJS",        category: "frameworks", icon: "https://img.shields.io/badge/EJS-8B5E3C?style=flat-square&logo=ejs&logoColor=white",                  level: 78 },
  { name: "Flexbox",    category: "frameworks", icon: "https://img.shields.io/badge/Flexbox-264DE4?style=flat-square&logo=css3&logoColor=white",             level: 88 },
  { name: "REST API",   category: "frameworks", icon: "https://img.shields.io/badge/REST_API-0A66C2?style=flat-square",                                      level: 88 },

  // Tools
  { name: "Git",        category: "tools",      icon: "https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white",                  level: 90 },
  { name: "GitHub",     category: "tools",      icon: "https://img.shields.io/badge/GitHub-24292E?style=flat-square&logo=github&logoColor=white",            level: 90 },
  { name: "Docker",     category: "tools",      icon: "https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white",            level: 75 },
  { name: "AWS",        category: "tools",      icon: "https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazon-aws&logoColor=white",           level: 72 },
  { name: "Postman",    category: "tools",      icon: "https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white",          level: 85 },
  { name: "npm",        category: "tools",      icon: "https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white",                  level: 88 },
  { name: "DFX SDK",    category: "tools",      icon: "https://img.shields.io/badge/DFX_SDK-29ABE2?style=flat-square&logo=internetcomputer&logoColor=white", level: 65 },

  // Databases
  { name: "PostgreSQL", category: "databases",  icon: "https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white",    level: 82 },
  { name: "MySQL",      category: "databases",  icon: "https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white",              level: 80 },
  { name: "MongoDB",    category: "databases",  icon: "https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white",          level: 78 },
];

export const skillCategories = [
  { id: "all",       name: "All" },
  { id: "languages", name: "Languages" },
  { id: "frameworks",name: "Frameworks" },
  { id: "tools",     name: "Tools" },
  { id: "databases", name: "Databases" },
];
