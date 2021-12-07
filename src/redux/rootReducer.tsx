import { combineReducers } from 'redux';
import { testReducer } from '../modules/test/testReducer';
import { mapReducer, mapState } from '../modules/map/mapReducer';

export interface masterState {
  map: mapState;
}

const MasterReducer = combineReducers({
  test: testReducer,
  map: mapReducer,
});

export default MasterReducer;
