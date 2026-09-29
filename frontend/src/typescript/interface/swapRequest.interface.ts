export interface SentRequestsInterface {
  _id: string;
  message: string;
  status: string;
  createdAt: string;
  receiverUser: {
    _id: string;
    name: string;
    email: string;
    avatar_image: string;
    bio: string;
    status: string;
    experience: string;
  };
  teachingSkills: {
    _id: string;
    name: string;
    description: string;
    skill_logo: string;
  };
  learningSkills: {
    _id: string;
    name: string;
    description: string;
    skill_logo: string;
  };
}



export interface ReceivedRequestsInterface {
  _id: string;
  message: string;
  status: string;
  createdAt: string;
  senderUser: {
    _id: string;
    name: string;
    email: string;
    avatar_image: string;
    status: string,
    bio: string;
    experience: string;
  };
  teachingSkills: {
    _id: string;
    name: string;
    description: string;
    skill_logo: string;
  };
  learningSkills: {
    _id: string;
    name: string;
    description: string;
    skill_logo: string;
  };
}