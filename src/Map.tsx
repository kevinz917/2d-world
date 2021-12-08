import React, { useState, useEffect, useRef } from 'react';
import { MAP_WIDTH, MAP_HEIGHT } from './modules/map/mapReducer';
import { generateNoiseMatrix, defaultLocations } from './util';
import _ from 'lodash';
import './Map.scss';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const depthColorSelector = (_noiseValue: number) => {
  const roundedVal = Number(_noiseValue.toFixed(1));
  if (roundedVal > 0.8) return '#637D3D';
  if (roundedVal > 0.6) return '#455F22';
  if (roundedVal > 0.4) return '#83764C';
  if (roundedVal > 0.2) return '#A19469';
  if (roundedVal >= 0.0) return '#2355BF';
};

const CELL_SIZE = 5;
const WIDTH = 500;
const HEIGHT = 500;

const generateNewMap = (): number[][] => {
  return new Array(MAP_HEIGHT).fill(0).map(() => new Array(MAP_WIDTH).fill(0));
};

const generateDefaultMap = (): number[][] => {
  const newMap = generateNewMap();

  defaultLocations.forEach((location: number[]) => (newMap[location[0]][location[1]] = 1));

  return newMap;
};

const Map = (): React.ReactElement => {
  const [newMapState, setNewMapState] = useState<number[][]>(generateDefaultMap());
  const [terrainMap, setTerrainMap] = useState<null | number[][]>(null);
  const [virusCells, setViruslCells] = useState<number[][]>([]);
  const [lastVirusCells, setLastVirusCells] = useState<number[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [ctx, setCtx] = useState(null);

  const canvas: any = useRef();

  // initiate filled squares on map
  useEffect(() => {
    const _noiseMatrix: number[][] = generateNoiseMatrix();
    setTerrainMap(_noiseMatrix);
  }, []);

  // useEffect(() => {
  //   const handle = setInterval(updateMapNew, 100);

  //   return () => {
  //     clearInterval(handle);
  //   };
  // });

  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    const tempCtx = canvasEle.getContext('2d');
    setCtx(tempCtx);
  }, []);

  // update cell list according to map
  const makeCells = () => {
    const cells = [];
    for (let y = 1; y < MAP_HEIGHT - 1; y++) {
      for (let x = 1; x < MAP_WIDTH - 1; x++) {
        if (newMapState[y][x] == 1) {
          cells.push([y, x]);
        }
      }
    }
    return cells;
  };

  const updateMapNew = () => {
    // update last cells to produce trace effect
    setLastVirusCells(virusCells);

    const newMap = generateNewMap();

    for (let y = 1; y < MAP_HEIGHT - 1; y++) {
      for (let x = 1; x < MAP_WIDTH - 1; x++) {
        let numLiveNeighbors = 0;

        if (newMapState[y - 1][x - 1] == 1) numLiveNeighbors += 1; // top left
        if (newMapState[y - 1][x] == 1) numLiveNeighbors += 1; // top
        if (newMapState[y - 1][x + 1] == 1) numLiveNeighbors += 1; // top right
        if (newMapState[y][x + 1] == 1) numLiveNeighbors += 1; // right
        if (newMapState[y + 1][x + 1] == 1) numLiveNeighbors += 1; // right bottom
        if (newMapState[y + 1][x] == 1) numLiveNeighbors += 1; // bottom
        if (newMapState[y + 1][x - 1] == 1) numLiveNeighbors += 1; // bottom left
        if (newMapState[y][x - 1] == 1) numLiveNeighbors += 1; // left

        const currentCellState = newMapState[y][x];

        if ((currentCellState == 1 && numLiveNeighbors < 2) || (currentCellState == 1 && numLiveNeighbors > 3)) {
          newMap[y][x] = 0;
        } else if (
          (currentCellState == 1 && (numLiveNeighbors == 2 || numLiveNeighbors == 3)) ||
          (currentCellState == 0 && numLiveNeighbors == 3)
        ) {
          newMap[y][x] = 1;
        } else {
          newMap[y][x] = 0;
        }
      }
    }

    setNewMapState(newMap);
    setViruslCells(makeCells());
  };

  // initial render world
  const renderWorld = () => {
    if (terrainMap) {
      for (let y = 0; y < terrainMap.length; y++) {
        for (let x = 0; x < terrainMap[0].length; x++) {
          drawFillRect(
            { x: CELL_SIZE * x + 1, y: CELL_SIZE * y + 1, w: CELL_SIZE - 1, h: CELL_SIZE - 1 },
            { backgroundColor: depthColorSelector(terrainMap[y][x]) }
          );
        }
      }
    }
  };

  // draw rectangle with background
  const drawFillRect = (info: any, style: any) => {
    const { x, y, w, h } = info;
    const { backgroundColor } = style;

    const tempCtx: any = ctx;
    tempCtx.beginPath();
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(x, y, w, h);
    setCtx(tempCtx);
  };

  const clearRect = (info: any) => {
    const { x, y, w, h } = info;

    const tempCtx: any = ctx;
    tempCtx.clearRect(x, y, w, h);
    setCtx(tempCtx);
  };

  useEffect(() => {
    // clear last cells
    lastVirusCells.map((cellLocation: number[]) => {
      clearRect({
        x: CELL_SIZE * cellLocation[1] + 1,
        y: CELL_SIZE * cellLocation[0] + 1,
        w: CELL_SIZE - 1,
        h: CELL_SIZE - 1,
      });
    });

    virusCells.map((cellLocation: number[]) => {
      drawFillRect(
        { x: CELL_SIZE * cellLocation[1] + 1, y: CELL_SIZE * cellLocation[0] + 1, w: CELL_SIZE - 1, h: CELL_SIZE - 1 },
        { backgroundColor: '#00FF1D' }
      );
    });
  }, [virusCells]);

  return (
    <div className="map-page-container">
      <h3>2D World</h3>
      <br />

      <canvas ref={canvas} width={WIDTH} height={HEIGHT} />

      <br />
      <div className="control-row">
        <button onClick={() => updateMapNew()}>Update</button>
        <button
          onClick={() => {
            setIsRunning(!isRunning);
          }}
        >
          Play
        </button>
        <button onClick={() => renderWorld()}>Render World</button>
      </div>
    </div>
  );
};

export default Map;
