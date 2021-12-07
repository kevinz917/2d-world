import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PROD } from './common/api/base';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MasterReducer from './redux/rootReducer';
import createSagaMiddleware from 'redux-saga';
import myTestSaga from './modules/test/testSaga';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  (PROD !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(MasterReducer, composeEnhancer(applyMiddleware(sagaMiddleware)));

// run the saga // TODO
sagaMiddleware.run(myTestSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
