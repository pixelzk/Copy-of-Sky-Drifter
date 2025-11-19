export interface BirdThought {
  thought: string;
  mood: 'happy' | 'hungry' | 'philosophical' | 'sassy';
}

export enum CloudSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}
