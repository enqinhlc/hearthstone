import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { COLORS } from '../utils/Constants';
import { CText, CView } from './index';

export interface IActivityIndicator {
  status: boolean;
  message: string;
}

const CActivityIndicator = (props: IActivityIndicator) =>
  props.visible && (
    <View style={Style.container}>
      <ActivityIndicator
        size="small"
        color={COLORS.white}
        style={Style.indicator}
      />
      <CText color="white" bold size={15}>
        {props.message || 'Lütfen bekleyiniz.'}
      </CText>
    </View>
  );

const Style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: { marginVertical: 10 },
});

const stateToProps = state => ({
  visible: state.activityIndicatorVisible,
  message: state.activityIndicatorMessage,
});

export default connect(stateToProps, null)(CActivityIndicator);
