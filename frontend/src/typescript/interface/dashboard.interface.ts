export interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
}

export interface DashboardData {
  pendingReceivedRequests: number;
  pendingSentRequests: number;
  totalAcceptRequest: number;
  totalCompletedSwap: number;
  totalLearningSkills: number;
  totalRejectRequest: number;
  totalReports: number;
  totalTeachingSkills: number;
}