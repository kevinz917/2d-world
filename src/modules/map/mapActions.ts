import { Action } from '../../common/types/Action';
import actionCreator from '../../redux/actionCreator';

export const MAP_ACTIONS = {
  SET_SQUARE: 'SET_SQUARE',
  SET_SQUARE_BATCH: 'SET_SQUARE_BATCH',
};

export const mapActions = {
  setSquare(x: number, y: number, value: number): Action {
    return actionCreator(MAP_ACTIONS.SET_SQUARE, { x, y, value });
  },
  setSquareBatch(xList: number[], yList: number[], valueList: number[]): Action {
    return actionCreator(MAP_ACTIONS.SET_SQUARE_BATCH, { xList, yList, valueList });
  },
};
