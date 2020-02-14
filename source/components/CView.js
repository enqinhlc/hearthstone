import React from 'react';
import { View, StyleSheet } from 'react-native';

export interface IView {
  center: boolean;
  middle: boolean;
  row: boolean;
  flex: number;
  bgColor: string;
  style: object;
  width: number;
  height: number;
}

const CView = (props: IView) => (
  <View
    style={[
      props.center && Style.center,
      props.flex && { flex: Number(props.flex) || 1 },
      props.middle && Style.middle,
      props.row && Style.row,
      props.bgColor
        ? Style[props.bgColor]
          ? Style[props.bgColor]
          : { backgroundColor: props.bgColor }
        : Style.primary,
      props.width && { width: props.width },
      props.height && { height: props.height },
      props.style && { ...props.style },
    ]}>
    {props.children}
  </View>
);

const Style = StyleSheet.create({
  primary: { backgroundColor: '#FBFEF9' },
  dark: { backgroundColor: '#191923' },
  blue: { backgroundColor: '#0E79B2' },
  red: { backgroundColor: '#BF1363' },
  orange: { backgroundColor: '#F39237' },
  middle: { justifyContent: 'center' },
  center: { alignItems: 'center' },
  row: { flexDirection: 'row' },
});

export default CView;
