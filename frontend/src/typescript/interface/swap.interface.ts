export interface SwapInterface{

  _id: string,
  status: string,
  receiverUser: {
    _id: string,
    email: string,
    name: string,
    avatar_image: string,
    bio: string,
    experience: string,
    status: string,
    phone: string
  },
  senderUser: {
     _id: string,
    email: string,
    name: string,
    avatar_image: string,
    bio: string,
    experience: string,
    status: string,
    phone: string

  },
  teachingSkills: {
    _id: string,
    description: string,
    skill_logo: string,
    name: string
  };
   learningSkills: {
    _id: string,
    description: string,
    skill_logo: string,
    name: string
  };
  completedDate: string,
  cancelledDate: string,
  startDate: string
}