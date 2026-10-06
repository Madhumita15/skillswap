export type ReviewType = {
  reviewedUserId: {
    _id: string;
    name: string;
    email: string;
    avatar_image: string;
  };
  reviewerId: {
    _id: string;
    name: string;
    email: string;
    avatar_image: string;
  };
  _id: string;
  swapId: string;
  comment: string;
  rating: number;
};
