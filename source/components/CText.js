import React from 'react';
import { Text, StyleSheet } from 'react-native';

export interface IText {
  color: string;
  size: number;
  bold: boolean;
  italic: boolean;
  regular: boolean;
  light: boolean;
  italic: boolean;
}

const CText = (props: IText) => (
  <Text
    style={[
      props.color
        ? Style[props.color]
          ? Style[props.color]
          : { color: props.color }
        : Style.primary,
      props.size && { fontSize: props.size },
      props.bold && Style.bold,
      props.regular && Style.regular,
      props.light && Style.light,
      props.italic && Style.italic,
      props.center && Style.center,
    ]}>
    {props.children}
  </Text>
);

const Style = StyleSheet.create({
  primary: { color: '#191923' },
  white: { color: '#FBFEF9' },
  blue: { color: '#0E79B2' },
  red: { color: '#BF1363' },
  orange: { color: '#F39237' },
  bold: { fontWeight: '700' },
  regular: { fontWeight: '300' },
  light: { fontWeight: '200' },
  italic: { fontStyle: 'italic' },
  center: { textAlign: 'center' },
});

export default CText;
