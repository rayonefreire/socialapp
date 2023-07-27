import React from 'react';

import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ColorValue
} from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
  titleColor?: ColorValue;
}

import { styles } from './styles';

export function ButtonText({ title, titleColor = 'black', ...rest } : Props){
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[styles.title, { color: titleColor }]}>{ title }</Text>
    </TouchableOpacity>
  );
}