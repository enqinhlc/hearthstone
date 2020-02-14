import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import Store from './source/stores/app-reducer';
import { AppNavigator, CActivityIndicator } from './source/components';

export default () => (
  <Provider store={Store}>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
    <CActivityIndicator />
  </Provider>
);
