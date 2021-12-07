import { combineReducers } from 'redux';
import { testReducer } from '../modules/test/testReducer';

const MasterReducer = combineReducers({
  test: testReducer,
});

export default MasterReducer;
