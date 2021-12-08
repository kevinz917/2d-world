import { Noise } from 'noisejs';
import { MAP_WIDTH, MAP_HEIGHT } from './modules/map/mapReducer';

const xIncrement = 4;
const yIncrement = 4;

export const generateNoiseMatrix = () => {
  // perlin noise
  const noise = new Noise(Math.random());

  const scale = (val, min, max) => {
    return (val - min) / (max - min);
  };

  const _noiseMatrix = [];

  for (let x = 0; x < MAP_HEIGHT * xIncrement; x += xIncrement) {
    const newArr = [];
    for (let y = 0; y < MAP_WIDTH * yIncrement; y += yIncrement) {
      const value = noise.simplex2(x / 100, y / 100);
      newArr.push(Math.abs(scale(value, 0, 1)));
    }
    _noiseMatrix.push(newArr);
  }
  return _noiseMatrix;
};

export const defaultLocations = [
  [3, 3],
  [3, 5],
  [4, 4],
  [4, 5],
  [5, 4],

  [10, 10],
  [10, 11],
  [10, 12],
  [10, 12],
  [10, 13],
  [10, 14],
  [10, 15],
  [9, 10],
  [9, 11],
  [9, 12],
  [9, 12],
  [9, 13],
  [9, 14],
  [9, 15],
  [8, 10],
  [8, 11],
  [8, 12],
  [8, 12],
  [8, 13],
  [8, 14],
  [8, 15],

  [20, 20],
  [21, 20],
  [20, 21],
  [22, 24],
  [22, 24],
  [25, 23],
  [26, 22],
  [26, 23],
  [25, 24],

  [20, 10],
  [21, 10],
  [22, 10],
  [23, 10],
  [20, 11],
  [21, 11],
  [23, 11],
  [24, 12],
  [25, 14],
  [25, 13],
  [26, 31],
];
