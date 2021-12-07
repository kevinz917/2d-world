import { Action } from '../../common/types/Action';
import actionCreator from '../../redux/actionCreator';

export const TEST_ACTIONS = {
  SET_LOADING_TRUE: 'SET_LOADING_TRUE',
  SET_LOADING_FALSE: 'SET_LOADING_FALSE',

  FETCH_MOCK_ITEM_START: 'START_FETCH_MOCK_ITEM',
  FETCH_MOCK_ITEM_SUCCESS: 'FETCH_MOCK_ITEM_SUCCESS',
};

export default {
  setLoadingTrue(): Action {
    return actionCreator(TEST_ACTIONS.SET_LOADING_TRUE);
  },
  setLoadingFalse(): Action {
    return actionCreator(TEST_ACTIONS.SET_LOADING_FALSE);
  },
  fetchMockItem(): Action {
    return actionCreator(TEST_ACTIONS.FETCH_MOCK_ITEM_START);
  },
  fetchMockItemSuccess(item: any): Action {
    return actionCreator(TEST_ACTIONS.FETCH_MOCK_ITEM_SUCCESS, { item });
  },
};
