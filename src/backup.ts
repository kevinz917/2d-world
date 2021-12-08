export const random = 1;
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { masterState } from './redux/rootReducer';
// import { mapActions } from './modules/map/mapActions';
// import { MAP_WIDTH, MAP_HEIGHT } from './modules/map/mapReducer';
// import { generateNoiseMatrix } from './util';
// import _ from 'lodash';
// import './Map.scss';

// const depthColorSelector = (_noiseValue: number) => {
//   const roundedVal = Number(_noiseValue.toFixed(1));
//   if (roundedVal > 0.8) return '#637D3D';
//   if (roundedVal > 0.6) return '#455F22';
//   if (roundedVal > 0.4) return '#83764C';
//   if (roundedVal > 0.2) return '#A19469';
//   if (roundedVal >= 0.0) return '#2355BF';
// };

// const generateNewMap = (): number[][] => {
//   return new Array(MAP_HEIGHT).fill(0).map(() => new Array(MAP_WIDTH).fill(0));
// };

// const generateDefaultMap = (): number[][] => {
//   const newMap = generateNewMap();
//   newMap[3][3] = 1;
//   newMap[3][5] = 1;
//   newMap[4][4] = 1;
//   newMap[4][5] = 1;
//   newMap[5][4] = 1;

//   return newMap;
// };

// const Map = (): React.ReactElement => {
//   // update map, increment time
//   const dispatch = useDispatch();
//   const mapState = useSelector((state: masterState) => state.map.map);
//   const [newMapState, setNewMapState] = useState<number[][]>(generateDefaultMap());
//   const [terrainMap, setTerrainMap] = useState<null | number[][]>(null);

//   // initiate filled squares on map
//   useEffect(() => {
//     // infinite move pattern
//     dispatch(mapActions.setSquareBatch([3, 5, 4, 5, 4], [3, 3, 4, 4, 5], [1, 1, 1, 1, 1]));

//     const _noiseMatrix: any = generateNoiseMatrix();
//     setTerrainMap(_noiseMatrix);
//   }, []);

//   // update entire map according to conway's game of life
//   const updateMap = () => {
//     const xList: number[] = [];
//     const yList: number[] = [];
//     const valueList: number[] = [];

//     for (let y = 1; y < MAP_HEIGHT - 1; y++) {
//       for (let x = 1; x < MAP_WIDTH - 1; x++) {
//         let numLiveNeighbors = 0;

//         if (mapState[y - 1][x - 1] == 1) numLiveNeighbors += 1; // top left
//         if (mapState[y - 1][x] == 1) numLiveNeighbors += 1; // top
//         if (mapState[y - 1][x + 1] == 1) numLiveNeighbors += 1; // top right
//         if (mapState[y][x + 1] == 1) numLiveNeighbors += 1; // right
//         if (mapState[y + 1][x + 1] == 1) numLiveNeighbors += 1; // right bottom
//         if (mapState[y + 1][x] == 1) numLiveNeighbors += 1; // bottom
//         if (mapState[y + 1][x - 1] == 1) numLiveNeighbors += 1; // bottom left
//         if (mapState[y][x - 1] == 1) numLiveNeighbors += 1; // left

//         const currentCellState = mapState[y][x];

//         xList.push(x);
//         yList.push(y);

//         if ((currentCellState == 1 && numLiveNeighbors < 2) || (currentCellState == 1 && numLiveNeighbors > 3)) {
//           valueList.push(0);
//         } else if (
//           (currentCellState == 1 && (numLiveNeighbors == 2 || numLiveNeighbors == 3)) ||
//           (currentCellState == 0 && numLiveNeighbors == 3)
//         ) {
//           valueList.push(1);
//         } else {
//           valueList.push(0);
//         }
//       }
//     }
//     dispatch(mapActions.setSquareBatch(xList, yList, valueList));
//   };

//   const updateMapNew = () => {
//     const newMap = generateNewMap();

//     for (let y = 1; y < MAP_HEIGHT - 1; y++) {
//       for (let x = 1; x < MAP_WIDTH - 1; x++) {
//         let numLiveNeighbors = 0;

//         if (mapState[y - 1][x - 1] == 1) numLiveNeighbors += 1; // top left
//         if (mapState[y - 1][x] == 1) numLiveNeighbors += 1; // top
//         if (mapState[y - 1][x + 1] == 1) numLiveNeighbors += 1; // top right
//         if (mapState[y][x + 1] == 1) numLiveNeighbors += 1; // right
//         if (mapState[y + 1][x + 1] == 1) numLiveNeighbors += 1; // right bottom
//         if (mapState[y + 1][x] == 1) numLiveNeighbors += 1; // bottom
//         if (mapState[y + 1][x - 1] == 1) numLiveNeighbors += 1; // bottom left
//         if (mapState[y][x - 1] == 1) numLiveNeighbors += 1; // left

//         const currentCellState = mapState[y][x];

//         if ((currentCellState == 1 && numLiveNeighbors < 2) || (currentCellState == 1 && numLiveNeighbors > 3)) {
//           newMap[y][x] = 0;
//         } else if (
//           (currentCellState == 1 && (numLiveNeighbors == 2 || numLiveNeighbors == 3)) ||
//           (currentCellState == 0 && numLiveNeighbors == 3)
//         ) {
//           newMap[y][x] = 1;
//         } else {
//           newMap[y][x] = 0;
//         }
//       }
//     }

//     setNewMapState(newMap);
//   };

//   return (
//     <div className="map-page-container">
//       <h3>2D World</h3>
//       <br />
//       <div>
//         {newMapState.map((row: number[], y: number) => (
//           <div className="map-row" key={_.uniqueId()}>
//             {row.map((val: number, x: number) => (
//               <div className={`square-container ${val === 1 && 'square-filled'}`} key={_.uniqueId('element')} />
//             ))}
//           </div>
//         ))}
//       </div>
//       <br />

//       <div className="control-row">
//         <button onClick={() => updateMapNew()}>Update</button>
//         <button>Play</button>
//       </div>
//     </div>
//   );
// };

// export default Map;

// // map terrain
// // style={{ backgroundColor: depthColorSelector(terrainMap ? terrainMap[y][x] : 0) }}
