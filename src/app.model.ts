export interface AppStory {
  id: number;
  title: string;
  url: string;
  timestamp: number;
  score: number;
  authorId: string;
  authorKarma: string;
  image?: string;
}

export interface StoryItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface User {
  created: number;
  id: string;
  karma: string;
  submitted: number[];
}
