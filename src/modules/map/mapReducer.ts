import { produce } from 'immer';
import { MAP_ACTIONS } from './mapActions';

export const MAP_WIDTH = 50;
export const MAP_HEIGHT = 50;

export interface mapState {
  map: number[][];
}

const initialMapState = {
  map: new Array(MAP_HEIGHT).fill(0).map(() => new Array(MAP_WIDTH).fill(0)),
};

// map reducer
export const mapReducer = produce((state, action) => {
  switch (action.type) {
    case MAP_ACTIONS.SET_SQUARE:
      state.map[action.payload.y][action.payload.x] = action.payload.value;
      break;
    case MAP_ACTIONS.SET_SQUARE_BATCH:
      const xList = action.payload.xList;
      const yList = action.payload.yList;
      const valueList = action.payload.valueList;

      // TODO: Add check if array lengths are the same
      for (let i = 0; i < xList.length; i++) {
        state.map[yList[i]][xList[i]] = valueList[i];
      }

      break;
    default:
      break;
  }
}, initialMapState);
