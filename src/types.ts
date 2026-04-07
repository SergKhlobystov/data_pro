export type Level = 'easy' | 'medium' | 'hard';

export interface GeneratedData {
  headers: string[];
  rows: any[];
}

export interface Preset {
  id: Level;
  title: string;
  description: string;
  rows: number;
  months: number;
  columns: number;
}
