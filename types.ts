export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: 'Completed' | 'In Progress' | 'Classified';
}

export interface Skill {
  name: string;
  level: number;
}
