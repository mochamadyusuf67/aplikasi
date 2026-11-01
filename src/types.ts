export type ViewMode =
  | 'cover'
  | 'map'
  | 'meeting'
  | 'glossary'
  | 'facts'
  | 'badges'
  | 'parents'
  | 'asset_gallery';

export interface Question {
  id: string;
  prompt: string;
  options: {
    label: string;
    isCorrect: boolean;
    reason: string;
  }[];
  hint: string;
}

export interface StepScreen {
  id: string;
  title: string; // Max 5 words
  text: string;  // Max 2 short sentences
  assetId: string;
  interactiveType?:
    | 'none'
    | 'tech_slider'
    | 'budget_basket'
    | 'art_kit'
    | 'discount_slicer'
    | 'shop_shelves'
    | 'quiz'
    | 'reflection';
  question?: Question;
  reflectionOptions?: string[];
}

export interface Mission {
  id: string;
  title: string;
  type: 'tech' | 'math' | 'eng' | 'art' | 'quiz' | 'reflection';
  screens: StepScreen[];
  stars: number;
}

export interface Meeting {
  id: number;
  title: string;
  theme: string;
  bgAssetId: string;
  badgeId?: string;
  badgeTitle?: string;
  missions: Mission[];
}

export interface UserProgress {
  currentMeetingId: number;
  currentMissionIndex: number;
  completedMissions: Record<string, boolean>; // missionId -> boolean
  earnedBadges: Record<string, boolean>;     // badgeId -> boolean
  totalStars: number;
  basketItems: number[];
  reflections: Record<string, { mood: string; text: string }>;
}
