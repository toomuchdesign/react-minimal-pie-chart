declare module '@schwingbat/relative-angle';

type Point = {
  x: number;
  y: number;
};

export function degrees(objectCoords: Point, targetCoords: Point): number;
