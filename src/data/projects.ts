export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
  category: string;
  architecture?: string[];
}

export const projects: Project[] = [
  {
    id: "decision-autopsy",
    title: "Decision Autopsy",
    description: "Multi-agent decision simulation system with a 5-agent LLM pipeline for sequential multi-stage decision analysis.",
    longDescription: "Architected a 5-agent LLM pipeline where each agent processes and forwards structured outputs to the next, enabling sequential multi-stage decision simulation. Built a FastAPI backend with strict Pydantic validation (schema constraints, ordering rules, Literal enforcement) to ensure deterministic, UI-safe agent outputs. Developed an interactive React interface for real-time \"what-if\" analysis, visualizing 4 simulated future outcomes per decision.",
    tech: ["FastAPI", "React", "Pydantic", "LLM APIs", "Python"],
    image: "/images/projects/decision-autopsy.jpg",
    live: "https://github.com/RiteshKrChauhan/Decision-Autopsy",
    featured: true,
    category: "fullstack",
    architecture: ["Multi-Agent", "LLM Pipeline", "REST API"],
  },
  {
    id: "network-intrusion-detection",
    title: "Network Intrusion Detection",
    description: "Full-stack IDS dashboard processing 2.8M+ CICIDS-2017 records with 99.86% intrusion-detection accuracy.",
    longDescription: "Processed 2.8M+ CICIDS-2017 records using PySpark, applying feature engineering and scaling to train 7 models achieving 99.86% intrusion-detection accuracy. Built a full-stack IDS dashboard with React 19 + Node.js/Express, featuring PostgreSQL, Passport.js (local + Google OAuth 2.0), and role-based access control for model evaluation. Implemented interactive Recharts visualizations to compare model metrics with dynamic grouped bar charts, enabling real-time analysis of accuracy, precision, recall, and F1-scores.",
    tech: ["React", "Node.js", "Express.js", "PostgreSQL", "PySpark", "Scikit-Learn", "Passport.js"],
    image: "/images/projects/network-ids.jpg",
    live: "https://github.com/RiteshKrChauhan/Network-Intrusion-Detection-Analysis",
    featured: true,
    category: "fullstack",
    architecture: ["Full-Stack", "ML Pipeline", "OAuth 2.0", "RBAC"],
  },
  {
    id: "trademint",
    title: "TradeMint – NFT Marketplace DApp",
    description: "Full-stack NFT marketplace on Internet Computer using Motoko smart contracts with dynamic minting and marketplace listings.",
    longDescription: "Built a full-stack NFT marketplace on Internet Computer using Motoko smart contracts and React, with dynamic NFT minting, marketplace listings, and custom token integration for transactions. Designed multi-canister architecture managing NFT ownership, marketplace operations, and token transactions with persistent on-chain storage and secure inter-canister communication. Implemented React-based Web3 UI with DFINITY Agent integration, enabling seamless blockchain interaction for NFT minting, listing, and purchasing with real-time updates.",
    tech: ["React", "Motoko", "JavaScript", "Internet Computer (ICP)", "DFINITY Canister SDK", "Bootstrap"],
    image: "/images/projects/trademint.jpg",
    live: "https://github.com/RiteshKrChauhan/TradeMint",
    featured: true,
    category: "web3",
    architecture: ["Multi-Canister", "Web3", "On-Chain Storage", "Blockchain"],
  },
];
