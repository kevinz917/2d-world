import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { masterState } from './redux/rootReducer';
import { mapActions } from './modules/map/mapActions';
import { MAP_WIDTH, MAP_HEIGHT } from './modules/map/mapReducer';
import './Map.scss';

//   const fillSquare = (x: number, y: number): void => {
//     dispatch(mapActions.setSquare(x, y, 1));
//   };

const Map = (): React.ReactElement => {
  // update map, increment time
  const dispatch = useDispatch();
  const mapState = useSelector((state: masterState) => state.map.map);

  // initiate filled squares on map
  useEffect(() => {
    // infinite move pattern
    dispatch(mapActions.setSquareBatch([3, 5, 4, 5, 4], [3, 3, 4, 4, 5], [1, 1, 1, 1, 1]));
  }, []);

  // update entire map according to conway's game of life
  const updateMap = () => {
    const xList: number[] = [];
    const yList: number[] = [];
    const valueList: number[] = [];

    for (let y = 1; y < MAP_HEIGHT - 1; y++) {
      for (let x = 1; x < MAP_WIDTH - 1; x++) {
        // count number of live neighbors
        let numLiveNeighbors = 0;

        if (mapState[y - 1][x - 1] == 1) numLiveNeighbors += 1; // top left
        if (mapState[y - 1][x] == 1) numLiveNeighbors += 1; // top
        if (mapState[y - 1][x + 1] == 1) numLiveNeighbors += 1; // top right
        if (mapState[y][x + 1] == 1) numLiveNeighbors += 1; // right
        if (mapState[y + 1][x + 1] == 1) numLiveNeighbors += 1; // right bottom
        if (mapState[y + 1][x] == 1) numLiveNeighbors += 1; // bottom
        if (mapState[y + 1][x - 1] == 1) numLiveNeighbors += 1; // bottom left
        if (mapState[y][x - 1] == 1) numLiveNeighbors += 1; // left

        const currentCellState = mapState[y][x];

        xList.push(x);
        yList.push(y);

        if (currentCellState == 1 && numLiveNeighbors < 2) {
          valueList.push(0);
        } else if (currentCellState == 1 && (numLiveNeighbors == 2 || numLiveNeighbors == 3)) {
          valueList.push(1);
        } else if (currentCellState == 1 && numLiveNeighbors > 3) {
          valueList.push(0);
        } else if (currentCellState == 0 && numLiveNeighbors == 3) {
          valueList.push(1);
        } else {
          valueList.push(0);
        }
      }
    }
    dispatch(mapActions.setSquareBatch(xList, yList, valueList));
  };

  return (
    <div className="map-page-container">
      <div>
        {mapState.map((row: any, idx: number) => (
          <div className="map-row">
            {mapState[idx].map((val: number, idx: number) => (
              <div className={`square-container ${val === 1 && 'square-filled'}`} />
            ))}
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => updateMap()}>Update</button>
      <button>Play</button>
    </div>
  );
};

export default Map;
