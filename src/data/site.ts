export interface Achievement {
  id: string;
  title: string;
  value: string;
  suffix?: string;
}

export const achievements: Achievement[] = [
  { id: "projects", title: "Projects Built", value: "10", suffix: "+" },
  { id: "technologies", title: "Technologies", value: "30", suffix: "+" },
  { id: "cgpa", title: "CGPA", value: "9.6", suffix: "/10" },
];

export const siteConfig = {
  name: "Ritesh Kumar Chauhan",
  title: "AI Engineer • Full Stack Developer • Problem Solver",
  tagline: "I design AI-powered applications, scalable backend systems, and interactive digital experiences that combine engineering precision with thoughtful design.",
  description: "I'm a 4th-year Information Science and Engineering student passionate about building products that solve meaningful problems.\n\nMy work spans AI applications, backend engineering, and developing end to end pipelines.\n\nRecently I've been exploring multi-agent AI systems, RAG pipelines, LLM workflows, and scalable cloud architecture.\n\nWhen I'm not building projects, you'll probably find me solving algorithmic problems, learning new technologies, or experimenting with interface design.",
  location: "Bangalore, Karnataka, India",
  email: "riteshkumarchauhan9@gmail.com",
  resumeUrl: "/Ritesh_Kumar_Chauhan_Resume.pdf",
  available: true,
};
