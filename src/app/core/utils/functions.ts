import { TrackByModel } from '../models/track-by.model';

export const trackByFnById = (idx: number, element: TrackByModel): number =>
  element.id;

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
