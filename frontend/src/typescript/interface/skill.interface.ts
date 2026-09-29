
export interface Skill {
  _id: string;
  name: string;
  description?: string;
  skill_logo?: string;
}

export interface MatchedUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar_image: string;
  status: string;
  bio: string,
  experience: string;

  learningScore: number;
  teachingScore: number;
  matchingScore: number;

  learningSkills: Skill[];
  teachingSkills: Skill[];
}


export interface SkillSectionProps {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}


export interface ScoreBoxProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}