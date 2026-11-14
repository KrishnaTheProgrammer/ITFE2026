export interface Episode {
  number: number;
  title: string;
  flag: string;
  country: string;
  status: 'Coming Soon' | 'Upcoming';
  duration: string;
  location: string;
  synopsis: string;
  highlights: string[];
}

export interface CultureBadge {
  flag: string;
  country: string;
  episodeCount: number;
}

export interface UserProfile {
  name: string;
  email: string;
}

export type AuthModalMode = 'login' | 'signup' | null;