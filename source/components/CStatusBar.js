import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

export interface IStatusBar {
  networkActivityIndicatorVisible: boolean;
  animated: boolean;
  backgroundColor: string;
}

const CStatusBar = (props: IStatusBar) => {
  StatusBar.setNetworkActivityIndicatorVisible(true);
  return (
    <StatusBar
      networkActivityIndicatorVisible={props.networkStatus}
      barStyle="dark-content"
    />
  );
};

const stateToProps = state => ({
  networkStatus: state.networkStatus,
});

export default connect(stateToProps, null)(CStatusBar);
