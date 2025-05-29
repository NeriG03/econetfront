export interface UserActivity {
  id?: number;
  user: {
    id: number;
    name?: string;
    email?: string;
  };
  activity: {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    points: number;
    activo: boolean;
  };
  createdAt: string;
}

export interface UserStats {
  points: number;
  level: number;
  nextLevelPoints: number;
}

export interface ActivityParticipation {
  activityId: number;
  action: 'join' | 'complete' | 'start_reading';
  evidence?: string;
  answers?: any[];
}
