import { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import testAction from './testActionCreator';
import { GlobalReducerState } from '../../common/types/globalStateType';
import './test.scss';
import Switch from '../../common/components/Switch/Switch';
import Checkbox from '../../common/components/Checkbox/Checkbox';

// This page is to demonstrate basic redux / saga capabilities as well as components.

interface mapStateToPropsProps {
  globalLoadingState: boolean;
}

const mapStateToProps = (state: GlobalReducerState): mapStateToPropsProps => {
  return {
    globalLoadingState: state.test.loading,
  };
};

interface mapDispatchProps {
  fetchMockItem: () => void;
}

const mapDispatchToProps: mapDispatchProps = {
  fetchMockItem: () => testAction.fetchMockItem(),
};

type testComponentAllProps = mapStateToPropsProps & mapDispatchProps;

const Test = (props: testComponentAllProps): ReactElement => {
  const { globalLoadingState } = props;

  useEffect(() => {
    const { fetchMockItem } = props;
    fetchMockItem();
  }, []);

  const [switchValue, setSwitchValue] = useState(false);
  const [checkValue, setCheckValue] = useState(false);

  return (
    <div className="page-container">
      <h2>Welcome to the Test Page ~</h2>
      <div>- The page is placing a mock fetch in the background to demonstrate Saga architecture</div>
      <div>- Global loading state: {`${globalLoadingState}`}</div>
      <br />
      <h2>Components</h2>
      <div>- Used to test components</div>
      <br />
      <Switch checked={switchValue} onChange={() => setSwitchValue(!switchValue)} label="Hello" />
      <Checkbox label="Check me" checked={checkValue} onChange={() => setCheckValue(!checkValue)} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
