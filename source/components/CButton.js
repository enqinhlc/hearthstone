import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CText, { IText } from './CText';

export interface IButton {
  bgColor: string;
  style: object;
  textStyle: IText;
  activeOpacity: number;
  onPress: Function;
}

const CButton = (props: IButton) => (
  <TouchableOpacity
    activeOpacity={props.activeOpacity || 0.8}
    onPress={props.onPress}
    style={[
      Style.button,
      props.bgColor
        ? Style[props.bgColor]
          ? Style[props.bgColor]
          : { backgroundColor: props.bgColor }
        : Style.bgPrimary,
      props.middle && Style.middle,
      props.center && Style.center,
      props.style && { ...props.style },
    ]}>
    <CText {...{ color: 'white' }} {...props.textStyle}>
      {props.title}
    </CText>
  </TouchableOpacity>
);

const Style = StyleSheet.create({
  button: {
    backgroundColor: '#0E79B2',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    margin: 1,
  },
  middle: { justifyContent: 'center' },
  center: { alignItems: 'center' },
  primary: { backgroundColor: '#191923' },
  white: { backgroundColor: '#FBFEF9' },
  blue: { backgroundColor: '#0E79B2' },
  red: { backgroundColor: '#BF1363' },
  orange: { backgroundColor: '#F39237' },
});

export default CButton;
