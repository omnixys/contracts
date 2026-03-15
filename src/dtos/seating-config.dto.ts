import { ShapeType } from '../enums/shape.enum.js';

export class SimpleSeatingConfigInput {
  sections!: number;
  tables!: number;
  seats?: number; // optional → auto distribute if missing
}

export class CustomSectionConfigInput {
  name!: string;
  tables!: number;
}

export class CustomTableConfigInput {
  name!: string;
  seats?: number; // optional, defaults to auto-calculated
}

export class SeatingConfigInput {
  // ========== SIMPLE MODE ==========
  simple?: SimpleSeatingConfigInput;

  // ========== CUSTOM MODE ==========
  sections?: CustomSectionConfigInput[];
  tables?: CustomTableConfigInput[];

  // ========== SHAPE ==========
  form?: ShapeType;
}
