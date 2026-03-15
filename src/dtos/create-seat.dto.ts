import type { SeatingConfigInput } from './seating-config.dto.js';

export interface CreateSeatDTO {
  eventId: string;
  maxSeats: number;
  actorId: string;
}
