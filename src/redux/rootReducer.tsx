import { combineReducers } from 'redux';
import { mapReducer, mapState } from '../modules/map/mapReducer';

export interface masterState {
  map: mapState;
}

const MasterReducer = combineReducers({
  map: mapReducer,
});

export default MasterReducer;
