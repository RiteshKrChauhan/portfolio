export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  thumbnail: string;
  images: string[];
  github?: string;
  live?: string;
  featured: boolean;
  category: string;
  architecture?: string[];
}

export const projects: Project[] = [
  {
    id: "autonomous-self-healing-ml-system",
    title: "Autonomous Self Healing ML System",
    description: "Real-time predictive-maintenance ML pipeline that detects drift and anomalies, then autonomously retrains and promotes better models.",
    longDescription: "Built a production-grade, real-time machine learning pipeline for predictive maintenance of turbofan aircraft engines using the NASA CMAPSS FD001 dataset. The system predicts Remaining Useful Life with a Random Forest regressor, continuously monitors live sensor streams for concept drift with ADWIN, feature drift with KS-tests, and anomalies with Isolation Forest. When degradation is confirmed, it triggers background retraining, validates candidate models through shadow A/B evaluation, and promotes improved models without operator intervention.",
    tech: ["Python", "FastAPI", "React", "Scikit-Learn", "River", "SciPy", "NumPy", "Pandas"],
    image: "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 194949.png",
    thumbnail: "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 194949.png",
    images: [
      "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 194949.png",
      "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 195025.png",
      "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 195106.png",
      "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 195125.png",
      "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 195148.png",
      "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 195248.png",
      "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 195315.png",
      "/images/Autonomous Self-Healing ML System/Screenshot 2026-08-01 195425.png",
    ],
    live: "https://github.com/RiteshKrChauhan/AUTONOMOUS-SELF-HEALING-ML-SYSTEM",
    featured: true,
    category: "fullstack",
    architecture: ["Self-Healing ML", "Drift Detection", "Shadow A/B Evaluation", "Predictive Maintenance"],
  },
  {
    id: "decision-autopsy",
    title: "Decision Autopsy",
    description: "Multi-agent decision simulation system with a 5-agent LLM pipeline for sequential multi-stage decision analysis.",
    longDescription: "Architected a 5-agent LLM pipeline where each agent processes and forwards structured outputs to the next, enabling sequential multi-stage decision simulation. Built a FastAPI backend with strict Pydantic validation (schema constraints, ordering rules, Literal enforcement) to ensure deterministic, UI-safe agent outputs. Developed an interactive React interface for real-time \"what-if\" analysis, visualizing 4 simulated future outcomes per decision.",
    tech: ["FastAPI", "React", "Pydantic", "LLM APIs", "Python"],
    image: "/images/Decision Autopsy/Screenshot 2026-08-01 194414.png",
    thumbnail: "/images/Decision Autopsy/Screenshot 2026-08-01 194414.png",
    images: [
      "/images/Decision Autopsy/Screenshot 2026-08-01 194414.png",
      "/images/Decision Autopsy/Screenshot 2026-08-02 195847.png",
      "/images/Decision Autopsy/Screenshot 2026-08-02 195904.png",
      "/images/Decision Autopsy/Screenshot 2026-08-02 195917.png",
    ],
    live: "https://github.com/RiteshKrChauhan/Decision-Autopsy",
    featured: true,
    category: "fullstack",
    architecture: ["Multi-Agent", "LLM Pipeline", "REST API"],
  },
  {
    id: "pan-merchant-fraud-detection",
    title: "PAN Merchant Fraud Detection",
    description: "Fraud detection system identifying fraudulent merchant networks using graph analytics, ML embeddings, and advanced pattern recognition.",
    longDescription: "Built an advanced analytical platform to detect and visualize fraudulent merchant networks in digital payment ecosystems. Analyzes shared identifiers (PAN, device IDs, IP addresses) and transaction patterns using NetworkX connected components to identify 85+ fraud rings ranging from 2 to 7,699+ members. Implemented cosine similarity on 16-dimensional merchant embeddings for pattern recognition, backed by PostgreSQL handling 100k+ merchants. Features an interactive React dashboard with force-directed graph visualization, real-time merchant search, and risk profiling.",
    tech: ["React", "Flask", "Express.js", "PostgreSQL", "NetworkX", "scikit-learn", "NumPy", "pandas"],
    image: "/images/PAN Merchant Fraud Detection/Screenshot 2026-08-02 181532.png",
    thumbnail: "/images/PAN Merchant Fraud Detection/Screenshot 2026-08-02 181532.png",
    images: [
      "/images/PAN Merchant Fraud Detection/Screenshot 2026-08-02 181532.png",
      "/images/PAN Merchant Fraud Detection/Screenshot 2026-08-02 181557.png",
      "/images/PAN Merchant Fraud Detection/Screenshot 2026-08-02 181632.png",
      "/images/PAN Merchant Fraud Detection/Screenshot 2026-08-02 181700.png",
    ],
    live: "https://github.com/RiteshKrChauhan/PAN-MERCHANT-FRAUD-DETECTION",
    featured: true,
    category: "ml",
    architecture: ["Graph Analytics", "ML Embeddings", "Microservices", "REST API"],
  },
  // {
  //   id: "network-intrusion-detection",
  //   title: "Network Intrusion Detection",
  //   description: "Full-stack IDS dashboard processing 2.8M+ CICIDS-2017 records with 99.86% intrusion-detection accuracy.",
  //   longDescription: "Processed 2.8M+ CICIDS-2017 records using PySpark, applying feature engineering and scaling to train 7 models achieving 99.86% intrusion-detection accuracy. Built a full-stack IDS dashboard with React 19 + Node.js/Express, featuring PostgreSQL, Passport.js (local + Google OAuth 2.0), and role-based access control for model evaluation. Implemented interactive Recharts visualizations to compare model metrics with dynamic grouped bar charts, enabling real-time analysis of accuracy, precision, recall, and F1-scores.",
  //   tech: ["React", "Node.js", "Express.js", "PostgreSQL", "PySpark", "Scikit-Learn", "Passport.js"],
  //   image: "/images/NIDS/Screenshot 2026-08-02 175459.png",
  //   thumbnail: "/images/NIDS/Screenshot 2026-08-02 175459.png",
  //   images: [
  //     "/images/NIDS/Screenshot 2026-08-02 175459.png",
  //     "/images/NIDS/Screenshot 2026-08-02 175513.png",
  //     "/images/NIDS/Screenshot 2026-08-02 175935.png",
  //   ],
  //   live: "https://github.com/RiteshKrChauhan/Network-Intrusion-Detection-Analysis",
  //   featured: true,
  //   category: "fullstack",
  //   architecture: ["Full-Stack", "ML Pipeline", "OAuth 2.0", "RBAC"],
  // },
];
