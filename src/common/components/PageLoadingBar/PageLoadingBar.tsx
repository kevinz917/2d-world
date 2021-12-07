import { ReactElement } from 'react';
import { connect } from 'react-redux';
import RenderIf from '../RenderIf/RenderIf';
import './PageLoadingBar.scss';

interface pageLoadingStateProps {
  value: boolean;
}

const mapStateToProps = (state: any) => {
  return {
    value: state.test.loading,
  };
};

const PageLoadingBar = (props: pageLoadingStateProps): ReactElement => {
  const { value } = props;

  return (
    <RenderIf value={value}>
      <div className="progress-completed" />
    </RenderIf>
  );
};

export default connect(mapStateToProps, null)(PageLoadingBar);
