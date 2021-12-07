import { Router, Route, Switch } from 'react-router-dom';
import PageLoadingBar from './common/components/PageLoadingBar/PageLoadingBar';
import Test from './modules/test/test';

// map component
import Map from './Map';

import './common/styles/colors.scss';
import './common/styles/typography.scss';
import './common/styles/overall.scss';
import history from './common/components/Router/history';

const App = () => {
  return (
    <div className="overall-page-container">
      <PageLoadingBar />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Map} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
